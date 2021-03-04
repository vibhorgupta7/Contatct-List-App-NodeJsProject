// This is a schema. Schema is ritten for mongoose for it to access & poppulate the database
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({         // .Schema({}) used to make schema 

    name : {
        type: String,                           // specify the type
        required: true                             // validation 
    },

    phone : {
        type:String,
        required: true
    }
}); 

const Contact = mongoose.model('Contact',contactSchema);        // Making a model. A model is a class with which we create documents (objects). Documents have properties as mentioned in schema              

module.exports = Contact;