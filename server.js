const express = require('express'); 

const app = express(); 

//configurable middleware that returns a middleware and takes parameters


app.get('/',(req,res)=> { 
  throw new Error('error hoiche'); 
  // res.send('Hello from the server!'); 
})


const loggerWrapper = (options) => { 
    return function (req,res,next) { 
      if(options.log) 
      console.log(`${new Date().toLocaleDateString()} - ${req.originalUrl} - ${req.protocol} - ${req.path} ${req.connection.remoteAddress}`) 
      next(); 
    } 
}; 

//mounting the middleware 
app.use(loggerWrapper({log: false}))

const errorHandler = (err,req,res,next) => { 
  console.log('There was an error 💥💥💥',err); 
  res.status(500).send('There was a error in server side!'); 
}

app.use(errorHandler) 

app.listen(3000, () => { 
  console.log(`Listening on port 3000`); 
})