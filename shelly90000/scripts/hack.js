function (context, args) {
//@{"c":{"l":"green","M":"lime","J":"yellow","F":"orange","D":"red","T":"purple","P":"blue","N":"cyan"}}@
  args = _CLONE(typeof args == "object" && args || {});
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
      let doc = #db.f({_id: `loc|${name}`}).first(),
          {ppr} = #fs.shelly90000.lib();
      // TODO continue with further targets
      return ppr(doc.calls);
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
      throw "TODO not fullsec"
    }
    if (!(al.public && al.hidden))
      return {ok: false, msg: "that not a mofo?"}

    // auto-log calls
    let {loc_id} = #fs.shelly90000.lib(),
        _id = loc_id(name),
        actualCall = call;
    call = args => {
      let time = new Date(),
          output = actualCall(args),
          calls = {
            args, output,
            time,
            caller: context.caller,
            run_id: _RUN_ID,
          };
      if (context.calling_script) calls.calling_script = calling_script;
      #db.us({_id}, {$push: {calls}});
      return output;
    };

    // hack that mofo?
    let s = null,
        log = [],
        a = () => {
          if (s == null) return null;
          return Object.fromEntries(
            Object.entries(s).map(([k, v]) => {
              switch (k) {
                case "c001":
                  return [k, c[v]];
                default:
                  throw `uhoh ${k}`
              }
            }));
        },
        {ppr, parse_lock_error} = #fs.shelly90000.lib();

    while (_END - Date.now() > 1000) {
      let aa = a(),
          out = call(aa),
          m;
      log.push({args: aa, out});
      if (out == ":::TRUST COMMUNICATION::: hardline required - activate with kernel.hardline") {
        return {ok: false, msg: "need hardline stupid"}
      } else if (out == `Connected to ${name}`) {
        s = {};
        continue;
      } else {
        let {unlocked, error} = parse_lock_error(out);
        log.push({unlocked, error});
        if (error) {
          if (m = /^Denied access by (?:.* )?`N([^`]+)` lock\.$/.exec(error)) {
            let lock = m[1];
            switch (lock) {
              case "c001":
                s = {c001: 0}
                log.push("detected c001 lock, trying colors");
                continue;
                break;
              default:
                log.push(`denied access by unknown lock ${lock}`);
                break;
            }
          } else {
            log.push("huh? what? " + ppr(error));
          }
        } else {
          log.push("no error? huh something else happened?");
        }
        break;
      }
    }
    // TODO continue to further targets
    return log;
  }
}
