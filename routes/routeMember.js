var express = require("express")
var router = express.Router()
const tbMember = require("../model/tbMember")

// this file like controller

module.exports = router

// show data
router.get("/member", (req, res) => { 
    tbMember.findAll()
        .then((Member) => {
            res.json(Member)
        })
        .catch(err => {
            res.send("Error : "+err)
        })
})

// add data
router.post("/member", (req, res) => {

    if(! req.body.is_valid_input){
        res.status(400)
        res.json({
            error: "Bad data"
        })
    }else{
        tbMember.create(
            /**{firstname: req.body.firstname,
            lastname: req.body.lastname,
            position: req.body.position,
            address: req.body.address,
            allowance: req.body.allowance,
            expenses: req.body.expenses,
            bank_account: req.body.bank_account
            } */
            req.body
        )
        .then(()=>{
            res.send("tbMember Added.")
        })
        .catch((err) => {
            res.send("Error: "+ err)
        })
    }
})

// delete data
router.delete("/member/:id", (req, res) => {
    tbMember.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(()=>{
        res.send("tbMember deleted.")
    })
    .catch((err) => {
        res.send("Error: "+ err)
    })
})

// update data
router.put("/member/:idx", (req, res) =>{

    if(!req.body.is_valid_input){
        res.status(400)
        res.json({
            error:"Bad data " + req.body
        })
    }else{
        tbMember.update(
            /**{firstname: req.body.firstname,
            lastname: req.body.lastname,
            position: req.body.position,
            address: req.body.address,
            allowance: req.body.allowance,
            expenses: req.body.expenses,
            bank_account: req.body.bank_account}*/
            req.body
            ,
            {where: {id: req.params.idx}}
        )
        .then(()=>{            
            res.send("tbMember updated.")
        })
        .error((err) => {
            res.send("Error: "+ err)
        })
        
    }
})

