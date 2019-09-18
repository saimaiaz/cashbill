var express = require("express")
var router = express.Router()
var mylib = require("../myLibs")
const tbWorksheets = require("../model/tbWorksheets")
const tbMember = require("../model/tbMember")

// define relationship between model 
// this mean replace the sql join
tbWorksheets.belongsTo(tbMember, {as:'tbMember', foreignKey: 'member_id'})
tbMember.hasMany(tbWorksheets, {as:'tbWorksheets', foreignKey:'id'})

// this file like controller
module.exports = router

// export HTML Excel file to print
// http://localhost:3000/api/printPage1/1
router.get("/printPage1/:id",async (req, res)=>{
    var db_data

    await tbWorksheets.findAll
    ({
        where:{id: req.params.id},
        include:{ // replace for sql join
            model: tbMember,
            as: 'tbMember'
        }
    })
    .then((Worksheets) => {
        db_data = {'data': Worksheets[0]}

        // Computed the sum of allowance and expenses etc...
        var _sum_allowance
        db_data.data.sum_allowance = mylib.formatCurrency(_sum_allowance=parseInt(db_data.data.work_day_amount) * parseFloat(db_data.data.tbMember.allowance))

        var _sum_expenses
        db_data.data.sum_expenses = mylib.formatCurrency(_sum_expenses = parseInt(db_data.data.hostel_day_amount) * parseFloat(db_data.data.tbMember.expenses))

        var _sum_all
        db_data.data.sum_all = mylib.formatCurrency(_sum_all = parseFloat(_sum_allowance) + parseFloat(_sum_expenses) + parseFloat(db_data.data.tbMember.taxi) + parseFloat(db_data.data.fuel) + parseFloat(db_data.data.expressway))

        db_data.data.tbMember.taxi = mylib.formatCurrency(parseFloat(db_data.data.tbMember.taxi))
        db_data.data.fuel = mylib.formatCurrency(parseFloat(db_data.data.fuel))
        db_data.data.sum_all_text = mylib.BAHTTEXT(_sum_all)
        db_data.data.work_date_send_thai = mylib.formatThaiShortDate(db_data.data.work_date_send)
        

        // res.send( BT.BAHTTEXT('123') )         
        
    })
    .catch(err => {
        res.send("Error : "+err)
    })
    
    res.render('ExcelTemplate.ejs', db_data)
})

// http://localhost:3000/api/workdetails
// show data
router.get("/worksheet", (req, res) => { 
    tbWorksheets.findAll()
        .then((Worksheets) => {
            res.json(Worksheets)
        })
        .catch(err => {
            res.send("Error : "+err)
        })
})

// add data
router.post("/worksheet", (req, res) => {

    if(! req.body.is_valid_input){
        res.status(400)
        res.json({
            error: "Bad data"
        })
    }else{
        tbWorksheets.create(
            req.body
        )
        .then(()=>{
            res.send("tbWorksheets Added.")
        })
        .catch((err) => {
            res.send("Error: "+ err)
        })
    }
})

// delete data
router.delete("/worksheet/:id", (req, res) => {
    tbWorksheets.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(()=>{
        res.send("tbWorksheets deleted.")
    })
    .catch((err) => {
        res.send("Error: "+ err)
    })
})

// update data
router.put("/worksheet/:idx", (req, res) =>{

    if(!req.body.is_valid_input){
        res.status(400)
        res.json({
            error:"Bad data " + req.body
        })
    }else{
        tbWorksheets.update(
            req.body ,
            {where: {id: req.params.idx}}
        )
        .then(()=>{            
            res.send("tbWorksheets updated.")
        })
        .error((err) => {
            res.send("Error: "+ err)
        })
        
    }
})

