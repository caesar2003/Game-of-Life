const grid = document.querySelector('.grid')
var loops = 20000
for (let i = 0; i < loops; i++) {
    const field = document.createElement('div')
    field.classList.add('field')
    field.setAttribute('id', '0')
    grid.appendChild(field)
    
}

var boxes = document.querySelectorAll('.field')
var w = grid.getBoundingClientRect().width
function columns() {
    var column = Math.floor(w/boxes[0].getBoundingClientRect().width)
    return column
}


for (let z = 0; z < boxes.length; z++) {
    boxes[z].addEventListener('mouseup', logMouseButton);
    function logMouseButton(e) {
        if (typeof e === 'object') {
        switch (e.button) {
            case 0:
             boxes[z].setAttribute('id', '1')
             boxes[z].style.backgroundColor = "white";
            break;
            case 1:
             boxes[z].setAttribute('id', '0')
             boxes[z].style.backgroundColor = "black";
             break;
            case 2:
             boxes[z].setAttribute('id', '0')
             boxes[z].style.backgroundColor = "black";
             break;
         default:
             console.log('Unknown');
        }
        }
     }

}


var rdead = []
var rlive = []
const start = document.querySelector('.start')
const stopbtn = document.querySelector('.stop')
var looping = true

stopbtn.addEventListener('click', ()=>{
    clearInterval(interval)
})
start.addEventListener('click', ()=>{
    
    interval = setInterval(simulation, 50)
})

function simulation() {
    var counter = 0
    for (let z = columns()+1; z < boxes.length -(columns()*4 -4); z++) {
        if(counter >= columns()-2){
            z = z+2
            counter = 0
        }
        if(boxes[z].id == '0'){

            if (deadcheck(z) == true){
                rdead.push(z)
            }     
        }else if(boxes[z].id == '1'){

            if (livecheck(z) == true){
                rlive.push(z)
            }  
        }
    counter++   
    }
    remember()
}

function deadcheck(z) {
    var x = 0
    if(boxes[z-columns()].id == 1){
        x++
    }
    if(boxes[(z-columns())-1].id == 1){
        x++
    }
    if(boxes[(z-columns())+1].id == 1){
        x++
    }
    if(boxes[z+1].id == 1){
        x++
    }
    if(boxes[z-1].id == 1){
        x++
    }
    if(boxes[z+columns()].id == 1){
        x++
    }
    if(boxes[(z+columns())-1].id == 1){
        x++
    }
    if(boxes[(z+columns())+1].id == 1){
        x++
    }
    if(x == 3){
        return true
    }else{
        return false
    }
}
function livecheck(z) {
    var x = 0
    if(boxes[z-columns()].id == 1){
        x++
    }
    if(boxes[(z-columns())-1].id == 1){
        x++
    }
    if(boxes[(z-columns())+1].id == 1){
        x++
    }
    if(boxes[z+1].id == 1){
        x++
    }
    if(boxes[z-1].id == 1){
        x++
    }
    if(boxes[z+columns()].id == 1){
        x++
    }
    if(boxes[(z+columns())-1].id == 1){
        x++
    }
    if(boxes[(z+columns())+1].id == 1){
        x++
    }
    if(x < 2 || x > 3){
        return true
    }else{
        return false
    }
}
function color() {
    for (let p = 0; p < boxes.length; p++) {
        if(boxes[p].id == '1'){
            boxes[p].style.backgroundColor = "white";        
        }else if(boxes[p].id == '0'){
            boxes[p].style.backgroundColor = "black";  
        }else{
            boxes[p].style.backgroundColor = "transparent"; 
        }
        
    }
}

function remember() {
    for (let p = 0; p < rlive.length; p++) {
        boxes[rlive[p]].setAttribute('id', '0')
    }
    for (let p = 0; p < rdead.length; p++) {
        boxes[rdead[p]].setAttribute('id', '1')
    }
    
    color()
    rdead = []
    rlive = []
}