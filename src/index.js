import $ from "jquery";

import sum from './otherFile.js';

import './scss/app.scss';

console.log(sum(5, 5));

document.querySelector('#app').innerHTML = 'Hello from your JavaScript file ...';
