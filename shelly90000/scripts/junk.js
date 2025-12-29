      distinct = xs => [...new Set(xs)],
      last_actions = users => {
        let las = [];
        for (let i = 0; i < users.length; i += 50) {
          let name = users.slice(i, i+50);
          [].push.apply(
            las,
            #fs.users.last_action({name}));
        }
        return las;
      },

  if (args.corps) {
    let sectors = #fs.scripts.fullsec(),
        sector = sectors[0],
        scripts = #fs.scripts.fullsec({sector}),
        users = distinct(scripts.map(s => s.split(".")[0])),
        cutoff = Date.parse("2020-01-01T00:00:00Z"),
        npcs = new Set(last_actions(users)
                 .filter(l => l.t.getTime() < cutoff)
                 .map(l => l.n));
    return scripts.filter(s => npcs.has(s.split(".")[0]))
      .map(s => "#s." + s)
      .join(",")
  }