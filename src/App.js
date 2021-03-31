import React, { useEffect, useState } from "react";
import todologo from "./images/todo logo.png";
import ToDoItem from "./TodoItem";
import InputItem from "./InputItem";
import idGenerator from "./idGenerator";
import sortItemsCheckedUnchecked from "./sortItemsCheckedUnchecked";
import { AppContainer, Image } from "./styles/StyledApp";
import { ToDoItemsContainer } from "./styles/ToDoItemStyle";
import { SortPriorityButton } from "./styles/SortPriorityButton";
import { NoToDoItemsMessage } from "./styles/NoToDoItemsMessage";
import sortItemsByPriority from "./sortItemsByPriority";

function App() {
  const [items, setItems] = useState([]);
  const [showSortButton, setShowSortButton] = useState(false);

  const handleCheckUncheck = (changedComponentName) => {
    const currentState = [...items];
    const newState = currentState.map((item) => {
      if (item.id === changedComponentName) {
        item.checked = !item.checked;
      }
      return item;
    });
    setItems(sortItemsCheckedUnchecked([...newState]));
    setShowSortButton(true);
  };

  useEffect(() => {
    const initialState = JSON.parse(localStorage.getItem("todos"));
    setItems(initialState);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

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
    setShowSortButton(true);
  };

  const handleSortByPriority = () => {
    const newState = sortItemsByPriority(items);
    setItems([...newState]);
    setTimeout(() => {
      setShowSortButton(false);
    }, 1000);
  };

  return (
    <>
      <AppContainer>
        <Image src={todologo} alt="logo" />
        <InputItem itemAddition={handleItemAddition} />
        <SortPriorityButton
          show={showSortButton}
          onClick={handleSortByPriority}
        >
          Sort by priority
        </SortPriorityButton>
        <ToDoItemsContainer>
          {toDoItems.length > 0 ? (
            toDoItems
          ) : (
            <NoToDoItemsMessage>No to do items.</NoToDoItemsMessage>
          )}
        </ToDoItemsContainer>
      </AppContainer>
    </>
  );
}

export default App;
