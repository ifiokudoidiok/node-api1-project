// implement your API here
const express = require("express");
const cors = require("cors");

const db = require('./data/db')


const server = express();

server.use(cors());
server.use(express.json());

server.get('/api/users', getAllUsers)
server.post('/api/users', postUser)
server.get('/api/users/:id', getUserById)
server.delete('/api/users/:id', deleteUser)
server.put('/api/users/:id', editUser)

server.get('/', handleRequest) 

function editUser(req, res){
    const id = req.params.id;
    const updatedUser = req.body;
    db.update(id, updatedUser)
    .then(update => {
        if(update){
            if(!((updatedUser.name) || (updatedUser.bio))){
                res.status(400).json({
                    success:false,
                    errorMessage: "Please provide name and bio for the user."
                })
            }
            res.status(200).json({
                success:true,
                updatedUser
            })
        }else{
            res.status(404).json({
                success:false,
                message: "The user with the specified ID does not exist."
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            success:false,
            error: "The user information could not be modified." 
        })
    })
}

function deleteUser(req, res) {
    const id = req.params.id;
    db.remove(id)
    .then(deletedUser => {
        if(deleteUser){
            res.status(400).end()
        }else{
            res.status(404).json({
                success:false,
                message: "The user with the specified ID does not exist." 
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            success:false,
            error: "The user could not be removed"
        })
    })
}

function getUserById(req, res){
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        if(user){
            res.status(200).json({
                success: true,
                user
            })
        }else{
            res.status(404).json({
                success:false,
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            success:false,
            error: "The user information could not be retrieved."
        })
    })
}

function postUser(req, res){
    const newUser = req.body;
db.insert(newUser)
.then(user => {
    res.status(201).json({success:true, user})
})
.catch(error => {
    res.status(500).json({
        success:false,
        error,
    })
})
}

function getAllUsers(req, res) {
  
    db.find()
    .then( users => {
       
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            error: "The users information could not be retrieved.",
        });
    });
}
  

function handleRequest(req, res) {
    res.json('Node is up and running! ' )
}


server.listen(process.env.PORT || 4000, () => {
    console.log('running on ', process.env.PORT || 4000)
})
 