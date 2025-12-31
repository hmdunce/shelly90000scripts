function (context, args) {
    let out = "Denied access by CORE `Nc001` lock."
    return /^Denied access by (?:.* )?`N([^`]+)` lock\.$/.exec(out)
}
