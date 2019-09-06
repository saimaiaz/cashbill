const Sequelize = require("sequelize")
const db = require("../database/db.js")

// this file like model

module.exports = db.sequelize.define(
    "tb_worksheets",
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
        ,
        name: {
            type: Sequelize.STRING
        }
        ,
        work_no: {
            type: Sequelize.STRING
        }
        ,
        work_date_send: {
            type: Sequelize.DATEONLY
        }
        ,
        activity: {
            type: Sequelize.STRING
        }
        ,
        work_job_no: {
            type: Sequelize.STRING
        }
        ,
        work_type: {
            type: Sequelize.STRING
        }
        ,
        other_specify: {
            type: Sequelize.STRING
        }
        ,
        training_no: {
            type: Sequelize.STRING
        }
        ,
        training_no: {
            type: Sequelize.STRING
        }
        ,
        training_name: {
            type: Sequelize.STRING
        }
        ,
        comments: {
            type: Sequelize.STRING
        }
        ,
        commander: {
            type: Sequelize.STRING
        }
        ,
        work_start: {
            type: Sequelize.DATE
        }
        ,
        work_end: {
            type: Sequelize.DATE
        }
        ,
        fuel: {
            type: Sequelize.FLOAT
        }
        ,
        work_day_amount: {
            type: Sequelize.FLOAT
        }
        ,
        hostel_day_amount: {
            type: Sequelize.FLOAT
        }
        ,
        member_id: {
            type: Sequelize.INTEGER
        }
        ,
        account_code: {
            type: Sequelize.STRING
        }
        ,
        cost_code: {
            type: Sequelize.STRING
        }
        ,
        budget_code: {
            type: Sequelize.STRING
        }
        ,
        expressway: {
            type: Sequelize.FLOAT
        }
        
        
    },
    {
        timestamps: false
    }
)