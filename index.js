const express = require('express');
const path = require('path');                           // path is an inbuilt module to find paths
const { urlencoded } = require('express');
const port = 800;

const db = require('./config/mongoose');                // importing db. Note : ' ./ ' is used to lood into same folder
const Contact = require('./models/contact');            // now Contact is model used to puppulated data base   
const app  = express();                                 // app will contain all the functionalities of express


app.set('view engine','ejs');                           // when you do app.set(), app has certain properties that tells its properties( just like in packaje.son), app{ x:y, m:n, ....}
app.set('views',path.join(__dirname,'views'));          // here int last 2 lines  we are setting x=view engine, y=ejs and m=views, n= path joining current directory and folder 'views'. __dirname gives current directory

app.use(urlencoded());                                  // its an inbuilt middleware,for eg when we submit form, the name & phone comes as a an object { name : x, phone : y} to req in function(req,res). this urlencoded will make the object accesible from req now                                                       
app.use(express.static('assets'));                      // inbuilt middleware that is used to access static files i.e assest folder that has css & javascript. Once we use this we dont have to write the full path of css and js in home.ejs. Only write path from 'assets' folder that has been accessed


// app.use(function(req,res,next){                      (custom middleware)
//    console.log("Middlewar 1 custom");
//    next();
// });



var contactList = [
    {
        name : "Vibhor",
        phone : "1111111111"
    },
    {
        name : "Iron Man",
        phone : "2222222222"
    },
    {
        name : "Spiderman",
        phone : "3333333333"
    }
]



app.get('/',function(req,res){                              // .get(x,func(req,res)) is inbuilt where it gets x that is the url and then handles if request is to be made or somthing needs to be responded 
    
//    return res.render('home',{ title : "My Contact List",   
//                                contact_list : contactList, // it means render home.ejs and it sends 2 varibles to home.ejs that is tittle & contact_list
//               });                                         // .render(x) renders x, .send(x) sends x. To send data into html, use {r,s} where r is an object(variable) and s is the content

    Contact.find({},function(err,contacts){                 // .find({x},func(){}) used to find in Contacts. x is to give query eg: Contacts.find({name: Vibhor}, funct{err,cons}) , this will only find contacts with name vibhor
        if(err){
            console.log('error in finding contact');
            return;
        }

        return res.render('home',{
                title:'Contact List',
                contact_list: contacts
        });
    });
}); 



app.get('/practise',function(req,res){

    return res.render('practise',{ title : 'Practise Page'});
});




app.post('/create-contact',function(req,res){               // note req has body{ x:y,m:n}, when form is submitted the object is sent to req
    
    // contactList.push(req.body);                             // req.body.name , req.body.phone can also be dons
    // return res.redirect('back');                            // 'back' will take you to the same page 

    Contact.create({                                        // Contact.create({},function{});
        name: req.body.name,
        phone: req.body.phone
    },
    function(err,newContact){                               // call back fucntion you eed to make whenever u create something to check if any error
        if(err){
            console.log('Error in creating contact');
            return;
        }

        console.log('************',newContact);
        return res.redirect('back');
    }
    );

});


app.get('/delete-contact/:phone',function(req,res){
    console.log(req.params);
    let phone = req.params.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex!=-1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');
});


// app.get('/delete-contact',function(req,res){                // to delete a contact              
//     /*
//     let phone = req.query.phone;                            // query is inbuilt and is passes when ?phone=<%= phone%> is called

//     let contactIndex = contactList.findIndex( j => j.phone == phone )   // j itertates over all index of contactList and findes index with phone number that needs to be deleted

//     if(contactIndex != -1){
//         contactList.splice(contactIndex,1);
//     }

//     return res.redirect('back');  */

//     let id = req.query.id;                              

//     Contact.findByIdAndDelete(id, function(err){              // function(err) has only one parameter because it is only deleting and not returning anything
//         if(err){
//             console.log('error in deleting contact');
//             return ;
//         }

//         return res.redirect('back');
//     });

// });



app.listen(port,function(err){
    if(err){
        console.log('Server has ERROR',err);
    }

    console.log('Express Server is running succesfully on port',port);
})











/* TYPES OF REQUESTS 
    1. .get() : the brower is sending a request to get a response from server that already exists int the database
    2. .post() : the brower is sending a request to change the data and send a response from server to browser
    3. .put() : the brower is sending a request to put some data 
    4. .patch() : simiiar to put, means to put some code
    5. .delete() : the brower is sending a request to server to delete an id. 
*/