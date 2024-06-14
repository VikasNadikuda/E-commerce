const{ Schema } = require( 'mongoose' );
const mongoose = require( 'mongoose' );
mongoose.set( 'useCreateIndex',true )
mongoose.Promise = global.Promise;
// const url ="mongodb+srv://vikas:Vikas@1997@project.gmkarxu.mongodb.net/"
const url = "mongodb://localhost:27017/admin"
const usersSchema = Schema( {
    userId: {type: Number, required: [true, 'userId is required'], unique: true},
    userdetails: {
        userName: {  
        type: String,
        unique: true
    },
        password: {
            type: String
        },
        fname: {
            type: String
        },
        lastName:{
            
        },
        googleAuth:{
            type:Boolean
        }
    },
    order: {
        type: Array
    }

}, {collection: "Users", timestamps: true } )
const ProductSchema=Schema( {
    _id: {
        type: String
    },
    pName: {
        type: String
    },
    pDescription: {
        type: String
    },
    pRating: {
        type: Number
    },
    pCategory: {
        type: String
    },
    price: {
        type: Number
    },
    color: {
        type: String
    },
    image: {
        type: String
    },
    specification: {
        type: String,
        default: ""
    },
    dateFirstAvailable: {
        date: {
            type: Date, 
            default: new Date().toISOString()
        }
    },
    dateLastAvailable: {
        date: {
            type: Date, 
            default: new Date().toISOString()
        }
    },
    pSeller: {
        sid: {
            type: String
        },
        pDiscount: {
            type: Number
        },
        pQuantity: {
            type: Number
        },
        pShippingCharges: {
            type: Number
        }
    },
    
}, {collection: "Products" } )

let collection = {}
collection.getUserCollection = () => {
    //establish connection and return model as promise
    return mongoose.connect( url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} ).then( database => {
        //console.log(database)
        return database.model( 'Users', usersSchema )
    } ).catch( error => {
        if( error ){ //
        let err = new Error( "Could not connect to the database" );
        err.status = 500;
        throw err;}
    } );
}
collection.getProductCollection = () =>{
    return mongoose.connect( url,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} ).then( database=>{
        //console.log(database)
        return database.model( 'Product',ProductSchema )
    } ).catch( error =>{
        if( error ){
            //console.log(error)
            let err = new Error( "Could not connect to the database" );
            err.status = 500;
            throw err;
        }
    } )
}
module.exports = collection;