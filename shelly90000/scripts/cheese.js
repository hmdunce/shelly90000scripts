function (context, args) {
    args = _CLONE(typeof args == "object" && args || {});
    let t = args.t;
    let log = [];
    #fs.bucket1.t1harv({t: {name: "whatever", call: args => {
        let out = t.call(args);
        log.push({args, out});
        return out;
    }}})
    return log;
}
