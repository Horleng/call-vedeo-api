const express = require('express');
const app = express();
const http = require('http');
const {Server} = require("socket.io");
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
        },
});
server.listen(5000,()=>console.log("http://localhost:5000"));
io.on("connection",socket=>{
    socket.on("join",({room,id})=>{
        console.log(socket.id)
        socket.join(room);
        socket.broadcast.to(room).emit("user-joined",{id});
        socket.on('disconnect',()=>{
            socket.broadcast.to(room).emit('user-disconnect',{id});
        })
    });
})

