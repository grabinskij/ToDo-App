const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput') 
const tasksList = document.querySelector('#tasksList') 
const emptyList = document.querySelector('#emptyList') 


let tasks = []


if(localStorage.getItem('tasks')){
   tasks = JSON.parse(localStorage.getItem('tasks'))
   tasks.forEach((task) => renderTask(task))
}



checkEmptyList()


form.addEventListener('submit', addTask)

tasksList.addEventListener('click', deleteTask)

tasksList.addEventListener('click', doneTask)

tasksList.addEventListener('click', editTask);



// Functions

function addTask(event){
    event.preventDefault()
    const taskText = taskInput.value

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }

    tasks.push(newTask)

    saveToLS()

    renderTask(newTask)

    taskInput.value = ''

    taskInput.focus()

    checkEmptyList()

}

function deleteTask(event){
    if(event.target.dataset.action !== 'delete') return

    const parentNode = event.target.closest('li')
    
    const id = Number(parentNode.id)

    tasks = tasks.filter(function(task){
        if (task.id === id){
            return false
        }else{
            return true
        }
    })

    saveToLS()
    
    parentNode.remove()

    checkEmptyList()

}

function doneTask(event){
    if(event.target.dataset.action !== 'done') return

    const parentNode = event.target.closest('li')
    const taskTitle =  parentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')

    const id = Number(parentNode.id)

    const task = tasks.find((task) => task.id === id)

    task.done = !task.done
    
    saveToLS()
}   


function editTask(event) {
    if (event.target.dataset.action !== 'edit') return;

    const parentNode = event.target.closest('li');
    const taskId = Number(parentNode.id);
    const task = tasks.find(task => task.id === taskId);

    const newText = prompt('Enter the new task text:', task.text);

    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();

        tasks = tasks.map(t => (t.id === taskId ? task : t));

        saveToLS();

        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.textContent = task.text;
    }
}


function checkEmptyList(){
    if(tasks.length === 0){
        const emptyListHTML = `
            <li id="emptyList" class="list-group-item empty-list">
                <div class="empty-list__title">You have no tasks</div>
				<img src="./img/joy-figure.svg" alt="Empty" width="68">
			</li>`
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }

    if(tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null
    }
}

function saveToLS(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task){
    cssClass = task.done ? "task-title task-title--done" : "task-title"

    const taskHTML = `
        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="edit" class="btn-action">
                    <img src="./img/edit.svg" alt="Edit" width="16" height="16">
                </button>
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="16" height="16">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="16" height="16">
                </button>
            </div>
        </li>`
    
    tasksList.insertAdjacentHTML('beforeend', taskHTML )
}


const backgroundColorInput = document.querySelector('#background-color');
const colorLabel = document.querySelector('#color-label');
const container = document.querySelector('body');

let savedColor = localStorage.getItem('backgroundColor');
if (savedColor) {
    container.style.backgroundColor = savedColor;
    colorLabel.style.color = isColorDark(savedColor) ? 'white' : 'black';
}

backgroundColorInput.addEventListener('input', function() {
    const selectedColor = backgroundColorInput.value;
    
    container.style.backgroundColor = selectedColor;
    localStorage.setItem('backgroundColor', selectedColor);

    const isDarkColor = isColorDark(selectedColor);
   
    colorLabel.style.color = isDarkColor ? 'white' : 'black';
});


function isColorDark(color) {
    const rgb = hexToRgb(color);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness < 128;
}


function hexToRgb(hex) {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

