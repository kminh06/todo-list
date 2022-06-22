import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import trash from '../media/trash.png'
import '../css/TodoList.css'

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [userID, setUserID] = useState("bXqN8MF2VwD2JeIpD1jv");
  const docRef = doc(db, "users", userID);
  const [text, updateText] = useState('');

  useEffect(() =>
    onSnapshot(docRef, (doc) =>
      setTodos(doc.data().todos)
    ), []);

  function handleChange(e) {
    updateText(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (text === '') {
      return;
    }

    const newItem = {
      title: text,
      isDone: false,
      id: Date.now()
    }

    updateDoc(docRef, {
      todos: arrayUnion({ title: newItem.title, isDone: newItem.isDone, id: newItem.id})
    });

    updateText('')
  }

  function handleDelete(list, index) {
    updateDoc(docRef, {
      todos: arrayRemove(list[index])
    })
  }

  function handleUpdate(list, index) {
    const updatedList = list;
    updatedList[index].isDone = !updatedList[index].isDone;
    console.log(updatedList[index].isDone)
    
    updateDoc(docRef, {
      todos: updatedList
    })
  }

  function itemStatus(status) {
    if (status === true) {
      return 'done'
    } else if (status === false) {
      return 'unfinished'
    }
  }

  const todolist = (list) => {
    if (list === []) {
      return <div></div>;
    } else {
      return (
        list.map((item) => 
        <div className='item' key={list.indexOf(item)}>
          <li className={itemStatus(item.isDone)} onClick={(e) => {
            e.preventDefault();
            handleUpdate(list, list.indexOf(item))}}>{item.title}</li>
          <div className='trash' onClick={(e) => {
            e.preventDefault();
            handleDelete(list, list.indexOf(item));
          }}><img id='trash' src={trash} alt='trash can'></img></div>
        </div>)
      )
    }
  }

  return (
    <div className='TodoList'>
      <div id='list'>
        <ol>
          {todolist(todos)}
        </ol>
      </div>
      <form>
        <input type='text' onChange={handleChange} value={text} placeholder='New item ...'></input>
        <button className='button' id='newTodo' onClick={handleSubmit}>Add</button>
      </form>
    </div>
  )
}
