const http = require(`http`),
    app = require(`./app`),
    port = process.env.PORT || 3000,
    server = http.createServer(app);

server.listen(port);