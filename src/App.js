import React, { useState } from "react";
import "./styles/App.css";
import todologo from "./todo logo.png";
import ToDoItem from "./TodoItem";
import InputItem from "./InputItem";
import idGenerator from "./idGenerator";
import sortItemsCheckedUnchecked from "./sortItemsCheckedUnchecked";

function App() {
  const [items, setItems] = useState([]);

  const handleCheckUncheck = (changedComponentName) => {
    const currentState = [...items];
    const newState = currentState.map((item) => {
      if (item.id === changedComponentName) {
        item.checked = !item.checked;
      }
      return item;
    });
    setItems(sortItemsCheckedUnchecked([...newState]));
  };

  const handleItemRemove = (inputValue) => {
    let currentState = [...items];
    let newState = currentState.filter((item) => item.id !== inputValue);
    setItems([...newState]);
  };

  const toDoItems = items.map((item) => {
    return (
      <ToDoItem
        key={item.id}
        checked={item.checked}
        text={item.text}
        priority={item.priority}
        id={item.id}
        handleCheckUncheck={handleCheckUncheck}
        handleRemove={handleItemRemove}
      />
    );
  });

  const handleItemAddition = (inputValue) => {
    const newId = idGenerator(items);
    const setInputValue = { ...inputValue, checked: false, id: newId };
    setItems((prevItems) => [...prevItems, setInputValue]);
  };

  return (
    <div className="App">
      <img src={todologo} alt="logo" />
      <InputItem itemAddition={handleItemAddition} />
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          width: "100%",
          maxWidth: "350px",
          marginBottom: "2em",
        }}
      >
        {toDoItems}
      </div>
    </div>
  );
}

export default App;
