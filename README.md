Each application requires a README. Please ensure the README includes the following
components:

● Which application you choose to develop and why
    I chose to develop Authentication Server. It is, to me, the most interesting and most generally applicable challenge. Most interesting because I have an affinity for server-side work and application security. Most generally applicable because, while the other applications are good for showing to others, the Authentication Server is an opportunity to build small libraries for myself, and to write code I may reuse in other projects. While the challenges of JWT processing, Node servers, cookies, and testing are often solved with dependencies, I imposed an added condition on the project - it uses no external libraries, except where absolutely necessary (database). Testing, JWT, server, crypto - all done with vanilla Node.

● How to use/test the provided application

● What Operating System (+ service pack) and libraries are required

● Any design decisions or behavioral clarifications that illustrate how your program
functions and why
    Perhaps the most jarring design decision is a deliberate avoidance of dependencies - no Express, dotenv, or Mocha/Chai, in particular. I made this decision to challenge myself, to learn, and to make the application as lean as possible.
    General application flow: 
        index.js invokes a function exported by src/server.js, which starts an http server and logs out the port.     
        server.js invokes a function exported by lib/router.js, which invokes various handlers based on the path of the incoming http request.     
        lib/authorization.js handles login, logout, and JWT verification, using functions exported by lib/cookie.js to create and destroy cookies, and functions exported by lib/jwt.js to encode and decode JWTs.     
        lib/jwt.js relies on the presence of a "secret", either in process.env, or in a file called "secret" located in lib/. The secret is used to make a sha-256 digest and sign a JWT.

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