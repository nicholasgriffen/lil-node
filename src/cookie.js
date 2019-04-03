module.exports = {
    set: function(res, name, value) {
        res.setHeader('Set-Cookie', `${name}=${value}`)
    }, 
    expire: function(res, name) {
        res.setHeader('Set-Cookie', `${name}=''; Expires=${new Date('January 1 1990')}`)
    }
}