const initApp = () => {
  // ADD BOARD //
  
  const addBoardBtn = document.querySelector('#add-board-btn');
  const popAddBoard = document.querySelector('#add-board-container');
  addBoard = document.querySelector('#add-board');
  titleTag = addBoard.querySelector('input');
  createBoardBtn = addBoard.querySelector('#create-board-btn');
  //getting local storage boards
  const boards = JSON.parse(localStorage.getItem("boards") || "[]");
  //const boardTitles = JSON.parse(localStorage.getItem("board-titles") ||"[]  ");
  const body = document.querySelector('body');
  const boardList = document.querySelector('#board-list');

  addBoardBtn.addEventListener('click', function() {
    popAddBoard.style.display = 'block';
  });
  
  window.addEventListener('click', function(e) {
    if(e.target === popAddBoard) {
      titleTag.value = "";
      popAddBoard.style.display = 'none';
    };
  });


  // SHOW BOARD TITLES //
  
  function showBoardTitles() {
    document.querySelectorAll('#board-title').forEach(boardtitle => boardtitle.remove());
    boards.forEach((board, index) => {
      let liTag = `
      <li data-for-tab="${index}" id="board-title" class="hover:text-[#635fcf] flex items-center py-3 px-6 cursor-pointer">
        <div class="mr-2">
          <img src="./img/icon-board.53d57c07.svg" alt="" class="">
        </div>
        <h3>${board.title}</h3>
      </li>`;
      boardList.insertAdjacentHTML('beforeend', liTag);

      const title = document.querySelector('#title');
      title.textContent = `${board.title}`;
    });
  };
  showBoardTitles();


  // SHOW CREATED BOARDS // 

  function showBoards() {
    document.querySelectorAll('#task-board').forEach(taskboard => taskboard.remove());
    boards.forEach((board, index) => {
      let boardTag = `
      <main data-tab="${index}" id="task-board" class="bg-[#f4f7fd] dark:bg-[#20212c] hidden items-start gap-6 p-6 overflow-x-scroll overflow-y-scroll task-board">
        <section class="w-[17.5rem] shrink-0" id="section-one">
          <div id="div-one" class="flex items-center">
            <div class="bg-[#49c4e5] w-4 h-4 rounded-full mr-2"></div>
            <h3 class="text-[#828fa3] text-sm tracking-[0.3em]">TODO (0)</h3>
          </div>
          <ul id="todo-list" data-tab="${index}" class="flex flex-col mt-4 gap-y-4 cursor-pointer">
          </ul>
        </section>
        <section id="section-two" class="w-[17.5rem] shrink-0">
          <div id="div-two" class="flex items-center">
            <div class="bg-[#8471f2] w-4 h-4 rounded-full mr-2"></div>
            <h3 class="text-[#828fa3] text-sm tracking-[0.3em]">DOING (0)</h3>
          </div>
          <ul id="doing-list" data-tab="${index}" class="flex flex-col mt-4 gap-y-4 cursor-pointer">
          </ul>
        </section>
        <section id="section-three" class="w-[17.5rem] shrink-0">
          <div id="div-three" class="flex items-center">
            <div class="bg-[#67e2ae] w-4 h-4 rounded-full mr-2"></div>
            <h3 class="text-[#828fa3] text-sm tracking-[0.3em]">DONE (0)</h3>
          </div>
          <ul id="done-list" data-tab="${index}" class="flex flex-col mt-4 gap-y-4 cursor-pointer">
          </ul>
        </section>
        <div class="shrink-0 new-column">
          <button id="new-column-btn" class="text-[#828fa3] text-2xl hover:text-[#635fcf] bg-[#ffffff] dark:bg-[#161822] rounded-sm">+New Column</button>
        </div>
      </main>`;
      body.insertAdjacentHTML('beforeend', boardTag);
    });
  };
  showBoards();


  // SELECT BOARD //

  function selectBoard() {
    document.querySelectorAll('#board-title').forEach((title) => {
      title.addEventListener('click', () => {
        const boardNumber = title.dataset.forTab;
        const toActivate = document.querySelector(`#task-board[data-tab="${boardNumber}"]`);

        sideBar.querySelectorAll('#board-title').forEach(title => {
        title.classList.remove('board-title--active');
        });
        
        taskBoard.forEach(taskboard => {
          taskboard.classList.remove('task-board--active');
        });

        title.classList.add('board-title--active');
        //toActivate.previousElementSibling.remove();
        toActivate.classList.add('task-board--active');

        const titleHead = document.querySelector('#title');
        titleHead.textContent = `${title.textContent}`;
      });
    });
  };
  selectBoard();


  // OPEN & CLOSE SIDEBAR //

  const sideOpenBtn = document.querySelector('#side-open-btn');
  const sideCloseBtn = document.querySelector('#side-close-btn');
  const sideBar = document.querySelector('#sidebar');
  const taskBoard = document.querySelectorAll('#task-board');

  sideOpenBtn.addEventListener('click', () => {
    sideBar.style.display = 'block';
    taskBoard.forEach((taskboard) => {
      taskboard.style.marginLeft = '300px';
    });
  });

  sideCloseBtn.addEventListener('click', () => {
    sideBar.style.display = 'none';
    taskBoard.forEach((taskboard) => {
      taskboard.style.marginLeft = 'auto';
    })
  });


  // CREATE NEW TASKS MENU //

  const addBtn = document.querySelector('#add-btn');
  const addTask = document.querySelector('#add-task-container');
  addTaskForm = document.forms['add-task-form'];
  taskTitleTag = addTaskForm.querySelector('#task-title');
  descTag = addTaskForm.querySelector('textarea');
  subTaskTag = addTaskForm.querySelectorAll('#sub-task');
  //statusTag = addTaskForm.querySelector('#status-btn-one p');
  createTaskBtn = addTaskForm.querySelector('#create-task-btn');
  // const todoTasks = JSON.parse(localStorage.getItem("todo-tasks") || "[]"); 
  // const doingTasks = JSON.parse(localStorage.getItem("doing-tasks") || "[]"); 
  // const doneTasks = JSON.parse(localStorage.getItem("done-tasks") || "[]"); 

  // addBtn.addEventListener('click', function() {
  //   addTask.style.display = 'block';
  // });

  // window.addEventListener('click', function(e) {
  //   if(e.target === addTask) {
  //     addTask.style.display = 'none';
  //   };
  // });

  taskBoard.forEach((taskboard) => {
    addBtn.addEventListener('click', function() {
      addTask.style.display = 'block';
    });

    window.addEventListener('click', function(e) {
      if(e.target === addTask) {
        addTask.style.display = 'none';
      };
    });
  });


  let randNumber = Math.floor(Math.random() * 10000);
  // let boardTitle = titleTag.value;
  // let boardInfo = {
  //   id: randNumber,
  //   title: boardTitle,
  //   todoColumn: [],
  //   doingColumn: [],
  //   doneColumn: []
  // };
  // let titleInfo = {
  //   title: boardTitle
  // };


  // CREATE BOARD BTN //

  createBoardBtn.addEventListener('click', e => {
    e.preventDefault()

    let boardTitle = titleTag.value;
    let boardInfo = {
      id: randNumber,
      title: boardTitle,
      todoColumn: [],
      doingColumn: [],
      doneColumn: [],
    };

    //boardTitles.push(titleInfo); //adding new title to board titles
    ///localStorage.setItem("board-titles", JSON.stringify(boardTitles)); //saving boards to local storage
    boards.push(boardInfo); //adding new board to boards
    localStorage.setItem("boards", JSON.stringify(boards)); //saving boards to local storage

    popAddBoard.style.display = 'none';
    titleTag.value = "";
    showBoardTitles();
    showBoards();
    selectBoard();
    window.location.reload();
  });
  if(sideOpenBtn.click()) {
    taskBoard.forEach((taskboard) => {
      taskboard.style.marginLeft = '300px';
    });
  };


  // CLICKS ON THE LAST BOARD TITLE WHEN A NEW BOARD IS CREATED //

  const boardLists = document.querySelector('#board-list');
  boardLists.lastElementChild.click();


  // UPDATES BOARD LENGTH //

  const span = document.querySelector('#boards span');
  span.textContent = `${boards.length}`;


  function showTodoTask() {
    document.querySelectorAll('#todo-task').forEach(task => task.remove());
    const todoList = document.getElementById('todo-list');

    boards.forEach((board) => {
      board.todoColumn.forEach((title, index) => {
        let todoTag = `
          <li id="todo-task" class="bg-[#ffffff] dark:bg-[#2b2c37] w-full px-4 py-5 rounded-md shadow-sm shadow-[#297ca5]">
            <h4 id="task-title" class="text-[#000112] dark:text-[#ffffff] hover:text-[#635fcf]">${board.todoColumn[index].title}</h4>
          <p class="text-[#828fa3] text-sm">0 of 0 subtasks</p>
          </li>
        `;
        taskBoard.forEach((taskboard) => {
          if(taskboard.classList.contains('task-board--active')) {
            todoList.insertAdjacentHTML("beforeend", todoTag);
          };
        })
      });
    });
  };
  showTodoTask();

  function showDoingTask() {
    document.querySelectorAll('#doing-task').forEach(task => task.remove());
    const doingList = document.querySelector('#doing-list');

    boards.forEach((board) => {
      board.doingColumn.forEach((title, index) => {
        let doingTag = `
          <li id="doing-task" class="bg-[#ffffff] dark:bg-[#2b2c37] w-full px-4 py-5 rounded-md shadow-sm shadow-[#297ca5]">
            <h4 id="task-title" class="text-[#000112] dark:text-[#ffffff] hover:text-[#635fcf]">${board.doingColumn[index].title}</h4>
          <p class="text-[#828fa3] text-sm">0 of 0 subtasks</p>
          </li>
        `;
        doingList.insertAdjacentHTML("beforeend", doingTag);
      });
    });
  };
  showDoingTask();

  function showDoneTask() {
    document.querySelectorAll('#done-task').forEach(task => task.remove());
    const doneList = document.querySelector('#done-list');

    boards.forEach((board) => {
      board.doneColumn.forEach((title, index) => {
        let doneTag = `
          <li id="todo-task" class="bg-[#ffffff] dark:bg-[#2b2c37] w-full px-4 py-5 rounded-md shadow-sm shadow-[#297ca5]">
            <h4 id="task-title" class="text-[#000112] dark:text-[#ffffff] hover:text-[#635fcf]">${board.doneColumn[index].title}</h4>
          <p class="text-[#828fa3] text-sm">0 of 0 subtasks</p>
          </li>
        `;
        doneList.insertAdjacentHTML("beforeend", doneTag);
      });
    });
  };
  showDoneTask();


  // CREATE TASK BTN


        createTaskBtn.addEventListener('click', e => {
          e.preventDefault();

          boards.forEach((board) => {
            console.log(board);

            let taskTitle = taskTitleTag.value;
            let taskDesc = descTag.value;

            let todo = {
              title: taskTitle,
              desc: taskDesc,
              subtasks: []
            };
            subTaskTag.forEach((subtask) => {
              todo.subtasks.push(subtask.value)
            });

            if(statusTag.textContent === "Todo"){
              board.todoColumn.push(todo);
              localStorage.setItem("boards", JSON.stringify(boards)); //saving boards to local storage
              showTodoTask();
            };

            let doing = {
              title: taskTitle,
              desc: taskDesc,
              subtasks: []
            };
            subTaskTag.forEach((subtask) => {
              doing.subtasks.push(subtask.value)
            });

            if(statusTag.textContent === "Doing"){
              board.doingColumn.push(doing);
              localStorage.setItem("boards", JSON.stringify(boards)); //saving boards to local storage
              showDoingTask();
            };

            let done = {
              title: taskTitle,
              desc: taskDesc,
                subtasks: []
            };
            subTaskTag.forEach((subtask) => {
              done.subtasks.push(subtask.value)
            });

            if(statusTag.textContent === "Done"){
              oard.doneColumn.push(done);
              localStorage.setItem("boards", JSON.stringify(boards)); //saving boards to local storage
              showDoneTask();
            };

            addTask.style.display = 'none';
            taskTitleTag.value = "";
            descTag.value = "";
            subTaskTag.forEach((subtask) => {
              subtask.value = ""
            });
            statusTag.textContent = "";
          });
        });


  // STATUS MENU(TODO, DOING, DONE) //

  statusBtnOne = document.querySelector('#status-btn-one');
  statusTag = statusBtnOne.querySelector('p');
  statusMenu = document.querySelector('#status-menu');

  statusMenu.querySelector('ul').addEventListener('click', e => {
    if(e.target.matches('li')) {
      statusTag.textContent = e.target.textContent;
      statusMenu.style.display = 'none';
    }
  });

  const selectStatus = () => {
    statusMenu.style.display = 'block';
  };
  statusBtnOne.addEventListener('click', selectStatus);

  const btnTwo = document.querySelector('#btn-two');
  const statusMenuTwo = document.querySelector('#status-menu-two');

  const selectStatusTwo = () => {
    statusMenuTwo.classList.toggle('open');
  };
  btnTwo.addEventListener('click', selectStatusTwo);

  //const subTask = document.querySelector('.sub-task');


  // DELETE TASK //
  const dotBtn = document.querySelector('#dot-btn');
  const dotMenu = document.querySelector('#dot-menu');

  const deleteTask = () => {
    dotMenu.classList.toggle('open')
  }
  dotBtn.addEventListener('click', deleteTask);


  // DELETE BOARD //
  const dotBoardBtn = document.querySelector('#dot-board-btn');
  const dotBoard = document.querySelector('#dot-board');

  const deleteBoard = () => {
    dotBoard.classList.toggle('open')
  }
  dotBoardBtn.addEventListener('click', deleteBoard);


  // ADD SUBTASKS //
  const subTaskBtn = document.querySelector('.subtask-btn');
  const subTaskDiv = document.querySelector('#subtask-div');

  subTaskBtn.addEventListener('click', function(e) {
    e.preventDefault()

    // create elements //
    const div = document.createElement('div');
    const input = document.createElement('input');
    const deleteBtn = document.createElement('i');

    // add classes //
    div.classList.add('flex', 'justify-between', 'items-center', 'mt-4',  'subtask');
    input.classList.add('px-4', 'py-2', 'text-sm', 'rounded-sm', 'bg-[#ffffff]', 'dark:bg-[#2b2c37]', 'border-[1.9px]', 'border-[#828fa3',   'border-opacity-20', 'text-[#000112]', 'dark:text-[#ffffff]','w-full',  'cursor-pointer', 'hover:border-[#635fcf]');
    deleteBtn.classList.add('fa-solid', 'fa-xmark', 'ml-3', 'cursor-pointer', 'delete');
    deleteBtn.style.color = "#828fa3";
    deleteBtn.style.fontSize = "x-large";
    input.setAttribute('placeholder', 'e.g.Make Coffee');
    input.setAttribute('id', 'sub-task');
    deleteBtn.setAttribute('id', 'delete');

    // append to document //
    div.appendChild(input);
    div.appendChild(deleteBtn);
    subTaskDiv.append(div);
  });


  // DELETE SUBTASKS //

  subTaskDiv.addEventListener('click', function (e) {
    if (e.target.id == 'delete') {
      subTaskDiv.removeChild(e.target.parentElement);
    }
  });



  // TASK DETAILS //
  const taskTitles = document.querySelectorAll('#task h4');
  const taskDetails = document.querySelector('#task-details-container');

  taskTitles.forEach(function (title) {
    title.addEventListener('click', function() {
      taskDetails.style.display = 'block';
    });
  });

  window.addEventListener('click', function(e) {
    if(e.target === taskDetails) {
      taskDetails.style.display = 'none';
    };
  });


  // MEDIA QUERY //

  let query = window.matchMedia("(max-width: 720px)");
  let queryOne = window.matchMedia("(max-width: 1080px)");

  const title = document.querySelector('#title');
  const mobileLogo = document.querySelector('.logo img');
  const header = document.querySelector('header section');
  const titleContainer = document.querySelector('.title');
  const titleDiv = document.querySelector('.title div');
  const side = document.querySelector('.side');

  if (query.matches) {
    addBtn.innerHTML = '<i class="fa-solid fa-plus" style="color:#ffffff; "></i>'
    addBtn.classList.remove('px-6', 'py-3');  
    addBtn.classList.add('px-4', 'py-1');  
    sideOpenBtn.style.display = 'none';
    mobileLogo.setAttribute('src', './img/logo-mobile.9b60a582.svg');
    titleContainer.style.flex = '0';
    titleContainer.classList.remove('ml-2');
    titleDiv.classList.remove('hidden');
    titleDiv.classList.add('block');
    title.classList.remove('text-2xl');
    title.classList.add('text-base', 'cursor-pointer');
    header.style.height = '64px';
    //header.classList.remove('justify-between');
    //header.classList.add('justify-normal');
    dotBtn.classList.remove('ml-5');
    dotBtn.classList.add('ml-3');
    //side.classList.add('justify-around');
    //sideCloseBtn.style.display = 'none';
    sideBar.classList.remove('bg-[#ffffff]', 'dark:bg-[#2b2c37]',   'border-r-[1.8px]', 'border-[#828fa3]', 'border-opacity-20');
    side.classList.add('bg-[#ffffff]', 'dark:bg-[#2b2c37]','rounded-md');
    title.addEventListener('click', function() {
      sideBar.style.display = 'block';
    });
  };

  if (queryOne.matches) {
    const titleContainer = document.querySelector('.title');
    const taskBoard = document.querySelectorAll('#task-board');
    titleContainer.classList.remove('ml-2');
    sideOpenBtn.addEventListener('click', function() {
      sideBar.style.display = 'block';
      taskBoard.forEach((taskboard) => {
        taskboard.style.marginLeft = '259px';
      });
    });
    if(sideOpenBtn.click()) {
    taskBoard.forEach((taskboard) => {
      taskboard.style.marginLeft = '259px';
    });
    }
  };
}
document.addEventListener('DOMContentLoaded', initApp)