function (context, args) {
    args = _CLONE(typeof args == "object" && args || {});
    let {loc_id} = #fs.shelly90000.lib();
    if (args.show) {
        let docs = #db.f({
            _id: {$regex: "^loc\\|"},
            calls: {
                $exists: true
            },
        }).array().map(doc => {
            return doc.calls.map(({args, output}) => ({args, output}))
        });
        return JSON.stringify(docs).replaceAll("`", "\xAB");
    }
    let t = args.t,
        _id = loc_id(t.name),
        log = [];
    let al = #fs.scripts.get_access_level(t),
        ll = #fs.scripts.get_level(t);
    if (!(ll == 4 && typeof al == "object" && al.public && al.hidden)) {
        return {ok: false, msg: "that not a mofo?"}
    }
    // cheesing ghamb's cracker
    let calls = [],
        call = args => {
            args = JSON.parse(JSON.stringify(args));
            // TODO move this to lib
            let output = t.call(args),
                time = new Date(),
                call = {
                    args, output,
                    time,
                    caller: context.caller,
                    run_id: _RUN_ID,
                };
            if (context.calling_script) call.calling_script = calling_script;
            calls.push(call);
            log.push(t.name + " " + JSON.stringify(args));
            log.push(output);
            return output;
        };
    call(null);
    #fs.ghamb.t1_cracker({t: {
        name: "it's a secret to everybody",
        call,
    }});
    #db.us({_id}, {
        $push: {calls: {$each: calls}},
        $setOnInsert: {type: "loc"},
    });
    return log;
}
