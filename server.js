var express = require("express")
var bodyParser = require("body-parser")
var cors = require("cors")
var port = 3000
var app = express()

// configuration
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.disable('view cache');

// static file for Exceltemplate
app.use('/api/printPage1/ExcelTemplate_files/',express.static('views/ExcelTemplate_files')) 
app.use('/api/printPage2/ExcelTemplate_files/',express.static('views/ExcelTemplate_files')) 
app.use('/api/printPage3/ExcelTemplate_files/',express.static('views/ExcelTemplate_files')) 
app.use('/api/printPage4/ExcelTemplate_files/',express.static('views/ExcelTemplate_files')) 
app.use('/api/printPage5/ExcelTemplate_files/',express.static('views/ExcelTemplate_files')) 

// add router
app.use("/api", require("./routes/tasks"))
app.use("/api",  require("./routes/routeMember"))
app.use("/api", require("./routes/routeWorksheets"))
app.use("/api", require("./routes/routeWorkdetails"))

// establish server
app.listen(port, () => {
    console.log(`Server running at port ${port} `)
})
