var express = require("express")
var router = express.Router()
const tbWorkdetails = require("../model/tbWorkdetails")
const sequelize = require("sequelize")

// this file like controller

module.exports = router

// http://localhost:3000/api/workdetails
// show data
router.get("/workdetails/:id", (req, res) => { 
    tbWorkdetails.findAll({
            attributes: [
                'id',
                'worksheets_id' ,
                'ord' ,
                'go' ,
                'dt_go' ,
                [sequelize.fn('date_format', sequelize.col('dt_go'), '%d-%m-%Y'), 'dt_go_date'] ,
                [sequelize.fn('date_format', sequelize.col('dt_go'), '%H:%i'), 'dt_go_time'] ,
                'to' ,
                'dt_to' ,
                [sequelize.fn('date_format', sequelize.col('dt_to'), '%d-%m-%Y'), 'dt_to_date'] ,
                [sequelize.fn('date_format', sequelize.col('dt_to'), '%H:%i'), 'dt_to_time'] ,
                'working_report' ,
                'is_full_row' 
            ],
            where:{
                worksheets_id: req.params.id
            }
        }
        
        ).then((Workdetails) => {            
            res.json(Workdetails)
        })
        .catch(err => {
            res.send("Error : "+err)
        })
})

// add data
router.post("/workdetails", (req, res) => {

    if(! req.body.is_valid_input){
        res.status(400)
        res.json({
            error: "Bad data"
        })
    }else{
        tbWorkdetails.create(
            req.body
        )
        .then(()=>{
            res.send("tbWorkdetails Added.")
        })
        .catch((err) => {
            res.send("Error: "+ err)
        })
    }
})

// delete data
router.delete("/workdetails/:id", (req, res) => {
    tbWorkdetails.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(()=>{
        res.send("tbWorkdetails deleted.")
    })
    .catch((err) => {
        res.send("Error: "+ err)
    })
})

// update data
router.put("/workdetails/:idx", (req, res) =>{

    if(!req.body.is_valid_input){
        res.status(400)
        res.json({
            error:"Bad data " + req.body
        })
    }else{
        tbWorkdetails.update(            
            req.body
            ,
            {where: {id: req.params.idx}}
        )
        .then(()=>{            
            res.send("tbWorkdetails updated.")
        })
        .error((err) => {
            res.send("Error: "+ err)
        })
        
    }
})

