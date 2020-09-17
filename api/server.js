const Food = require('../food/food-model')
const express = require("express");
const helmet = require("helmet");

const server = express();
server.use(express.json())
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json({ message: "It's working!!"});
});

server.post('/food', (req, res) => {
    if(req.body.name){
        Food.insert(req.body)
        .then(food => {
            res.status(201).json({data: food})
        })
        .catch(err => res.status(500).json({message: err.message}))
    } else {
        res.status(400).json({message: "Please provide a name"})
    }
})

server.delete('/:id/food', (req, res) => {
    Food.findById(req.params.id) ? 
    Food.remove(req.params.id)
    .then(id => {
        res.status(200).json(id)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    }) : res.status(404).json({message: 'cannot find food with that id'})
})
module.exports = server;