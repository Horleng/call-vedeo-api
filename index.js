const express = require('express');
const app = express();
const http = require('http');
const {Server} = require("socket.io");
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"https://kh-videocall.netlify.app",
        methods:["GET","POST"]
        },
});
server.listen(5000,()=>console.log("http://localhost:5000"));
io.on("connection",socket=>{
    socket.on("join",({room,id})=>{
        socket.join(room);
        socket.broadcast.to(room).emit("user-joined",{id});
        socket.on('disconnect',()=>{
            socket.broadcast.to(room).emit('user-disconnect',{id});
        })
        socket.on('change-screen',id=>{
            socket.broadcast.to(room).emit('friend-screen',id);
        })
        socket.on("changeScreen",({room})=>{
            socket.broadcast.to(room).emit('user-change-screen',{id});
        })
    });
})

// const removeGroup = ()=>{
//     all_friends = all_friends.filter(friend=>friend.members.length !==0);
// }
// const AddFriends = (room,id) =>{
//     if(!all_friends.some(friend=>friend.room===room)) 
//         all_friends.push({room:room,members:[id]});
//     else{
//         const currRoome = all_friends.find(friend=>friend.room===room);
//         if(currRoome){
//             !currRoome.members.some(friend=>friend.id===id)&&
//             currRoome.members.push(id);
//         }
//     }
// } 

// const removeFriends = (room,id) =>{
//     const currRoome = all_friends.find(friend=>friend.room===room);
//     if(currRoome){
//         currRoome.members = currRoome.members.filter(memId=>memId!==id);
//     }
//     console.log({currRoome});
// }