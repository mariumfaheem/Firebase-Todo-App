const addButton=document.querySelector('#addBtn');
const inputValue=document.querySelector('.input');
const container=document.querySelector('.container');

class item{
    constructor(itemName){
        this.createDiv(itemName)
    }
    createDiv(itemName){
        console.log("inside")
        let input=document.createElement('input');
        input.value=itemName;
        input.disabled=true;
        input.classList.add('item_input');
        input.type="text";
        //firebaseToDo()
        let database=firebase.database().ref('todo')
        //to create key
        let key=database.push().key;
        let todo={
            value:itemName,
            key:key

        }
        database.child(key).set(todo)

         let itemBox=document.createElement('div');
         itemBox.classList.add('title');
        let editButton=document.createElement('button');
        editButton.classList.add('edit');
        editButton.innerHTML="EDIT";

        database.on('child_added',(data)=>{
            console.log(data.val())
        })

        
        let removeButton=document.createElement('button');
        removeButton.classList.add('remove');
        removeButton.innerHTML="DELETE"

        container.append(itemBox)
        itemBox.appendChild(input);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);
        console.log("outside")


    }
  
}


addButton.addEventListener('click',()=>{
    new item(inputValue.value)
})

function deleteToDo(){
    
}