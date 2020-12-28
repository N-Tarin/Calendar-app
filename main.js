'use strict';

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();


const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const month = document.getElementById('month');
month.innerHTML = months[currentMonth];

let days ="";

for(let i = 1; i <= lastDays; i ++) {
  days += `<th>${i}</th>`;
  monthDays.innerHTML = days;
}