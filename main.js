'use strict';

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const weeks = [
  'Sun',
  'Mon',
  'Tue',
  'Wed', 
  'Thu', 
  'Fri', 
  'Sat'
];
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
let dayCount = 1 // 日にちのカウント
let calendarHtml = '' // HTMLを組み立てる変数


const showCalendar = () => {

  //月初めの日付を取得
  const startDate = new Date(currentYear, currentMonth, 1) 
  const startDay = startDate.getDay()

  //月末の日付を取得
  const endDate = new Date(currentYear, currentMonth - 1,  0) 
  const endDay = endDate.getDate()

  //前月の日付を取得
  const lastMonthEndDate = new Date(currentYear, currentMonth, 0) 
  const lastMonthEndDay = lastMonthEndDate.getDate()


  //現在の月を表示
  const month = document.getElementById('month');
  month.innerHTML = months[currentMonth];


  // 曜日の行を作成
  calendarHtml += '<table>'
  calendarHtml += '<thead>'
  calendarHtml += '<tr class="tbody__weeks">'
  for (let i = 0; i < weeks.length; i++) {
    calendarHtml += '<th class="tbody__week">' + weeks[i] + '</th>'
  }
  calendarHtml += '</tr>'
  calendarHtml += '</thead>'


  //日にちを作成
  calendarHtml += '<tbody class="tbody">'
  for (let w = 0; w < 6; w++) {
    calendarHtml += '<tr class="tbody__days">'

    for (let d = 0; d < 7; d++) {
      if (w == 0 && d < startDay) {
        let num = lastMonthEndDay - startDay + d + 1
        calendarHtml += '<td class="tbody__day -next">' + num + '</td>'

      } else if (dayCount > endDay) {
        let num = dayCount - endDay
        calendarHtml += '<td class="tbody__day -next">' + num + '</td>'
        dayCount++

      } else {
        calendarHtml += '<td class="tbody__day">' + dayCount + '</td>'
        dayCount++
      }
    }
  calendarHtml += '</tr>'
  }
  calendarHtml += '</tbody>';
  calendarHtml += '</table>';

  const calendar = document.querySelector('.calendar')
  calendar.innerHTML = calendarHtml;
};


//先月を表示
const prev = document.querySelector('.monthPrev i');
prev.addEventListener('click', () => {
  today.setMonth(currentMonth - 1);
  showCalendar();
});

//来月を表示
const next = document.querySelector('.monthNext i');
next.addEventListener('click', () => {
  today.setMonth(currentMonth + 1);
  showCalendar();
});

showCalendar();
