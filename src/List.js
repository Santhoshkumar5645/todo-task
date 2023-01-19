import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({items, removeItem, editItem }) => {

  return <div className="todo-list">

    {items.map((values)=>{
      
      const {id, title } = values;

      return <div key={id} className="todo-item">
        <p className="title">{title}</p>
        <div className="btn-container">
          <button type='button' className='edit-btn' onClick={()=> editItem(id)} >
            <FaEdit />
          </button>
          <button type='button' className='delete-btn' onClick={()=> removeItem(id)} >
            <FaTrash />
          </button>
        </div>
      </div>
    })}
  </div>
}
export default List
