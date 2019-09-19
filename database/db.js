const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize("cashbill", "root", "123456", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases:false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        useUTC: false, // for reading from database
    },
    timezone: '+07:00', // for writing to database
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db