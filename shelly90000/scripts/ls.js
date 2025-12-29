function (context, args) {
    let docs = #db.f().array(),
        stats = {id: {}, type: {}, other: 0};
    for (let doc of docs) {
        let size = JSON.stringify(doc).length,
            goesById = typeof doc._id == "string"
                && !doc._id.includes("|"),
            goesByType = typeof doc.type == "string";
        if (goesByType)
            stats.type[doc.type] = size + (stats.type[doc.type] || 0);
        if (goesById)
            stats.id[doc._id] = size + (stats.id[doc._id] || 0);
        if (!goesById && !goesByType)
            stats.other += size;
    }
    return stats;
}
