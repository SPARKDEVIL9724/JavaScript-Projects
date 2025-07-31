let storedTasks = [];
let checkedTasks =[];
const taskList = document.querySelector('.tasks');
const divContainer = document.querySelector('.container');
const form = document.getElementById('task-form');

function createIcon(cls){
    const icon = document.createElement('i');
    icon.className = cls;
    return icon;
}

function createButton(cls){
    const button = document.createElement('button');
    button.className = cls;
    return button;
}

function createCheckBox(cls){
    const ckbox = document.createElement('input');
    ckbox.type = 'checkbox';
    ckbox.className = cls;
    ckbox.name = 'checkbox';
    return ckbox;

}


// create list items
function createTask(task){
    // itemListStored.push(item);  
    const li = document.createElement('li');
    li.className = 'tasks';
    const checkbox = createCheckBox('task-checkbox');
    const text = document.createTextNode(task);
    const button = createButton("remove-task btn-link text-red");
    const icon = createIcon("fa-solid fa-xmark");
    li.appendChild(checkbox);
    li.appendChild(text);
    button.appendChild(icon);
    li.appendChild(button);
    taskList.appendChild(li);
}

// clear all tasks
function clearAllTasks(){
    const tasks = document.querySelectorAll('li');
    tasks.forEach((li) => taskList.removeChild(li) );
    localStorage.setItem('tasks',[]);
}

// add task
function addTask(e){
    e.preventDefault();
    const formData = new FormData(form);
    const task = formData.get('task');
    createTask(task);
    storedTasks.push(task);
    localStorage.setItem('tasks', storedTasks);
    document.getElementById('task-input').value = '';
}

// remove task 
function removeTask(e){
    const task = e.target.parentElement.parentElement;
    taskList.removeChild(task);
    const x = [];
    storedTasks.forEach((t) => {
        if(t !== task.innerText){
            x.push(t);
        }
    });
    storedTasks = x;
    localStorage.setItem('tasks', storedTasks);
    const y = [];
    checkedTasks.forEach((t) => {
        if(t !== task.innerText){
            y.push(t);
        }
    });
    checkedTasks = y;
    localStorage.setItem('checkedTasks', checkedTasks);
    
}

// checking checkbox checked
function checked(e){
    const task = e.target.parentElement;
    task.style.border = '1px solid black';
    if(e.target.checked){
        task.style.textDecoration = 'line-through';
        task.style.border = '#31c12c solid 1px';
        task.style.color = 'grey';
        checkedTasks.push(task.innerText);
    }
    else{
        task.style.textDecoration = 'none';
        task.style.border = '#ccc solid 1px';
        task.style.color = 'black';
        const x = [];
        checkedTasks.forEach((t) => {
            if(t !== task.innerText){
                x.push(t);
            }
        });
        checkedTasks = x;
    }
    localStorage.setItem('checkedTasks', checkedTasks);
}

//dynamic list item styling
function onMouseOver(){
    document.querySelectorAll('li').forEach((task) => {
        task.addEventListener('mouseover',() => {
            if(task.querySelector('input').checked){
                task.style.color = 'grey';
            }
            else{
                task.style.color = 'blue';
            }
        task.style.backgroundColor = '#eeeeeea3';
        });
    });
    
    document.querySelectorAll('li').forEach((task) =>{
        task.querySelector('button i').addEventListener(
            'mouseover', () => {
                if(task.style.border === '#31c12c solid 1px'){
                    task.style.border = '#31c12c solid 1px';
                }else{
                    task.style.border = 'red 1px solid';

                }
            });
        task.querySelector('button i').addEventListener(
                'click', removeTask
        );

        task.querySelector('input').addEventListener(
            'click' ,checked
        );
    });
}
    
function onMouseOut(){
    document.querySelectorAll('li').forEach((task) => {
        task.addEventListener('mouseout',() => {
            task.style.color = 'black';
            task.style.backgroundColor = '#f5f5f5';
        });
        task.querySelector('button i').addEventListener(
           'mouseout', () => {
            if(task.style.border === '#31c12c solid 1px'){
                task.style.border = '#31c12c solid 1px';
            }else{
                task.style.border = '#ccc 1px solid';
            }
        });
    });
}

// restoring stored tasks
function restoreTask(){
    const tasks = localStorage.getItem('tasks');
    const chk = localStorage.getItem('checkedTasks');
    const x = [];
    if(tasks.length > 0 && localStorage.getItem('tasks')){
        storedTasks = tasks.split(',');
        if(chk){
        checkedTasks = chk.split(',');
        }
        storedTasks.forEach((task) => {
            if(!checkedTasks.includes(task)){
                createTask(task);
                x.push(task);
            }
        });
    }
    storedTasks = x;
    checkedTasks = [];
    localStorage.setItem('tasks',storedTasks);
    localStorage.setItem('checkedTasks',checkedTasks);
}

// creating app-header 
const appHeader = document.createElement('header');
const heading = document.createElement('h1');
heading.id = 'app-title';
heading.textContent = 'To Do List';
appHeader.appendChild(heading);
divContainer.insertAdjacentElement('afterbegin', appHeader);

// creating add-task button
const formCtrl = document.createElement('div');
formCtrl.className = 'form-control';
const addItemButton = createButton('btn');
addItemButton.type = 'submit';
addItemButton.insertAdjacentElement('afterbegin', createIcon("fa-solid fa-plus"));
addItemButton.appendChild(document.createTextNode(' Add  New Task'));
formCtrl.appendChild(addItemButton);
form.insertAdjacentElement('beforeend', formCtrl);

// creating clear all task button
const clrButton = document.createElement('button');
clrButton.className = 'btn-clear';
clrButton.textContent = 'Clear All Tasks';
divContainer.insertAdjacentElement('beforeend', clrButton);

// events
// restoreTask();
window.addEventListener('load', restoreTask);
addItemButton.addEventListener('click', addTask);

clrButton.addEventListener('click', clearAllTasks);

taskList.addEventListener('mouseover', onMouseOver);
taskList.addEventListener('mouseout', onMouseOut);