let  AddBtn=document.querySelector(".Add-btn");
let textArea=document.querySelector('.text-area');
let AllTaskArea=document.querySelector('.All-task');
let main=document.querySelector('.main');
let AllTask=document.querySelector('.All-task');
let displayTaskBar=false;
let AllTaskInArray=[];
let completed=document.querySelector('.Completed');
let TaskList=document.querySelector('.Task-list');
let count =0;
// call();
/*****************Add Button ************** */
AddBtn.addEventListener("click",()=>{
        
    if(displayTaskBar){
        textArea.style.display='none';
    }else{
        textArea.style.display='block';
    }
    displayTaskBar=!displayTaskBar;
   
})

/*****************For text Area************** */
textArea.addEventListener('click',()=>{
       textArea.addEventListener('keydown',(e)=>{
        let key=e.key;
        if(key=='Enter'){
            console.log(key);
            if(textArea.value!=""){
                createTask( textArea.value,'done',2,AllTaskInArray.length);
                count++;
                textArea.value="";
                textArea.style.display='none';
                SwitchTab()
            }
        }
    })

})



// /*****************Complete Task**************** */
completed.addEventListener('click',()=>{
    completed.style.color='white';
    TaskList.style.color='gray';
    RemoveAll()
    console.log(AllTaskInArray);
    for(let i=0;i< AllTaskInArray.length;i++){
        if(AllTaskInArray[i].flag===1){
            createTask( AllTaskInArray[i].massage,'',AllTaskInArray[i].flag,i);
        }  
    } 
})


// /**********************Task-List**************** */
TaskList.addEventListener('click',()=>{
    SwitchTab()  
})

// /*********************Remove Function  */
function RemoveAll(){
    let removeAll=document.querySelectorAll('.task');
    for(let i=0;i<removeAll.length;i++ ){
        let deletTask=removeAll[i];
        deletTask.remove();
    }
}

/**************Create Task******** */

function createTask(textvalue,done,btn,idx){
    
    if(btn===0||btn===2){
        let main1=document.createElement('div');
        main1.setAttribute('class','task')
        main1.innerHTML=`
                        <span class="material-symbols-outlined done">${done}</span>
                        <p class="text">${textvalue}</p>
                        <span class="material-symbols-outlined Edit"> edit_note</span>
                        <span class="material-symbols-outlined delete"> delete</span>
                         `
        AllTask.appendChild(main1);
        let obj={
            id : getId(),
            flag : 0,
            massage:textvalue,
        }
        if(btn===2){
            AllTaskInArray.push(obj);
            console.log(AllTaskInArray);
            updateLocol();
        }
        let EditBtn=main1.querySelector('.Edit');
        let TaskBtn=main1.querySelector('.text');
        EditBtn.addEventListener('click',()=>{
            TaskBtn.setAttribute('contenteditable',"true")
            TaskBtn.addEventListener('keydown',(e)=>{
                let key=e.key;
                if(key=='Enter'){
                    AllTaskInArray[idx].massage=TaskBtn.innerHTML;
                    updateLocol()
                    TaskBtn.setAttribute('contenteditable',"false")
                }
             })
         
         })
        let DeleteBtn=main1.querySelector('.delete');
        DeleteBtn.addEventListener('click',()=>{
            AllTaskInArray.splice(idx,1);
            updateLocol()
            DeleteBtn.parentElement.remove();
        })
        
        let Done =main1.querySelector('.done')
        Done.addEventListener('click',()=>{
            console.log('hii');
            console.log(obj.flag);
            AllTaskInArray[idx].flag=1;
            updateLocol();
            Done.parentElement.remove();
        })
    }else if(btn==1){
        let main1=document.createElement('div');
        main1.setAttribute('class','task')
        main1.innerHTML=`
                        <span class="material-symbols-outlined done">${done}</span>
                        <p class="text">${textvalue}</p>
                        <span class="material-symbols-outlined delete"> delete</span>
                    `
        AllTask.appendChild(main1);
        let DeleteBtn=main1.querySelector('.delete');
        DeleteBtn.addEventListener('click',()=>{
            AllTaskInArray.splice(idx,1);
            updateLocol();
            DeleteBtn.parentElement.remove();
        })
    }
    
}
// /******************Switch Tab*****************/
function SwitchTab(){
    completed.style.color='gray';
    TaskList.style.color='white';
    RemoveAll()
    console.log(AllTaskInArray.length);
    for(let i=0;i< AllTaskInArray.length;i++){
        if(AllTaskInArray[i].flag===0){
            createTask( AllTaskInArray[i].massage,'done',AllTaskInArray[i].flag,i);
        }
       
    }
   
}



function updateLocol(){
    localStorage.setItem('task',JSON.stringify(AllTaskInArray));
} 


function call(){
    // updateLocol();
    if(localStorage.getItem('task')){
        AllTaskInArray=JSON.parse(localStorage.getItem('task'));
    }
    
    // updateLocol();
    console.log(AllTaskInArray);
    SwitchTab() ;
}
function getId(){
     var uid = new ShortUniqueId();
     return uid();
}
