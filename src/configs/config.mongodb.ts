//level 0

// const config = {
//     app: 
//     {
//         port :3052
//     },
//     db:
//     {
//         host: 'localhost',
//         name: 'shopDEV',
//         port: 27017
//     }
// }

// level 1
const dev = {
    app: 
    {
        port : process.env.DEV_APP_PORT|| 3000
    },
    db:
    {
        host: process.env.DEV_DB_HOST || 'localhost',
        name: process.env.DEV_DB_NAME || 'dbDEV',
        port: process.env.DEV_DB_PORT || 27017
    }
}

const pro = {
    app: 
    {
        port : process.env.PRO_APP_PORT || 3000
    },
    db:
    {
        host: process.env.PRO_DB_HOST || 'localhost',
        name: process.env.PRO_DB_NAME || 'dbProduct' ,
        port: process.env.PRO_DB_PORT || 27017
    }
}

const config : any = {dev, pro}
const env : any = process.env.NODE_ENV || 'dev'
console.log(config[env], env)
export const configs =  config[env]