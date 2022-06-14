// const fetch = require('node-fetch');
// const fetch = require('node-feth');
// import fetch from "node-fetch"

const { faShuttleSpace } = require("@fortawesome/free-solid-svg-icons");
const { default: axios } = require("axios");

// var url = "http://localhost:3000/movies/1";
var url = "http://localhost:3000/movies";
var first_api_url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCjYnWflySrOIM8VandgNkGOkBqZh0jPUs";
var second_api_url = "https://language.googleapis.com/v1beta1/documents:analyzeEntities?key=AIzaSyCjYnWflySrOIM8VandgNkGOkBqZh0jPUs";

// fetch(first_api_url, {
//     method: 'GET',
//     headers: {
//         'Content-type':'application/json'
//     },
//     body: JSON.stringify(firstApiObj)
//     })
//     .then((res) => console.log(res.json()))
//     .then((site)=>{
//             console.log(site)
//     })

var secondApiObj = {
        "document": {
            "type": "PLAIN_TEXT",
            "language": "JA",
            "content": "福田昌広"
        },
        "encodingType": "UTF8"
}


var firstApiObj = {
            requests: [{
                image: {
                    content:'',
                features: [{
                    type: 'DOCUMENT_TEXT_DETECTION',
                    maxResults: 1,
                }]
            }}]
}

// console.log(firstApiObj.requests[0]);
axios.post(second_api_url, secondApiObj)
    .then((res)=>{
        console.log(res.data);
            // entities[0].name);
    })
    .catch(()=>{
    console.log('err');
    })






async function call1stApi(url, firstApiObj) {
    // read line assign to base64;
    let base64;
    firstApiObj.requests[0].image.content = base64;
    await axios.post(url, firstApiObj)
    .then((res)=>{
        let firstResponse = new FirstApiReciver(res.data.description)
        call2ndApi(firstResponse.getElemsOfDescriptionAry())
    })

}

class FirstApiReciver {
    constructor(description) {
        this.description = String(description);
        this.elemsOfDescriptionAry = this.description.split('\n');
    }
    getElemsOfDescriptionAry (){
        return this.elemsOfDescriptionAry;
    }

}

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

var a = 1;

async function call2ndApi(ary){
    for (let i = 0; i < ary.length; i++){
        secondApiObj.document.content = ary[i];
        await axios(second_api_url, secondApiObj)
        .then((res)=>{
            var w = new SecondApiRecive(res.data.name, res.data.type);
            //write below obj
            w.getWriteObj();
            if (!end){
                // add ',' at the end of line
            };
            _sleep(50);
        })
    }
    //next line

}

class SecondApiRecive {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    getName(){
        return this.name;
    }
    getType(){
        return this.type;
    }
    getWriteObj(){
        return `${this.getName()}, ${this.getType()}`
    }
}