# Change Pusher

POC: Client should be able to receive latest updates without having to send a request.

This is implemented using NestJS + Socket.io.

This POC demonstrates that the client can receive updates from the server using a socket connection that is kept-alive. The Client App is served using `@nestjs/serve-static`. It can be accessed at http://localhost:3000. This can be accessed once you run `npm run start`.

In order to simulate fetching data from a third-party when the user is connected to this server, I have used JSON-Server and a mock database in `json/users.json` which supports basic CRUD functionality. It can be run using `npm run json-server` and it is served at http://localhost:4000.

When both the servers are running, you can view the Client app at http://localhost:3000 on your browser, and try manipulating the records in `json/users.json` directly or via POST, PUT or DELETE requests to http://localhost:4000/users. It's API Documentation is available at http://localhost:4000.


