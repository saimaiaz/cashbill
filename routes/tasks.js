var express = require("express")
var router = express.Router()
const Task = require("../model/Task")

// this file like controller

module.exports = router

// show data
router.get("/tasks", (req, res) => { 
    Task.findAll()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.send("Error : "+err)
        })
})

// add data
router.post("/task", (req, res) => {
    if(! req.body.task_name){
        res.status(400)
        res.json({
            error: "Bad data"
        })
    }else{
        Task.create(req.body)
        .then(()=>{
            res.send("Task Added.")
        })
        .catch((err) => {
            res.send("Error: "+ err)
        })
    }
})

// delete data
router.delete("/task/:id", (req, res) => {
    Task.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(()=>{
        res.send("Task deleted.")
    })
    .catch((err) => {
        res.send("Error: "+ err)
    })
})

// update data
router.put("/task/:idx", (req, res) =>{
    if(!req.body.task_name){
        res.status(400)
        res.json({
            error:"Bad data"
        })
    }else{
        Task.update(
            {task_name: req.body.task_name},
            {where: {id: req.params.idx}}
        )
        .then(()=>{            
            res.send("Task updated.")
        })
        .error((err) => {
            res.send("Error: "+ err)
        })
        
    }
})

