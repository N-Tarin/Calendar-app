'use strict';

console.clear();

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();


  //Get the date of last month.
  function getLastMonth() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();//先月の末日の日付
    const n = new Date(year, month, 1).getDay();//今月の一日目の曜日の番号

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  //Get the date of this month.
  function getBasicMonth() {
    const dates = [];
    const lastDate = new Date(year, month + 1, 0).getDate();//（末日）翌月の一日前

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    //Get today's date
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }
    return dates;
  }

  //Get the date of next month.
  function getNextMonth() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay(); //今月の末日の曜日の番号

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  //show the month
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

  //show the days
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

  //show the date
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
        td.textContent = date.date;
        td.classList.add('table__body__day');
        
        td.dataset.date = date.date; //クリックした日付取得


        if (date.isToday) {
          td.classList.add('js__today');//today's date
        }
        if (date.isDisabled) {
          td.classList.add('disabled');//last and next month's date
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }
  
  //clear
  function clearCalendar() {
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) { //tbodyの最初の子要素がある限り
      tbody.removeChild(tbody.firstChild); //tbodyから最初の子要素を削除する
    }
  }  

  //Show the calendar
  function createCalendar() {
    clearCalendar();
    renderTitle();
    // renderDays();
    renderWeeks();
  }

  //Show last month's calendar
  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    month--; 
    if (month < 0) { //1月より前に戻すとき
      year--;
      month = 11; //back to Dec
    }
    createCalendar();
  });

  //Show next month's calendar
  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    month++;
    if (month > 11) { //12月を超えたら
      year++;
      month = 0; //back to Jan
    }
    createCalendar();
  });

  //Write a schedule
  document.addEventListener('click', (e) => {
    if(e.target.classList.contains('table__body__day')) {
      
    const addMenu = document.querySelector('.add__menu');
    const addNav = document.querySelector('.add__nav');
      
    // Close button
    const close = document.createElement('input');
    close.classList.add('add__menu__close');
    close.value = '✖';
    close.type = 'button';
    close.addEventListener('click', () => {
      addMenu.remove();
    });

    //Save button
    const save = document.createElement('input');
    save.classList.add('add__menu__save');
    save.value = 'Save';
    save.type = 'button';
    
    save.addEventListener('click', () => {
      
      // Make a list
      const li = document.createElement('li');
      li.classList.add('list__item');
      
      const ul = document.createElement('ul');
      ul.classList.add('list__itemWrapper');
      
      const liDate = document.createElement('li');
      liDate.classList.add('list__item__date'); //Date
      
      const liTitle = document.createElement('li');
      liTitle.classList.add('list__item__title'); //Detail
      
      //Show the title
      liDate.innerHTML = e.target.dataset.date + '<span class="date">th</span>';
      liTitle.innerHTML = input.value;
      
      const listItems = document.querySelector('.list__items');
      ul.appendChild(liDate);
      ul.appendChild(liTitle);
      li.appendChild(ul);
      listItems.appendChild(li);

      addMenu.remove();
    });  

    // Add title
    const input = document.createElement('input');
    input.classList.add('add__menu__input');
    input.placeholder = 'Add title';
    
    addNav.appendChild(close);
    addNav.appendChild(save);
    addMenu.appendChild(input);
  }
  });

  createCalendar();
}

