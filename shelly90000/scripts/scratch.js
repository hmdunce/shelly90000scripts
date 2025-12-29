function (context, args) {
  let {hours_ago} = #fs.shelly90000.lib();
  return [
    new Date(),
    hours_ago(1000),
  ]
}
