const { model, Schema } = require("mongoose"); 

const contactSchama = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },

});

const Contact = new model("Contact", contactSchama);
module.exports=Contact