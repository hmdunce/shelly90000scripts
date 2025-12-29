function () {
    let colors = {
        l: "green",
        M: "lime",
        J: "yellow",
        F: "orange",
        D: "red",
        T: "purple",
        P: "blue",
        N: "cyan",
    };

    return JSON.stringify(colors)

    colors = Object.values(colors);

    let log = [];
    log.push(#fs.dtr.t1_lock_sim({locks:["c002"]}));
    for (let i = 0; i < colors.length; i++) {
        let r = #fs.dtr.t1_lock_sim({c002:colors[i]});
        log.push(r);
        if (r.includes("is missing")) {
            for (let j = 0; j < colors.length; j++) {
                let r2 = #fs.dtr.t1_lock_sim({
                    c002: colors[i],
                    c002_complement: colors[j],
                });
                log.push(`${colors[i]} ${colors[j]} ${r2}`);
            }
        }
    }
    return log;
}
