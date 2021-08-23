let box1 = document.getElementById('box1');
let box2 = document.getElementById('box2');
let submit = document.getElementById('submitBtn');
let start =  document.getElementById('startBtn');
let startedAlready = false;

// Event Listeners-----------------------------------------
submit.addEventListener('click', (e) => {
    let input = document.getElementById('inputText').value;
    if(input > 400 || input < 10) return;  
    e.preventDefault();
    createBox(input);
});

start.addEventListener('click', (e) => {
    let input = document.getElementById('inputText').value;
    if(input > 400 || input < 10) return;  
    e.preventDefault();
    let option1 = document.getElementById('option1').value;
    let option2 = document.getElementById('option2').value;
    switch(option1){
        case 'bubble':  bubbleSort(box1);
                        break;
        case 'insertion':  insertionSort(box1);
                        break;    
        case 'selection':  selectionSort(box1);
                        break;
        case 'merge':  mergeSort(box1.getElementsByClassName('box'), 0, input-1);
                        break;
            
    }
    switch(option2){
        case 'bubble':  bubbleSort(box2);
                        break;
        case 'insertion' : insertionSort(box2);
                        break;
        case 'selection' :  selectionSort(box2);
                        break;
        case 'merge' :  mergeSort(box2.getElementsByClassName('box'), 0, input-1);
                        break;
    }
})
// Event Listener end--------------------------------------


//Functions start -----------------------------------------
function createBox(input){
    box1.innerHTML = "";
    box2.innerHTML = "";
    for(let i = 0 ; i < input ; i++){
        let newelement = document.createElement('div');
        newelement.className = 'box';
        let width = 100/input;
        let randomHeight = Math.random()*100 +1;
        newelement.style.height = randomHeight + "%";
        newelement.style.width =  width+"%";
        box1.appendChild(newelement);   
    }  
    box2.innerHTML = box1.innerHTML;
}
// Bubble Sort
async function bubbleSort(someBox){
    stopAllThis();
    let box = someBox.getElementsByClassName('box');
    let input = document.getElementById('inputText').value;
    try{
        let i, j;
        for(i = 0 ; i < input ; i++){
            for(j = 0; j < (input-1)-i; j++){
                    let heightj = parseFloat(box[j].style.height)
                    let heightj1 = parseFloat(box[j+1].style.height);
                    box[j].style.backgroundColor = 'red';
                    box[j+1].style.backgroundColor = 'green';
                    if(heightj > heightj1){
                        let temp = box[j].style.height;
                        box[j].style.height = box[j+1].style.height;
                        box[j+1].style.height = temp;
                        box[j].style.backgroundColor = 'green';
                        box[j+1].style.backgroundColor = 'red';
                    }
                    await waitForMe(0);
                    box[j].style.backgroundColor = 'black';
                    box[j+1].style.backgroundColor = 'black'; 
                }
        }
    }
    catch(e){

    }
    finally{
        startAllThis();
    }
}
// Insertion Sort
async function insertionSort(gimmeBox){
    stopAllThis();
    let box = gimmeBox.getElementsByClassName('box');
    let input = document.getElementById('inputText').value;
    try{
        for(let i = 1 ; i < input ; i++){
            let unPureTemp = box[i].style.height;
            let temp = parseFloat(box[i].style.height)
            let j = i-1;
            while(j >= 0 && temp < parseFloat(box[j].style.height)){
                box[i].style.backgroundColor = "red"
                box[j+1].style.height = box[j].style.height;
                box[j].style.backgroundColor = "lightblue"
                box[j+1].style.backgroundColor = "yellow"
                j--;
                await waitForMe(0);
                box[j+1].style.backgroundColor = "black"
                box[j+2].style.backgroundColor = "black"
            }
            box[i].style.backgroundColor = "black"
            box[j+1].style.height = unPureTemp;
        }
    }
    catch(e){

    }
    finally{
        startAllThis();
    }
}
// Selection Sort
async function selectionSort(changethisBox){
    stopAllThis();
    let box = changethisBox.getElementsByClassName('box');
    let input = document.getElementById('inputText').value;
    let i, j;
    try{
        for( i = 0 ; i< input ; i++){
            let min_index = i;
            for( j = i+1; j < input ; j++){
                let min_indexHeight = parseFloat(box[min_index].style.height); 
                let currentJHeight = parseFloat(box[j].style.height);
                if(min_indexHeight > currentJHeight){
                   min_index =  j;
                }
                box[min_index].style.backgroundColor = 'red';
                box[j].style.backgroundColor = 'yellow';
                await waitForMe(0);
                box[min_index].style.backgroundColor = 'black';
                box[j].style.backgroundColor = 'black';
            }
            let temp = box[min_index].style.height;
            box[min_index].style.height = box[i].style.height;
            box[i].style.height = temp;
        }
    }
    catch(e){

    }
    finally{
        startAllThis();
    }
}
// Merge Sort
async function mergeSort(arrayBox, l, r){
    if(l < r){
        stopAllThis();
        let m = Math.floor(l + (r-l)/2);
        await mergeSort(arrayBox, l, m);
        await mergeSort(arrayBox, m+1, r);
        await merge(arrayBox, l, m, r);
    }
}
async function merge(arrayBox, l, m , r){
    
    let len1 = m-l +1;
    let len2 = r - m;

    let arr1 = [];
    let arr2 = [];

    for(let i = 0 ; i < len1 ; i++){
        arr1[i] =  arrayBox[l+i].style.height;
    }
    for(let j = 0 ; j < len2 ; j++){
        arr2[j] = arrayBox[m+1+j].style.height;
    }
    let i = 0, j = 0, k = l; 
    while(i < len1 && j < len2){
        arrayBox[k].style.backgroundColor = 'red';
        if(parseFloat(arr1[i]) <= parseFloat(arr2[j]))
        {
            arrayBox[k].style.height = arr1[i++];
        }
        else{
            arrayBox[k].style.height = arr2[j++];
        }
        await waitForMe(0);
        arrayBox[k].style.backgroundColor = 'black'
        k++;
    }
    while(i < len1){
        arrayBox[k++].style.height = arr1[i++];
    }
    while(j < len2){
        arrayBox[k++].style.height = arr2[j++];
    }
}

function startAllThis(){
    submit.disabled = false;
    startedAlready = false;
}

function stopAllThis(){
    submit.disabled = true;
    startedAlready = true;
}
async function waitForMe(ms){
    return new Promise(res=>{
        setTimeout(()=>res(''), ms)
    })
}
// Function end----------------------------------------