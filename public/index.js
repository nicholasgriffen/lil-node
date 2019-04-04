document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault()
        fetch('/', {
            method: 'POST',
            body: JSON.stringify({
                name: document.getElementById('name').value,
                pass: document.getElementById('pass').value
            })
        }).then(function(res) {
            if (res.status === 422) {
                return res.text()
            } else {
                showHome()
                setHomeListeners()
                return ''
            }
        }).then(setErrorText).catch(setErrorText)
    })

    function showHome() {
        document.getElementById('root').innerHTML = `
        <h1>Welcome Home</h1>
        <div id="validity"></div>
        <label for="jwt">Enter a JWT, or leave blank to check the JWT stored in your cookies</label>
        <input type="text" name="jwt" id="jwt"></input>
        <button id="logout">Log out</button>
        <button id="validate">Check JWT validity</button>
        ` 
    }

    function setHomeListeners() {
        document.getElementById("logout").addEventListener("click", function(e) {
            fetch('/logout').then(function(res) {
                if (res.status === 200) {
                    window.location.href = '/'
                }
            }).catch(setErrorText)
        })
        document.getElementById("validate").addEventListener("click", function(e) {
            var jwt = document.getElementById('jwt').value || document.cookie.replace('jwt=', '')
            // validation will sometimes fail if jwt is not URI encoded
            fetch(`/validate?jwt=${encodeURIComponent(jwt)}`).then(function(res) {
                if (res.status === 422) {
                    return res.text()
                }
                return res.json()
            }).then(function(msg) {
                document.getElementById("validity").innerText = msg.message || `INVALID JWT - ${msg}`
            }).catch(setErrorText)
        })
    }

    function setErrorText(text) {
        if (String(text).includes('Failed to fetch')) {
            text = `Server appears to be down - is an http server running at ${window.location}?`
        }
        document.getElementById('error').innerText = text
    }
})
