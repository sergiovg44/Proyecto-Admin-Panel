const mongoose = require( "mongoose")
const dbUrl = process.env.MONGO_URL;
const connectToDatabase = async () => {
    try{
        await mongoose.connect(dbUrl ,{
        })
        console.log('Conexion a mongoDB exitosa')
    }catch (err){
        console.log('Error al conectar con MongoDB')
    }
}
module.exports = connectToDatabase