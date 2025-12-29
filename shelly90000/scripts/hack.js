function (context, args) {
//@{"c":{"l":"green","M":"lime","J":"yellow","F":"orange","D":"red","T":"purple","P":"blue","N":"cyan"}}@
  args = _CLONE(typeof args == "object" && args || {});
  let _id = context.this_script;
  if (args.wipe) return #db.r({_id});

  let {notOk, log, tail, escapeBacktick} = #fs.shelly90000.lib();

  let {c} = JSON.parse(#fs.scripts.quine().split`@`[1]);
  c = Object.values(c);
  
  if (!args.t) return "need `Nt` scriptor to hack";
  let ts = args.t;
  if (!Array.isArray(ts)) ts = [ts];
  for (let t of ts) {
    let {name, call} = t,
        l = #fs.scripts.get_level({name}),
        al = #fs.scripts.get_access_level({name});
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
    if (al.public && al.hidden) {
      // hack that mofo
      let {loc_id, hours_ago} = #fs.shelly90000.lib(),
          _id = loc_id(name),
          {caller} = context,
          time = new Date(),
          out = call(),
          m; // regex match
      if (out == `Connected to ${name}`) {
        log("NOTICE", `trying to hack that mofo ${name}`);

        // TODO stupid?
        return #db.us({_id, rotations: {
          $elemMatch: {
            created_at: {$lt: hours_ago(1)},
            active: {$neq: false},
          }
        }});

        out = call({});
        // TODO will break on second lock?
        if (m = /^`VLOCK_ERROR`\nDenied access by (?:.* )?`N([^`]+)` lock.$/.exec(out)) {
          let lock = m[1];
          #db.us({_id}, {$push});
        }
// [NOTICE] trying to hack that mofo anon_ddttl_2we3k1.entry_7e6j9l
// [INFO] Connected to anon_ddttl_2we3k1.entry_7e6j9l
// [NOTICE] hacked? «VLOCK_ERROR«
// Denied access by CORE «Nc001« lock.
// [ERROR] still don't know how to hack mofos
        log("NOTICE", `hacked? ${escapeBacktick(out)}`);
        log("ERROR", "still don't know how to hack mofos");
      } else {
        // TODO curloc etc?
        log("ERROR", `WHAT? ${name} gave ${escapeBacktick(out)} for noarg`);
      }
    } else {
      throw "that not a mofo"
    }
  }
  return tail();
}
