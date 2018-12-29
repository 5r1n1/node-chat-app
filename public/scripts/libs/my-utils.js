function gerURLparams () {
    var objSearchParams = {}
    const strSearch = decodeURIComponent (window.location.search) + '#'
    const arrSearchStr = strSearch.match (/[\w|\+]+(?=[=|&|#])/g)
    for (var i = 0; i < arrSearchStr.length; i += 2)
        objSearchParams[arrSearchStr[i]] = arrSearchStr[i + 1].replace('+', ' ')
    return objSearchParams
}

module.exports = {gerURLparams}