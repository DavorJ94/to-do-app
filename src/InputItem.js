import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  SubmitButton,
  InputComponent,
  PriorityComponent,
  PriorityText,
  PriorityItem,
} from "./styles/InputItemStyle";

export default function InputItem({ itemAddition }) {
  const [inputItem, setInputItem] = useState("");
  const [priority, setPriority] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowInput(false);
          setPriority(0);
          setInputItem("");
        } else {
          setShowInput(true);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleInputChange = (e) => {
    setInputItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputItem === "") return alert("Please fill the input box.");
    const addedObj = { text: inputItem, priority: priority };
    itemAddition(addedObj);
    setShowInput(false);
    setPriority(0);
    setInputItem("");
  };

  return (
    <InputComponent ref={wrapperRef}>
      <Input
        onChange={handleInputChange}
        value={inputItem}
        placeholder="Add item"
      />
      <PriorityComponent style={{ display: showInput ? "" : "none" }}>
        <PriorityText>Priority: </PriorityText>
        <PriorityItem
          priority={priority}
          name={priority >= 0 ? 0 : undefined}
          onClick={() => setPriority(0)}
        ></PriorityItem>
        <PriorityItem
          priority={priority}
          name={priority >= 1 ? 1 : undefined}
          onClick={(e) => setPriority(1)}
        ></PriorityItem>
        <PriorityItem
          priority={priority}
          name={priority >= 2 ? 2 : undefined}
          onClick={(e) => setPriority(2)}
        ></PriorityItem>
        <PriorityItem
          priority={priority}
          name={priority >= 3 ? 3 : undefined}
          onClick={(e) => setPriority(3)}
        ></PriorityItem>
        <PriorityItem
          priority={priority}
          name={priority >= 4 ? 4 : undefined}
          onClick={(e) => setPriority(4)}
        ></PriorityItem>
      </PriorityComponent>
      <SubmitButton
        type="submit"
        onClick={handleSubmit}
        style={{ display: showInput ? "" : "none" }}
      >
        Add item
      </SubmitButton>
    </InputComponent>
  );
}
