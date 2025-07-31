const parentDiv = document.querySelector('.parent-div');
function clearAll(){
    while(parentDiv.firstChild){    
        parentDiv.firstChild.remove();
    }
}
function createDiv(cls, text, fnc){
    const div = document.createElement('div');
    const small = document.createElement('small');
    small.textContent = fnc;
    div.className = cls;
    // text === ' ' ? 'Space' : text;
    if(text === ' '){
        text = 'Space'
    }
    div.textContent = text;
    div.appendChild(small);
    return div;
}
function displayKeyCode(e){
    clearAll();
    parentDiv.appendChild(createDiv('key', e.key, 'pressedKey.key'));
    parentDiv.appendChild(createDiv('key', e.keyCode, 'pressedKey.keyCode'));
    parentDiv.appendChild(createDiv('key', e.code, 'pressedKey.code'));
}
const body = document.body;
body.addEventListener('keypress', displayKeyCode);