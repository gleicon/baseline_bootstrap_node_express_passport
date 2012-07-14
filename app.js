var http            = require("http")                                           
var express         = require('express')                                        
var mongoose        = require('mongoose');                                      
var passport        = require('passport');                                      
var LocalStrategy   = require('passport-local').Strategy;                       
var config          = require('config');                                        

var app = express.createServer(express.logger())                                
                                                                                    
app.use(express.bodyParser());                                                  
                                                                                
app.configure(function(){                                                       
    app.set('views', __dirname + '/views');                                     
    app.set('view engine', 'ejs');                                              
    app.use(express.bodyParser());                                              
    app.use(express.methodOverride());                                          
    app.use(express.cookieParser());                                              
    app.use(express.session({secret: 'elguero'}));                              
    app.use(passport.initialize());                                                                                                                                             
    app.use(passport.session());                                                
    app.use(app.router);                                                        
    app.enable("jsonp callback");                                               
    app.use(express.logger({ format: ':method :url' }));                        
    app.use(express.static(__dirname + '/public'));                             
});                                                                             
                                                                                
app.configure('development', function(){                                        
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));    
});                                                                             
                                                                                
app.configure('production', function(){                                         
    app.use(express.errorHandler());                                            
});

app.error(function(err, req, res, next){                                        
    console.log(err);                                                           
    res.render('500.ejs', { locals: { error: err },status: 500 });             
}); 

app.get('/', function(req, res){                                                                                                           
  res.render('index');                                                            
});

app.listen(5000);
