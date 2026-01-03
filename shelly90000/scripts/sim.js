function (context, args) {
  // WIP!! (AI wrote this)

  args = _CLONE(typeof args == "object" && args || {});
  let BINMAT_DONE = "WARNING: BINMAT security shell inactive. Intelligent defense system offline.\n`NLOCK_UNLOCKED`\nConnection terminated.",
      DENY = {
        "DATA_CHECK": "Denied access by `NDATA_CHECK` lock.",
        "EZ_21": "Denied access by HALPERYON SYSTEMS `NEZ_21` lock.",
        "EZ_35": "Denied access by HALPERYON SYSTEMS `NEZ_35` lock.",
        "EZ_40": "Denied access by HALPERYON SYSTEMS `NEZ_40` lock.",
        "c001": "Denied access by CORE `Nc001` lock.",
        "c002": "Denied access by CORE `Nc002` lock.",
        "c003": "Denied access by CORE `Nc003` lock.",
        "l0cket": "Denied access by nuutec `Nl0cket` lock.",
      },
      PRESETS = {
        "anon_wbttl_i837nv.access_11gi4a": {
          name: "anon_wbttl_i837nv.access_11gi4a",
          locks: [
            {
              type: "DATA_CHECK",
              clue: "pet, pest, plague and meme are accurate descriptors of the ++++++\nuser ++++++ provides instruction via script\nusers gather in channel CAFE to share ++++++",
              answer: "bunnybatteachpoetry",
            },
            {type: "EZ_21", command: "unlock"},
            {type: "c003", color: "orange", triads: ["blue", "green"]},
            {type: "c001", color: "lime"},
          ],
        },
        "derelict_wbttl_zyjois.info_td3ztq": {
          name: "derelict_wbttl_zyjois.info_td3ztq",
          locks: [
            {type: "EZ_35", command: "release", digit: 3},
            {type: "l0cket", key: "6hh8xw"},
          ],
        },
        "uknown_wbttl_qv1xj3.external_xajry8": {
          name: "uknown_wbttl_qv1xj3.external_xajry8",
          locks: [
            {
              type: "DATA_CHECK",
              clue: "communications issued by user ++++++ demonstrate structural patterns associated with humor\n\"did you know\" is a communication pattern common to user ++++++\nuser ++++++ uses the port epoch environment to request gc",
              answer: "sans_comedyfran_leeoutta_juice",
            },
            {type: "EZ_21", command: "open"},
            {type: "EZ_35", command: "release", digit: 8},
            {type: "c001", color: "red"},
          ],
        },
        "unidentified_wbttl_sx5lgz.access_6mvkpe": {
          name: "unidentified_wbttl_sx5lgz.access_6mvkpe",
          locks: [
            {type: "c002", color: "cyan", complement: "orange"},
            {type: "c003", color: "lime", triads: ["red", "blue"]},
            {type: "EZ_35", command: "unlock", digit: 2},
            {type: "EZ_21", command: "open"},
            {
              type: "DATA_CHECK",
              clue: "pet, pest, plague and meme are accurate descriptors of the ++++++\nsafety depends on the use of scripts.++++++\nservice ++++++ provides atmospheric updates via the port epoch environment",
              answer: "bunnybatget_levelweathernet",
            },
            {type: "l0cket", key: "vc2c7q"},
          ],
        },
        "unknown_wbttl_w3pjhr.pub_info_n6kfjn": {
          name: "unknown_wbttl_w3pjhr.pub_info_n6kfjn",
          locks: [
            {type: "l0cket", key: "vc2c7q"},
            {type: "EZ_40", command: "release", prime: 37},
            {type: "c002", color: "purple", complement: "lime"},
            {type: "c001", color: "red"},
            {type: "c003", color: "green", triads: ["orange", "purple"]},
            {type: "EZ_21", command: "open"},
          ],
        },
      },
      quote = v => `\`V"${v}"\` is not the correct unlock command.`,
      quotePrime = v => `\`V${v}\` is not the correct prime.`,
      quoteDigit = v => `\`V${v}\` is not the correct digit.`,
      quoteColor = v => `\`V"${v}"\` is not the correct color name.`,
      quoteKey = v => `\`V"${v}"\` is not the correct security k3y.`,
      missing = field => `Required unlock parameter \`N${field}\` is missing.`,
      getConfig = () => {
        if (Array.isArray(args.stack)) {
          return {name: args.name || args.target || "sim_target", locks: args.stack};
        }
        if (args.stack && Array.isArray(args.stack.locks)) {
          return {name: args.stack.name || args.name || args.target || "sim_target", locks: args.stack.locks};
        }
        if (args.target && PRESETS[args.target]) return PRESETS[args.target];
        if (args.name && PRESETS[args.name]) return PRESETS[args.name];
      },
      config = getConfig();

  if (args.list)
    return Object.keys(PRESETS);
  if (!config)
    return {ok: false, msg: "need `Nstack` or known `Ntarget`"};
  if (!Array.isArray(config.locks) || config.locks.length == 0)
    return {ok: false, msg: "lock stack empty"};
  if (args.preview)
    return config;

  let input = "input" in args ? args.input : {};
  if (input === null)
    return `Connected to ${config.name || args.target || "sim_target"}`;
  if (typeof input != "object")
    return {ok: false, msg: "`Ninput` must be object or null"};

  let handlers = {
        "DATA_CHECK": lock => {
          if (input.DATA_CHECK === true)
            return {prompt: lock.clue};
          if (typeof input.DATA_CHECK == "string" && input.DATA_CHECK == lock.answer)
            return {ok: true};
          return {error: DENY.DATA_CHECK};
        },
        "EZ_21": lock => {
          if (typeof input.EZ_21 == "undefined")
            return {error: DENY.EZ_21};
          if (input.EZ_21 != lock.command)
            return {error: quote(input.EZ_21)};
          return {ok: true};
        },
        "EZ_35": lock => {
          if (typeof input.EZ_35 == "undefined")
            return {error: DENY.EZ_35};
          if (input.EZ_35 != lock.command)
            return {error: quote(input.EZ_35)};
          if (typeof input.digit == "undefined")
            return {error: missing("digit")};
          if (Number(input.digit) != lock.digit)
            return {error: quoteDigit(input.digit)};
          return {ok: true};
        },
        "EZ_40": lock => {
          if (typeof input.EZ_40 == "undefined")
            return {error: DENY.EZ_40};
          if (input.EZ_40 != lock.command)
            return {error: quote(input.EZ_40)};
          if (typeof input.ez_prime == "undefined")
            return {error: missing("ez_prime")};
          if (Number(input.ez_prime) != lock.prime)
            return {error: quotePrime(input.ez_prime)};
          return {ok: true};
        },
        "l0cket": lock => {
          if (typeof input.l0cket == "undefined")
            return {error: DENY.l0cket};
          if (input.l0cket != lock.key)
            return {error: quoteKey(input.l0cket)};
          return {ok: true};
        },
        "c001": lock => {
          if (typeof input.c001 == "undefined")
            return {error: DENY.c001};
          if (input.c001 != lock.color)
            return {error: quoteColor(input.c001)};
          if (typeof input.color_digit == "undefined")
            return {error: missing("color_digit")};
          if (Number(input.color_digit) != lock.color.length)
            return {error: quoteDigit(input.color_digit)};
          return {ok: true};
        },
        "c002": lock => {
          if (typeof input.c002 == "undefined")
            return {error: DENY.c002};
          if (input.c002 != lock.color)
            return {error: quoteColor(input.c002)};
          if (typeof input.c002_complement == "undefined")
            return {error: missing("c002_complement")};
          if (input.c002_complement != lock.complement)
            return {error: quoteColor(input.c002_complement)};
          return {ok: true};
        },
        "c003": lock => {
          if (typeof input.c003 == "undefined")
            return {error: DENY.c003};
          if (input.c003 != lock.color)
            return {error: quoteColor(input.c003)};
          if (typeof input.c003_triad_1 == "undefined")
            return {error: missing("c003_triad_1")};
          if (typeof input.c003_triad_2 == "undefined")
            return {error: missing("c003_triad_2")};
          if (input.c003_triad_1 != lock.triads[0])
            return {error: quoteColor(input.c003_triad_1)};
          if (input.c003_triad_2 != lock.triads[1])
            return {error: quoteColor(input.c003_triad_2)};
          return {ok: true};
        },
      },
      unlocked = [];

  for (let i = 0; i < config.locks.length; i++) {
    let lock = config.locks[i],
        handler = handlers[lock.type];
    if (!handler)
      throw `no handler for ${lock.type}`;
    let result = handler(lock, input);
    if (result.prompt)
      return result.prompt;
    if (result.ok) {
      unlocked.push(lock.type);
      continue;
    }
    let lines = [];
    for (let j = 0; j < unlocked.length; j++)
      lines.push("`NLOCK_UNLOCKED` " + unlocked[j]);
    lines.push("`VLOCK_ERROR`");
    lines.push(result.error || DENY[lock.type] || "??");
    return lines.join("\n");
  }

  return BINMAT_DONE;
}
