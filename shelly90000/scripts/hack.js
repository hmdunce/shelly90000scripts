function (context, args) {
//@{"c":{"l":"green","M":"lime","J":"yellow","F":"orange","D":"red","T":"purple","P":"blue","N":"cyan"}}@
  args = _CLONE(typeof args == "object" && args || {});
  let _id = context.this_script;
  if (args.wipe) return #db.r({_id});

  let {notOk, log, tail, escape} = #fs.shelly90000.lib();

  let {c} = JSON.parse(#fs.scripts.quine().split`@`[1]);
  c = Object.values(c);
  
  if (!args.t) return "need `Nt` scriptor to hack";
  let ts = args.t;
  if (!Array.isArray(ts)) ts = [ts];
  for (let t of ts) {
    let {name, call} = t,
        l = #fs.scripts.get_level({name}),
        al = #fs.scripts.get_access_level({name});

    // hmm
    if (args.show) {
      let doc = #db.f({_id: `loc|${name}`}).first();
      return doc.calls;
    }

    if (notOk(l)) {
      if (l.msg == `Script ${name} doesn't exist.`) {
        log("NOTICE", `${name} no longer exists`);
        continue;
      } else {
        throw `wtf: ${JSON.stringify(l)}`;
      }
    }
    if (notOk(al)) {
      if (al.msg == `Script ${name} doesn't exist.`) {
        log("NOTICE", `${name} no longer exists`);
        continue;
      } else {
        throw `wtf: ${JSON.stringify(al)}`;
      }
    }
    if (!(l === 4)) { // ?
      throw "TODO not fullsec?"
    }
    if (!(al.public && al.hidden))
      return {ok: false, msg: "that not a mofo?"}
    // hack that mofo
    let {loc_id, hours_ago, parse_calls} = #fs.shelly90000.lib(),
        _id = loc_id(name),
        {caller} = context;

    // auto-log calls
    let actualCall = call;
    call = args => {
      let time = new Date(),
          output = actualCall(args),
          calls = {
            args, output,
            time, caller,
            run_id: _RUN_ID,
          };
      if (context.calling_script) calls.calling_script = calling_script;
      #db.us({_id}, {$push: {calls}});
      return output;
    };

    // manual hacking lol
    if ('a' in args) {
      log("INFO", "manual hacking lol");
      let out = call(args.a);
      return out;
    } else {
      log("NOTICE", "trying to auto hack, lol");

      let doc = #db.f({_id}).first(),
          calls = doc.calls || [];

      return [
        "WIP",
        parse_calls(calls),
      ];

      let out = call(),
          m; // regex match
      if (out == `Connected to ${name}`) {
        out = call({});
        // TODO will break on second lock?
        if (m = /^`VLOCK_ERROR`\nDenied access by (?:.* )?`N([^`]+)` lock.$/.exec(out)) {
          let lock = m[1];
          log("NOTICE", `denied access by lock ${lock}`);
        }
        log("NOTICE", `hacked? ${escape(out)}`);
        log("ERROR", "still don't know how to hack mofos");
      } else {
        // TODO curloc etc?
        log("ERROR", `WHAT? ${name} gave ${escape(out)} for noarg`);
      }
    }
  }
  return tail();
}
