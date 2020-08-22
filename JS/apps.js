const addButton=document.querySelector('#addBtn');
const inputValue=document.querySelector('.input');
const container=document.querySelector('.container');
let database;
console.log(firebase)

function addData(){
        console.log("inside")
       
        //to create key
        database=firebase.database().ref('todo')
        let key=database.push().key;
        let todo={
            value:inputValue.value,
            key:key

        }
        inputValue.value=""

        database.child(key).set(todo)

}

      

function todo(){
        let database=firebase.database().ref('todo')
        database.on('child_added',(data)=>{
        let input=document.createElement('input');
        input.value=data.val().value;
        input.disabled=true;
        input.classList.add('item_input');
        input.type="text";

        let itemBox=document.createElement('div');
        itemBox.classList.add('title');

        let editButton=document.createElement('button');
        editButton.classList.add('edit');
        editButton.innerHTML="EDIT";
        editButton.setAttribute("id",data.val().key);
        editButton.setAttribute("onclick",`editTodo(this)`)
        
        let removeButton=document.createElement('button');
        removeButton.classList.add('remove');
        removeButton.setAttribute("id",data.val().key)
        removeButton.setAttribute('onclick',`deleteToDo(this)`)
        removeButton.innerHTML="DELETE"

        container.append(itemBox)
        itemBox.appendChild(input);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);


           
        })
    }
  

todo();

addButton.addEventListener('click',()=>{
    addData()
})
 
function deleteToDo(e){
 
    //yeh database se remove krne k lye
    firebase.database().ref('todo').child(e.id).remove()
    //yeh DOM se remove krne k lye
    e.parentNode.remove()

}
function editTodo(e){
    //firebase.database().ref('todo').child.ed
    let val=prompt("Enter value to update");
    var editodo={
        value:val,
        key:e.id

    }
    firebase.database().ref('todo').child(e.id).set(editodo)
    e.parentNode.firstChild.nodeValue=val;  
    

} 