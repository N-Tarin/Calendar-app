'use strict';

//年月を取得
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

//文字に変換
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

//月末を取得
const last = new Date(currentYear, currentMonth + 1, 0);
const last_year  = last.getFullYear();
const last_month = last.getMonth();
const last_day   = last.getDate();

//カレンダーに出力
for (let i=1; i<=last_day; i++) {
  const week = new Date(last_year, last_month, i).getDay();
  const tbody = document.querySelector('.tbody');
  const row = document.createElement('tr');
  const cell = document.createElement('td');

  if (!week || i == 1) {
    tbody.appendChild();
      row.className = ".tbody__days";
      cell.className = ".tbody__day";
  
      cell.innerHTML = (i);
  }
};




