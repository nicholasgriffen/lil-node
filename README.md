# Dependency-free Auth Server
## Which and why    
I chose to develop Authentication Server. It is, to me, the most interesting and most generally applicable challenge.    Most interesting because I have an affinity for server-side work and application security. Most generally applicable because, while the other applications are good for showing to others, the Authentication Server is an opportunity to build small libraries for myself, and to write code I may reuse in other projects. While the challenges of JWT processing, Node servers, cookies, and testing are often solved with dependencies, I imposed an added condition on the project - it uses no external libraries. Testing, JWT, server, crypto - all done with vanilla Node.

## Running the tests 
`npm test`

### Test style 
tests are in the test/ folder - each test suite uses node's assert library, and exports a run function that runs all the tests.     
tests expect to have the assert object injected into the run method    
test/index.js loads each of the test suites into an array, and calls run with `require('assert').strict`   

## How to use 
### Server
Start the server with `npm start` and point your browser or http client to localhost:3030 (or another port if you've set process.env.PORT) 

#### Endpoints 
##### /
###### GET    
return: public/index.html
###### POST
body: `JSON: { user: String, pass: String }`     
return:       
- success: 
  - status: 201
  - body: `JSON String: { message: "Logged in", data: { jwt: JWT } } } `
  - cookies: `jwt={JWT}`
- failure: 
  - status: 422
  - body: `String: Expected object like {"name": "name", "pass": "pass"}, received ${body}`
##### /logout
###### GET 
return:       
- status: 200
- body: `String: Logged out`
- cookies: `jwt=''; Expires=${new Date('January 1 1990')}`      

● What Operating System (+ service pack) and libraries are required

●  design decisions or behavioral clarifications 
    Perhaps the most jarring design decision is a deliberate avoidance of dependencies - no Express, jwt, or Mocha/Chai, in particular. I made this decision to challenge myself, to learn, and to make the application as lean as possible.    
    General application flow:     
        index.js invokes a function exported by src/server.js, which starts an http server and logs out the port.     
        server.js invokes a function exported by lib/router.js, which invokes various handlers based on the path of the incoming http request.     
        lib/authorization.js handles login, logout, and JWT verification, using functions exported by lib/cookie.js to create and destroy cookies, and functions exported by lib/jwt.js to encode and decode JWTs.         

● If you use any external libraries or code-snippets, you must provide the following
information for each (credit must be given to others): 

I borrow the strategy for base64 encoding strings from a StackOverflow post: 
Name: 
    Original Answer: onteria_ 
    Edit: Dominic
Version: None
Purpose: Adhere to JWT standards outlined in RFC 7519
License: None
Website: https://stackoverflow.com/questions/6182315/how-to-do-base64-encoding-in-node-js

● What tools/libraries (and versions) are necessary to use and test your application    
Developed with node 11 but should work with node 9.10.1+. In particular, the test suites use require('assert').strict, which seems to have been introduced in 9.10.1. Nothing but node is required to run the server application - a web browser is required to run the client.
