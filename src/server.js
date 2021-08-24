const express = require('express');
const app = express();

const error404 = require()
const error500 = require()

const logger = require()

const usersRoutes = require()

app.use(express.json());
app.use(logger)
app.use('/badConnection', (req,res,next)=>{
next('SOMETHING WENT WRONG');
});
app.use('*', error404);
app.use(error500);

module.exports = {
    server : app,
    start : (port) =>{
        app.listen(port, () => console.log('SERVER IS UP'));
    }
}