const fs = require("fs");
const readline = require('readline');
const { faShuttleSpace } = require("@fortawesome/free-solid-svg-icons");
const { default: axios } = require("axios");

// var url = "http://localhost:3000/movies/1";
var url = "http://localhost:3000/movies";
var first_api_url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCjYnWflySrOIM8VandgNkGOkBqZh0jPUs";
var second_api_url = "https://language.googleapis.com/v1beta1/documents:analyzeEntities?key=AIzaSyCjYnWflySrOIM8VandgNkGOkBqZh0jPUs";

const rs = fs.createReadStream("./file.txt");
const ws = fs.createWriteStream("./output.csv");

var secondApiObj = {
        "document": {
            "type": "PLAIN_TEXT",
            "language": "JA",
            "content": "福田昌広"
        },
        "encodingType": "UTF8"
}

const rl = readline.createInterface({
    input: rs, 
    outpu:ws
    
})
let i = 1;
rl.on('line', async function (data) {
    console.log(`${i}: ${data}`);
    i++;
    await axios.post(second_api_url, secondApiObj)
    .then((res)=>{
        console.log(res.data);
            // entities[0].name);
    })
    .catch(()=>{
    console.log('err');
    })
})
console.log("end");

var a = {anzu:123,obj:{api:'nice'}};
// fs.appendFileSync('file.txt', JSON.stringify(a) + '\n' +'nice')