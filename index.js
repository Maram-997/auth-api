'use strict';

const server = require('../src/server.js');

const {db} = require('..src/models/indes');


db.sync()
.then(()=>{
    server.start(3000);
})
.catch(console.error);