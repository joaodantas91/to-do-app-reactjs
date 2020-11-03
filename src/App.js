import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';

import SearchBox from './components/SearchBox.js'

function App() {

  const [ SearchText, setSearchText ] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([
      {id:123, title:'Comprar o bolo', done: false},
      {id:456, title:'Pegar o cachorro no petshop', done: true},
      {id:789, title:'comer', done: false}
    ]);
  }, []);

  const addAction = (newItem) => {
    let newList = [
      ...list, 
      {title: newItem,done: false}
    ];
    setList(newList);
  }
  
  const changeAction = (props, checked) => {
    let newList = [...list]
    if (newList[props.id].done != checked) {
      newList[props.id].done = checked
      setList(newList);
    }  
  }

  function Checkbox(props) {
    let verificar = () => (
      list[props.id].done ? true : false 
    )

    const [checked, setChecked] = useState(verificar);

    console.log(props.id)
    changeAction(props, checked);

    return (
      <input type="checkbox"
        checked={checked}
        onChange={()=> {
          setChecked(!checked)
          
        }}
      />
    );
  }

  return (
    <>
      <h1>Lista de Tarefas</h1> 
        
      <SearchBox 
        frasePadrao='Adicione um item'
        onEnter={addAction}
      />
      <ul>
      {list.map((item, index) => {
        return (
          <li key={index}>
            <Checkbox
              id={index}
            />

            {item.done && 
              <del>{item.title}</del>
            }
            {!item.done && 
              <span>{item.title}</span>
            }     
          </li>       
        );
      })}
      </ul>
    </>
  );
}

export default App;
