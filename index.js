// implement your API here
const express = require("express");
const cors = require("cors");


const server = express();

server.use(cors());
server.use(express.json());


server.get('*', handleRequest)

function handleRequest(req, res) {
    res.json('hellos ' + req)
}


server.listen(process.env.PORT || 5000, () => {
    console.log('running on ', process.env.PORT || 5000)
})
 