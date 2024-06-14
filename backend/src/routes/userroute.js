const express = require( "express" );
const userRoute = express.Router();
const userServ = require('../service/user')

userRoute.get( "/userDBsetup", ( req, res, next ) => {
    userServ.setupDB().then( response => {
        if( response ) res.json( { message: "Successfully inserted " + response + " documents into database" } )
    } ).catch( error => {
        next( error );
    } )
} )

userRoute.post( '/login', ( req, res, next ) => {
    var username = req.body.userName;
    var password = req.body.password;
    // //console.log(username,password);
    
    return userServ.loginUser( username, password ).then( userData => {
        res.json( userData );
        //console.log(userData);
        
    } ).catch( err => {
        
        next( err );
    } );
} );
userRoute.post( '/register', ( req, res, next ) => {
    var username = req.body.userName;
    var password = req.body.password;
    var firstname = req.body.firstName;
    var lastname = req.body.lastName
    // //console.log(username,password);
    console.log(req.body)
    return userServ.registerUser( username, password , firstname,lastname ).then( userData => {
        res.json( userData );
        //console.log(userData);
        
    } ).catch( err => {
        
        next( err );
    } );
} );
userRoute.put('/update/:username',(req,res,next)=>{
    var username = req.params.username;
    var order = req.body;   
    return userServ.pushOrders(username,order).then(data =>{
        res.json(data);
        //console.log(data);
        
    }).catch( err => {
        
        next( err );
    } );

})

userRoute.get('/getorders/:username',(req,res,next)=>{
    var username = req.params.username;
    return userServ.getOrders(username).then(data =>{
        res.json(data);
        //console.log("get-->",data);        
    }).catch( err => {        
        next( err );
    } );
})

module.exports = userRoute