function (context, args) {
    args = _CLONE(typeof args == "object" && args || {});
    if (args.quine) return #fs.scripts.quine();
    if (context.is_brain && !context.calling_script) {
        try {
            #fs.shelly90000.public();
        } catch (e) {
            return {ok: false, msg: [e.message, e.stack]};
        }
    }
    return {ok: false, msg: "what?"}
}
