function (context, args) {
  let {parse_lock_error} = #fs.shelly90000.lib();
  return parse_lock_error(
    "`NLOCK_UNLOCKED` c001\n`NLOCK_UNLOCKED` EZ_21\n`VLOCK_ERROR`\nlol what whoops"
  )
}
