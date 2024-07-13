const mongoose = require("mongoose")

const connectDB = async () => {
    try {
         const conn= await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MongoDB${conn.connection.host}`)
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error)
        return error
    }
}

module.exports = connectDB