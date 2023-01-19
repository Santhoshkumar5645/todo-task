
import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () =>{
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}

function App() {
   const [name, setName]= useState("")
   const [list, setList] = useState(getLocalStorage())
   const [isEditing, setIsEditing] = useState(false);
   const [editId, setEditId] = useState(null);
   const [alert, setAlert] = useState({
    show: false, 
    msg: '', 
    type:''
  })
  
   const handleSubmit= (event) =>{
    event.preventDefault()
     if(!name){
        showAlert(true, 'danger', 'please enter value')
     }
     else if(name && isEditing ){
        
        setList(list.map((values)=>{
          if(values.id === editId){
            return {...values, title: name}  
          }
          return values
        }))
        setName('');
        setEditId(null)
        setIsEditing(false);
        showAlert(true, 'success', 'value changed')
     }
     else{ 
         showAlert(true, 'success', 'item added to the list')
             
        const newItem = {id: new Date().getTime().toString(), title: name }   
        setList([...list, newItem])
        
        setName('')    
      }

   }

   const showAlert = (show = false, type= '', msg= '') =>{
       setAlert({show: show, type, msg})
   }

   const clearList = ()=>{
    showAlert(true,'danger','empty list')
    setList([]);
   }

   const removeItem = (id) =>{
        showAlert(true, 'danger', 'item removed')
        setList (list.filter((values)=>  values.id !== id      
        ))
   }
   
   
   const editItem = (id) =>{
      const specificItem = list.find((values)=> values.id === id)
      setIsEditing(true);
      setEditId(id);
      setName(specificItem.title)
   }

   useEffect(()=>{
     localStorage.setItem('list', JSON.stringify(list))
   }, [list])
    
   return <div className='section-center'>
    <form className="todo-form" onSubmit={handleSubmit}>
    
      {alert.show && <Alert {...alert} removeAlert={showAlert}  /> }  
      <h3>ToDo List</h3>
      <div className="form-control">
        <input type="text" className='todo' placeholder='Type here' value={name} onChange={(event)=>setName(event.target.value)} />
        <button type='submit' className='submit-btn' > 
          {isEditing ? 'Save' : 'Submit'}
         </button>
      </div>
    </form>

    
    {list.length > 0 && (
      <div >

        <List items={list} removeItem={removeItem} editItem={editItem } />

        <button  onClick={clearList}  className='clear-btn' >Clear Items</button>  
       
      </div>
    )}
    
      
   </div>
}

export default App;
