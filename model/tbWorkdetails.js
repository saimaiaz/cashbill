const Sequelize = require("sequelize")
const db = require("../database/db.js")

// this file like model

module.exports = db.sequelize.define(
    "tb_work_details",
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        worksheets_id: Sequelize.INTEGER,
        ord: Sequelize.INTEGER,
        go: Sequelize.STRING,
        dt_go: Sequelize.DATE,
        to: Sequelize.DATE,
        dt_to: Sequelize.DATE,
        working_report: Sequelize.DATE,
        is_full_row: Sequelize.INTEGER,
        
    },
    {
        timestamps: false
    }
)