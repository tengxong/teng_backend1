const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '5.189.153.72',
    user: 'jack',
    password: '123456',
    database: 'teng',
    // host: 'localhost',
    // user: 'root',
    // password: '123456',
    // database: 'Econox',
    // port: '3307'

})

connection.connect()

function fetch (query, params){
    return new Promise ((resolve, reject) =>{
        try{
            connection.query( query,params,function(err,result){
              if (err){
                return reject(err)
              }
              return resolve(result)
            });
        }
        catch(e){
            reject(e)
        }
    })
};
function update (query, params){
    return new Promise ((resolve, reject) =>{
        try{
            connection.query( query,params,function(err,result){
              if (err){
                return reject(err)
              }
              return resolve('success')
            });
        }
        catch(e){
            reject(e)
        }
    })

};
 module.exports={fetch, update}