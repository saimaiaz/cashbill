const Sequelize = require("sequelize")
const db = require("../database/db.js")

// this file like model

module.exports = db.sequelize.define(
    "tb_members",
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: Sequelize.STRING
        }
        ,
        lastname: {
            type: Sequelize.STRING
        }
        ,
        position: {
            type: Sequelize.STRING
        }
        ,
        address: {
            type: Sequelize.STRING
        }
        ,
        allowance: {
            type: Sequelize.FLOAT(12,2)
        }
        ,
        expenses: {
            type: Sequelize.FLOAT(12,2)
        }
        ,
        bank_account: {
            type: Sequelize.STRING
        }
        ,
        emp_no: {
            type: Sequelize.STRING
        }
        ,
        belong_to: {
            type: Sequelize.STRING
        }
        ,
        taxi: {
            type: Sequelize.INTEGER
        }
        ,
        etc: {
            type: Sequelize.FLOAT(12,2)
        }
    },
    {
        timestamps: false
    }
)