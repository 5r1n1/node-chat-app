const moment   = require ('moment')

const genMsg = (from, text) => 
    ({from, text, createdAt: moment().valueOf()})

const genLocMsg = (from, lat, lon) => ({
    from,
    url: `https://www.google.com/maps?q=loc:${lat},${lon}`,
    createdAt: moment().valueOf()
})

module.exports = { genMsg, genLocMsg }