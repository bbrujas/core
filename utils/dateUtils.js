function getMonday() {
    const d = new Date(Date.now());
    const day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    new Date(d.setDate(diff));
    d.setHours(0, 0, 0, 0);
    return d;
}

module.exports = {
    getMonday
}