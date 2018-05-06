var faker      = require("faker") ;
var mysql      = require("mysql") ;
var express    = require("express") ;
var bodyParser = require("body-parser") ;

var app = express() ;

app.set("view engine" , "ejs");

app.use(bodyParser.urlencoded({extended:true})) ;
app.use(express.static(__dirname + "//public")) ;

var connection = mysql.createConnection({
    host     : 'localhost' ,
    user     : 'himanshusantolia' ,
    database : 'join_us_app'
});

// var person = {email : faker.internet.email() , created_at : faker.date.past()} ;

// console.log(person) ;

// var result = connection.query( 'INSERT INTO users SET ?' , person , function(error,results,fields){
//     if(error) throw error ;
//     console.log(results) ;
// });

// console.log(result.sql) ;

// connection.end() ;

// --------------------------------------------------------------- //

// var data = [
//     ['thug@live.com' , '2017-06-29T16:25:06.484Z'] ,
//     ['thuglife@gmail.com' , '2017-11-25T21:48:45.381Z'] ,
//     ['virat@gmail.com','2017-11-04T10:45:01.185Z']
// ];
// var q = 'INSERT INTO users (email,created_at) VALUES ?' ;
// connection.query(q , [data] , function(err,results,field){
//     if(err) throw err ;
//     console.log(results) ;
// }) ;


// -------------------------------------------------------------------------------- //


// var data = [] ;

// for(var i=0;i<500;i++)
// {
//     data.push([ faker.internet.email() , faker.date.past() ]) ;
// }
// // console.log(data) ;

// var q = 'INSERT INTO users(email,created_at) VALUES ?' ;
// connection.query(q , [data] , function(err,results,field){
//     if(err) throw err ;
//     console.log(results) ;
// });

// connection.end() ;


// ------------------------------------------------------------------------------------ //

app.get("/" , function(req,res){
    var q = 'SELECT COUNT(*) AS count FROM users';
    connection.query(q,function(err,result){
        if(err) res.send(err);
        else{
            var out = result[0].count ;
            res.render("landing" , {out : out , eml : "" , error : ""});
        }
    });
});

app.post("/" , function(req,res){
    var person = {email : req.body.email} ;
    var q = "INSERT INTO users SET ?" ;
    
    connection.query(q,person,function(err,result){
        if(err){
            if(err.code == "ER_DUP_ENTRY"){
                var q = 'SELECT COUNT(*) AS count FROM users';
                connection.query(q,function(err,result){
                    if(err) res.send(err);
                    else{
                        var out = result[0].count ;
                        res.render("landing" , {out : out , eml : person.email , error : "dup"});
                    }
                });
            }
        }
        else{
            var q = 'SELECT COUNT(*) AS count FROM users';
                connection.query(q,function(err,result){
                    if(err) res.send(err);
                    else{
                        var out = result[0].count ;
                        res.render("landing" , {out : out , eml : person.email ,error : "" });
                    }
                });
        }
    });
});

// ----------------------------------------------------- //

app.listen(8080, function () {
 console.log('App listening on port 8080!');
});








