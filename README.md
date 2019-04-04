# Konica Minolta Technical Assessment
## Table of Contents 
[Which and why](#which-and-why)    
[OS Requirements](#os-requirements)   
[How to use](#how-to-use)        
[Available endpoints](#endpoints)    
[Running the tests](#running-the-tests)    
[Design decisions and clarifications](#design-decisions-and-clarifications)

## Which and why    
I chose to develop Authentication Server. It is, to me, the most interesting and most generally applicable challenge. Most interesting because I have an affinity for server-side work and application security. Most generally applicable because, while the other applications are good for showing to others, the Authentication Server is an opportunity to build small libraries for myself, and to write code I may reuse in other projects. While the challenges of JWT processing, Node servers, cookies, and testing are often solved with dependencies, I imposed an added condition on the project - it uses no external libraries. Testing, JWT, server, crypto - all done with vanilla Node.    

## OS Requirements    
Developed with Node 11.9.0 but should work with Node 9.10.1+. In particular, the test suites use `require('assert').strict`, which seems to have been introduced in 9.10.1. Nothing but Node is required to run the server application - a web browser is required to run the client housed in `/public`. Should run on any OS that runs aforementioned Node versions.

## How to use
### Server
Start the server with `npm start` and point your browser or http client to localhost:3030 (or another port if you've set process.env.PORT) 

### Client 
At present, one simply needs to enter any text in the name and password fields to be logged in. From there, click the verify button to send your JWT to the server for validation. Or, click the logout button to expire the cookie and be directed back to the log in page. You may also enter a different JWT to send to the server to validation. If the JWT was not signed with the server's secret, the JWT will be deemed invalid. 

### Deployed server + client 
http://ng-simple-auth.herokuapp.com/

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
##### /validate
###### GET
query params: `?jwt=[base64String].[base64String].[base64String]`    
return:       
- success: 
  - status: 200
  - body: `JSON String: { message: "VALID JWT" or "INVALID JWT - signature does not match", data: { header: Object, payload: Object, signature: String, valid: Boolean} } `
- failure: 
  - status: 422
  - body: `String: Expected object like {"name": "name", "pass": "pass"}, received ${body}`

##### /logout
###### GET 
return:       
- status: 200
- body: `String: Logged out`
- cookies: `jwt=''; Expires=${new Date('January 1 1990')}`   

## Running the tests 
`npm test`

### Test style 
tests are in the test/ folder - each test suite uses node's assert library, and exports a run function that runs all the tests.     
tests expect to have the assert object injected into the run method    
test/index.js loads each of the test suites into an array, and calls run with `require('assert').strict`   


## Design decisions and clarifications    
Perhaps the most jarring design decision is a deliberate avoidance of dependencies - no Express, jwt, or Mocha/Chai, in particular. I made this decision to challenge myself, to learn, and to make the application as lean as possible. All server code with the exception of the application entry point, index.js, resides in the src/ folder. Client code is in the public/ folder.  
### General server flow
index.js invokes a function exported by src/server.js, which starts an http server and logs out the port.     
src/server.js invokes a function exported by src/router.js, which invokes various handlers based on the path of the incoming http request.    src/authorization.js handles login, logout, and JWT verification, using functions exported by src/cookie.js to create and destroy cookies, and functions exported by src/jwt.js to encode and decode JWTs.  
### Client 
The client application is a very simple "SPA" that replaces parts of the DOM upon successful login. public/index.html is served in response to a GET to '/', and public/index.js handles the DOM manipulation as well as interaction with the server. 
        
## External code    
I borrow the strategy for base64 encoding strings from a StackOverflow post:    
Name:    
    - Original Answer: onteria_     
    - Edit: Dominic    
Version: None    
Purpose: Adhere to JWT standards outlined in [RFC 7519](https://tools.ietf.org/html/rfc7519)    
License: None    
Website: https://stackoverflow.com/questions/6182315/how-to-do-base64-encoding-in-node-js    

Sakura CSS is used to provide a light, sensible set of CSS defaults

Name: oxalorg    
Version: 1.0.0    
Purpose: Provide style, responsiveness, an aesthetic that I enjoy  
License: MIT    
Website: https://oxal.org/projects/sakura/  

## Libraries / Dependencies 
None

