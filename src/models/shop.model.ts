import mongoose, { Schema } from "mongoose";

//!dmbg
const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'
// Declare the Schema of the Mongo model
var shopSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        maxLenght: 150
    },
    email:{
        type:String,
        trim: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify:{
        type: Schema.Types.Boolean,
        enum: ['active', 'inactive'],
        default: false
    },
},{
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
export = mongoose.model(DOCUMENT_NAME, shopSchema);