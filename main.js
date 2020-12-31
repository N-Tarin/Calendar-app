'use strict';

console.clear();

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();


  //先月の日付を作成
  function getLastMonth() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  //今月の日付を作成
  function getBasicMonth() {
    const dates = []; // date: 日付, day: 曜日
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }

    return dates;
  }

  //来月の日付を作成
  function getNextMonth() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  //クリアする
  function clearCalendar() {
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  //月を表示
  function renderTitle() {
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
    const titleMonth = document.querySelector('.monthNow');
    titleMonth.textContent = months[month];
  }

  //曜日を表示
  // function renderDays() {
  //   const weeks = [
  //     'Sun',
  //     'Mon',
  //     'Tue',
  //     'Wed', 
  //     'Thu', 
  //     'Fri', 
  //     'Sat'
  //   ];
  //   for (let i = 0; i < weeks.length; i++) {
  //     const td = document.createElement('td');
  //     const tr = document.querySelector('.table__head__weeks');
  //     td.classList.add('table__head__week');
  //     tr.appendChild(td);
  //     td.textContent = weeks[i];
  //   }    
  // }

  //日付を表示
  function renderWeeks() {
    const dates = [
      ...getLastMonth(),
      ...getBasicMonth(),
      ...getNextMonth(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');
      tr.classList.add('table__body__days');

      week.forEach(date => {
        const td = document.createElement('td');
        td.classList.add('table__body__day');

        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('js__today');//今日の日付
        }
        if (date.isDisabled) {
          td.classList.add('disabled');//先月と来月の文字色
        }

        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  //もろもろ表示
  function createCalendar() {
    clearCalendar();
    renderTitle();
    // renderDays();
    renderWeeks();
  }

  //先月のカレンダーを表示
  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    createCalendar();
  });

  //来月のカレンダーを表示
  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    createCalendar();
  });

  // //今日を押して今日を表示
  // document.getElementById('today').addEventListener('click', () => {
  //   year = today.getFullYear();
  //   month = today.getMonth();

  //   createCalendar();
  // });

  createCalendar();
}