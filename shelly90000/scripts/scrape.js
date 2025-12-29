function (context, args) {
//@{"t1":["amal_robo.public","aon.public","archaic.public","bluebun.public","bunnybat_hut.public","context.public","core.public","cyberdine.public","empty_nest.public","etceteraco.public","futuretech.public","goodfellow.public","halperyon.public","kill_9_1.public","kill_bio.public","legion_bible.public","legion_intl.public","light.public","lowell_extermination.public","marco_polo.public","merrymoor_pharma.public","nation_of_wales.public","nogrub.public","nuutec.public","pica.public","protein_prevention.public","ros13.public","ros_13_update_checker.public","setec_gas.public","skimmerite.public","sn_w.public","soylentbean.public","subject_object.public","suborbital_airlines.public","tandoori.public","the_holy_checksum.public","turing_testing.public","tyrell.public","weathernet.public","welsh_measles_info.public","weyland.public","world_pop.public"]}@
  let log = [];
  args = _CLONE(
    typeof args == "object" && args || {});
  if (args.quine)
    return #fs.scripts.quine()
      .replaceAll("\x60", "\xAB");
  let pretty = s =>
        JSON.stringify(s, null, null, '  ')
          .replaceAll("\x60", "\xAB");

  let {dc, shuf} = #fs.shelly90000.lib();

  if (!args.t) {
    let corps = JSON.parse(#fs.scripts.quine().split`@`[1]).t1;
    shuf(corps);
    corps = corps
      .slice(0, 3)
      .map(corp => `#s.${corp}`)
      .join(",");
    return `scrape{t:[${corps}]}`;
  }
  let ts = Array.isArray(args.t)
         ? args.t
         : [args.t];
  if (args.hack) {
    for (let t of ts)
      log.push(t.call({}));
    return log;
  }
  for (let t of ts) {
    let m, cmd = {};
    cmd.name = t.name;
    let menu = dc(t, {}, 10);
    if (m = /access directory with ([^ ]+):"([^"]+)"/.exec(menu)) {
      cmd.key = m[1];
      cmd.dir = m[2];
    }
    if (m = /Public commands are "([^"]+)" "([^"]+)"/.exec(menu)) {
      cmd.about = m[1];
      cmd.news = m[2];
    } else {
      let home = dc(t, null, 10);
      if (m = /^([^ ]+) \| ([^ ]+) \|/m.exec(home)) {
        cmd.news = m[1];
        cmd.about = m[2];
      } else {
        throw "bad home ???"
      }
    }

    let wild_success;
    while (!wild_success) {
      let news = t.call({[cmd.key]: cmd.news});
      if (m = /the initial launch of the ([^` ]+) software is a wild success./.exec(news)) {
        wild_success = m[1];
      }
    }
    cmd.wild_success = wild_success;
    let time = new Date();
    let locs = t.call({[cmd.key]: cmd.wild_success, list:true});
    for (let loc of locs) {
      if (/^[a-z0-9_]+\.[a-z0-9_]+$/.test(loc)) {
        let tier = "t1",
            corp = t.name;
        #db.us(
          {_id: `loc|${loc}`},
          {
            $setOnInsert: {type: "loc"},
            $set: {time, loc},
            $push: {scraped: {time, tier, corp}},
          })
      }
    }
    cmd.biglist_locs = locs;

    
  }

  return log;
}
