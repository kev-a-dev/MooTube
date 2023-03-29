import axios from "axios";

const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://youtube-v38.p.rapidapi.com/search/',
  params: {q: 'despacito', hl: 'en', gl: 'US'},
  headers: {
    'X-RapidAPI-Key': '583627f704msh19c07864199cf13p1b7dadjsnc2e1d0cc8354',
    'X-RapidAPI-Host': 'youtube-v38.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});