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

