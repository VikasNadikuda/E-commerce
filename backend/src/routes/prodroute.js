const express = require( "express" );
const prodRoute = express.Router();
const prodServ = require('../service/product');

prodRoute.get( "/prodDBsetup", ( req, res, next ) => {
    prodServ.setupDB().then( response => {
        if( response ) res.json( { message: "Successfully inserted " + response + " documents into database" } )
    } ).catch( error => {
        next( error );
    } )
} )
prodRoute.get( "/fetchdetails/:item", ( req, res, next )=>{
    let category=req.params.item
    //console.log("hi");
    
    prodServ.getProddetails( category ).then( data=>{
        if( data ){
            res.json( data )
            //console.log(data);
             
        }
    } ).catch( error=>{
        next( error )
    } )
} )

prodRoute.get("/searchdetails/:searchitem",(req,res,next)=>{
    let searchitem = req.params.searchitem;
    prodServ.search( searchitem ).then( data=>{
        if( data )
        res.json( data );
        //console.log(data);
        
    } ).catch( error=>{
        next( error )
    } )
})
prodRoute.get("/getAll",(req,res,next)=>{
    prodServ.getAllprod().then(data=>{
        if(data){
            res.json(data)
        }
    }).catch( error=>{
        next( error )
    } )
})
prodRoute.put('/qty',(req,res,next)=>{
    var order = req.body;   
    return prodServ.updateQty(order).then(data =>{
        res.json(data);        
    }).catch( err => {        
        next( err );
    } );

})
module.exports=prodRoute