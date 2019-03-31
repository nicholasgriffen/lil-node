module.exports = {
    set: function(res, name, value) {
        res.setHeader('Set-Cookie', `${name}=${value}; HttpOnly`)
    }, 
    unset: function(res, name) {
        res.removeHeader(name)
    }
}