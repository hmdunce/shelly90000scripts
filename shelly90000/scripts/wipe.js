function (context, args) {
    args = _CLONE(typeof args == "object" && args || {});
    if (args.confirm) return #db.r({});
    return "`Dwait really???`"
}