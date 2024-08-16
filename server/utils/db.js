const mongoose=require("mongoose");

const URI = process.env.MONGO_DB1;

//const URI=process.env.MONGO_DB
//const URI ="mongodb://atlas-sql-66ae655e04f9274cb250de88-ue4o1.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin"

const connetDb = async()=>{
    try {
        await mongoose.connect(URI);
        console.log("connection successful to DB");
        
    } catch (error) {
        console.error("database connection failed");
        process.exit(0);
    }

}

module.exports=connetDb;

//npm i dotenv for hide data or password