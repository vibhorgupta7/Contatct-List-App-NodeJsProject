const mongoose = require('mongoose');                       // aquiring library mongoose to var mongoose

mongoose.connect('mongodb://localhost/contact_list_db');    //connecting localhost to database    

const db = mongoose.connection;                           // aquire the connection to var db to see if it has error or running succefully

db.on('error',console.error.bind(console,'error connecting to db'));    // if error. console.error.bind() is like console.log


db.once('open',function(){                                              // once() line 3 connection is open to database, tell succesfull

    console.log('Succesfully connected to database.')
});