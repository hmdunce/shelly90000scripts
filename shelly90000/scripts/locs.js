function (context, args) {
  args = _CLONE(typeof args == "object" && args || {});
  let getLoc = loc => loc._id.slice(4), // d'oh
      parseLoc = loc => {
        let m;
        if (m = /^([a-z0-9]+)_([a-z0-9]+)_([a-z0-9]+)\.([a-z0-9_]+)_([a-z0-9]+)$/.exec(loc)) {
          return {
            anon: m[1],
            spec: m[2],
            pub: m[4],
          }
        }
      },
      skip = typeof args.skip == "number" ? args.skip : 0,
      limit = typeof args.limit == "number" ? args.limit : context.rows - 3;
  if (args.stats) {
    let freqs = xs => {
          let fs = {};
          for (let x of xs) fs[x] = 1 + (fs[x] || 0);
          return Object.fromEntries(
            Object.entries(fs).sort((x,y) => _NUM_SORT_DESC(x[1], y[1])));
        };
    let locs = #db.f({type: "loc"}).array().map(getLoc).map(parseLoc);
    return {
      anon: freqs(locs.map(loc => loc.anon)),
      spec: freqs(locs.map(loc => loc.spec)),
      pub: freqs(locs.map(loc => loc.pub)),
    }
  }
  let q = {type: "loc"};
  if (args.spec) {
    // d'oh
    q._id = {"$regex": `^loc\\|[a-z0-9]+_${args.spec}_`}
  }
  let locs = #db.f(q)
    .sort({time: -1})
    .skip(skip)
    .limit(limit)
    .array();
  locs = locs.map(getLoc);
  if (args.scriptors) {
    let hacks = [];
    for (let i = 0; i < locs.length; i += 4) {
      hacks.push(locs.slice(i, i+4));
    }
    return hacks.map(hack => {
      hack = hack.map(loc => `#s.${loc}`);
      return `hack{t:[${hack}]}`
    })
  }
  return locs;
}
