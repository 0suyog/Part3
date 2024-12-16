function info(...info) {
    console.log(...info)
}

function error(...err) {
    console.error(...err)
}

module.exports = { info, error }
