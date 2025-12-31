function (context, args) {
//@{"hreq":":::TRUST COMMUNICATION::: hardline required - activate with kernel.hardline","mofoDoneGotHacked":"WARNING: BINMAT security shell inactive. Intelligent defense system offline.\n`NLOCK_UNLOCKED`\nConnection terminated."}@
    if (!#G.lib) {
      let scripts_lib = #fs.scripts.lib(),
          cst = JSON.parse(#fs.scripts.quine().split`@`[1]),
          get = (o,k) => {
            let d = Object.getOwnPropertyDescriptor(o, k);
            return d && d.value;
          },
          notOk = x => typeof x == "object" && get(x, "ok") === false,
          sevColors = {
            "DEBUG": "z",
            "INFO": "C",
            "NOTICE": "A",
            "WARNING": "J",
            "ERROR": "D",
          },
          colorSev = sev => `\`${sevColors[sev]}${sev}\``,
          log = (severity, ...args) => {
            // TODO hummmmmmmmmmmmmmmm
            let message = args.map(x => typeof x == "string" ? x : JSON.stringify(x)).join("\n");
            #db.i({
              type: "log",
              severity,
              message,
              time: new Date(),
              run: _RUN_ID,
            });
          },
          tail = (n=10) => {
            let log = #db.f({type: "log"})
              .sort({_id: -1})
              .limit(n)
              .array();
            return log.map(log => `[${colorSev(log.severity)}] ${log.message}`).reverse()
          },
          parseLine = line => {
            if (line.includes("\n"))
              throw "can't parse multiline lines ?";
            let chars = Array.from(line),
                color = null,
                text = "",
                parts = [],
                flush = () => {
                  if (text.length == 0) return;
                  parts.push({
                    color: color || "S", 
                    text,
                  });
                  color = null;
                  text = "";
                };
            for (let i = 0; i < chars.length; i++) {
              if (chars[i] == "`") {
                if (color) {
                  // end of colored part
                  flush();
                } else {
                  // possible start of colored part
                  if (/[a-zA-Z0-9]/.test(chars[i+1])) {
                    flush();
                    color = chars[i+1];
                    i++; // skip color char
                  } else {
                    text += "\xAB";
                  }
                }
              } else {
                text += chars[i];
              }
            }
            flush();
            return parts;
          },
          renderLine = parts => {
            return parts
              .map(({color, text}) =>
                color == "S" ? text : `\`${color}${text}\``)
              .join("")
          },
          cutLine = (line, cols=context.cols) => {
            line = parseLine(line);
            let cut = [], used = 0;
            for (let part of line) {
              if (used + part.text.length < cols) {
                used += part.text.length;
                cut.push(part);
              } else {
                cut.push({
                  color: part.color,
                  text: part.text.slice(0, cols - used),
                });
                break;
              }
            }
            return renderLine(cut);
          },
          cutLines = (lines, cols=context.cols) => {
            return lines.map(line => cutLine(line, cols));
          },
          escape = s => s.replaceAll("`", "\xAB"),
          pr = x => escape(JSON.stringify(x)),
          ppr = x => escape(JSON.stringify(x, null, null, '  ')),
          freqs = xs => {
            let fs = {};
            for (let x of xs) fs[x] = 1 + (fs[x] || 0);
            return Object.fromEntries(
              Object.entries(fs).sort((x,y) => _NUM_SORT_DESC(x[1], y[1])));
          },
          parts = (n, xs) => {
              let p = [];
              for (let i = 0; i < xs.length; i += n)
                  p.push(xs.slice(i, i+n));
              return p;
          },
          shuf = (array) => {
              // Source - https://stackoverflow.com/a/12646864
              // Posted by Laurens Holst, modified by community.
              // Retrieved 2025-12-22, License - CC BY-SA 4.0
              for (var i = array.length - 1; i > 0; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              var temp = array[i];
              array[i] = array[j];
              array[j] = temp;
              }
              return array;
          },
          freqsMap = xs => {
              let fs = new Map();
              for (let x of xs) {
                  if (!fs.has(x)) fs.set(x, 0);
                  fs.set(x, fs.get(x)+1)
              }
              return fs;
          },
          plurality = xs => {
              let fs = freqsMap(xs),
                  max = Math.max.apply(null, [...fs.values()])
              for (let k of fs.keys())
              if (fs.get(k) == max) return k;
          },
          // TODO horrible!
          dc = (t, a, n=7) => {
              let rs = [];
              for (let i = 0; i < n; i++) {
                  let r = t.call(a);
                  if (typeof r != "string") throw "not a string :("
                  r = r.replaceAll(/`[A-Za-z0-9]([¡¢Á¤Ã¦§¨©ª])`/g, "$1");
                  rs.push(r);
              }
              let cs = [],
                  w = Math.max.apply(null, rs.map(r => r.length));
              for (let r of rs) {
                  for (let i = 0; i < w; i++) {
                      cs[i] = cs[i] || [];
                      cs[i].push(i < r.length ? r[i] : null);
                  }
              }
              let s = [];
              for (let i = 0; i < cs.length; i++) {
              let c = plurality(cs[i]);
              if (c) s.push(c);
              }
              return s.join("")
          },
          is_sus = context =>
            context.calling_script || context.is_scriptor,
          // can be wrong for bot and binmat brains
          is_cli = context => !is_sus(context),
          clone_args = args => _CLONE(typeof args == "object" && args || {}),
          loc_id = name => `loc|${name}`,
          hours_ago = h =>
            new Date(Date.now() - (1000 * 60 * 60 * h)),
          parse_lock_error = mofo => {
            let lock_unlocked = "`NLOCK_UNLOCKED`",
                lock_error = "`VLOCK_ERROR`",
                unlocked = [], error;
            for (let i = 0; i < mofo.length;) {
              if (mofo.slice(i).startsWith(lock_unlocked)) {
                unlocked.push(mofo.slice(i, mofo.indexOf("\n", i)));
                i += (mofo.indexOf("\n", i) - i + 1);
              } else if (mofo.slice(i).startsWith(lock_error)) {
                error = mofo.slice(i + lock_error.length + 1);
                return {unlocked, error}
              } else if (mofo == cst.hreq) {
                return {ok: false, msg: mofo} // ya dumb, do we even need this?
              } else if (/^Connected to [A-Za-z0-9_]+\.[A-Za-z0-9_]+$/.test(mofo)) {
                return {poked :true} // do we even need this?
              } else if (mofo == cst.mofoDoneGotHacked) { 
                return {hacked: true};
              } else {
                  throw `dunno? ${JSON.stringify(mofo.slice(i)).replaceAll("`", "\xAB")}`
              }
            }
            // does this ever happen?
            throw `wow ${pr({unlocked})}`
          },
          parse_lock_error_lock = call => {
            let {output, args} = call,
                {error} = parse_lock_error(call.output);
            throw `plel ${pr({output,args,error})}`
          },
          parse_calls = calls => {
            // filter calls to last hour
            // because older calls are surely irrelevant ?
            calls = calls.filter(x => x.time >= hours_ago(1));
            // sort recent first
            calls.sort((x,y) => _NUM_SORT_DESC(x.time, y.time));

            for (let call of calls) {
              let le;
              if (le = parse_lock_error(call.output)) {
                let lel;
                if (lel = parse_lock_error_lock(call)) {
                  throw `LEL ${pr(lel)}`
                }
              } else {
                throw `dunno? ${pr(call.output)}`
              }
            }
            return "stuff";
          };
      let lib = {
          get,
          notOk,
          log,
          tail,
          parseLine,
          renderLine,
          cutLine,
          cutLines,
          escape,
          pr,
          ppr,
          freqs,
          freqsMap,
          parts,
          shuf,
          dc,
          is_sus,
          is_cli,
          clone_args,
          loc_id,
          hours_ago,
          parse_lock_error_lock, // TODO delete
          parse_calls,
      };
      #G.lib = DEEP_FREEZE(lib);
    }
    let l = #G.lib;
    if (l.is_cli(context)) {
      return {ok: false}  
    } else {
      return l;
    }
}
