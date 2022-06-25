import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import trash from '../media/trash.png'
import '../css/TodoList.css'
import { userInfo } from './Login'
import { useAuth } from '../contexts/AuthContext';

export default function TodoList() {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const [text, updateText] = useState('');
  const docRef = doc(db, "users", currentUser.uid);

  useEffect(() => {
    getDoc(docRef)
      .then((doc) => {
        if (doc.data() === undefined) {
          setDoc(docRef, {
            todos: []
          })
        } else {
          onSnapshot(docRef, (doc) =>
            setTodos(doc.data().todos)
          )
        }
      })
  }, [])

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
    
    updateDoc(docRef, {
      todos: updatedList
    })
  }

  function itemStatus(status) {
    if (status === true) {
      return 'done'
    } else if (status === false) {
      return
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
          }}><img id='trash' src='https://img.icons8.com/color/320/000000/close-window.png' alt='trash can'></img></div>
        </div>)
      )
    }
  }

  return (
    <>
      <div id='list'>
        <ol>
          {todolist(todos)}
        </ol>
      </div>
      <form>
        <input type='text' onChange={handleChange} value={text} placeholder='New item ...'></input>
        <button className='button' id='newTodo' onClick={handleSubmit}>Add</button>
      </form>
    </>
  )
}
