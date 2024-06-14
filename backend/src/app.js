const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const app = express();
const requestLogger = require( './utilites/requestlogger' );
const errorlogger = require( './utilites/errorlogger' );
const userRoute = require( './routes/userroute' )
const prodRoute=require( './routes/prodroute' )
app.use( bodyParser.urlencoded( {extended: true} ) );
app.use( bodyParser.json() );
app.use( cors() );
app.use( requestLogger );
app.use( '',userRoute );
app.use( '',prodRoute );
app.use( errorlogger )

app.listen( 2400,()=>{
    console.log( "server running on port 2400" )
} );