const mongoose = require('mongoose')
import { configs } from "@/configs/config.mongodb";
const {db: {host, name, port}} = configs;

const connectString = `mongodb://${host}:${port}/${name}`

class Database{
    static instance: Database;
    constructor(){
        this.connect();
    }

    //Connect database
    connect(type = 'mongodb'){
        if (1 === 1){
            mongoose.set('debug', true);
            mongoose.set('debug', {color: true});
        }
        mongoose.connect(connectString, {
            maxPoolSize: 50
        }).then(()=> {
            console.log("Connected to mongodb PRO")
            console.log(`Connection string: ${connectString}`)
        })
        .catch((err : any) => console.log("Error connecting to mongodb"));
    }
    
    static getInstance(){   
        if (!Database){
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const mongodbInstance = Database.getInstance();
module.exports = mongodbInstance;