function (context, args) {
  args = _CLONE(typeof args == "object" && args || {});
  if (args.wipe)
    return #db.r({type: "log"});
  return "logs";
}