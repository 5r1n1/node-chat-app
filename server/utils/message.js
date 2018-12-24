const genMsg = (from, text) => 
    ({from, text, createdAt: new Date().getTime()})

const genLocMsg = (from, lat, lon) => ({
    from,
    url: `https://www.google.com/maps?q=loc:${lat},${lon}`,
    createdAt: new Date().getTime()
})

module.exports = { genMsg, genLocMsg }