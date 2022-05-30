const fs = require("fs");
const readline = require('readline');

const rs = fs.createReadStream("./Query.json");
const ws = fs.createWriteStream("./output.csv");

const rl = readline.createInterface({
    input: rs, 
    outpu:ws
    
})