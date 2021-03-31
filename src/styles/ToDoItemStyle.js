import styled from "styled-components";
import checkedimg from "../checked.png";
const EDGE = "20px";
const EDGE2 = "20px";

const COLORS = ["#6CDAE7", "#AFE313", "#F2BA49", "#E77200", "#FD0E35"];

export const ToDoComponent = styled.div`
  margin-top: 1em;
  width: 90%;
  max-width: 350px;
  padding: 0.5em;
  clip-path: polygon(
    0 0,
    ${EDGE2} 0,
    calc(100% - ${EDGE2}) 0,
    100% ${EDGE},
    100% 100%,
    calc(100% - ${EDGE2}) 100%,
    ${EDGE2} 100%,
    0 calc(100% - ${EDGE}),
    0 0
  );
  background-color: ${({ priority, checked }) =>
    checked ? "grey" : COLORS[priority]};
  border-bottom: 2px solid black;
  border-top: 2px solid black;
  display: flex;
  align-items: center;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "")};
  text-decoration-style: ${({ checked }) => (checked ? "double" : "")};
  &:hover button i {
    visibility: visible;
  }
`;

export const Checkbox = styled.div`
  margin-right: 1em;
  margin-left: 1em;
  min-height: 20px;
  min-width: 20px;
  border-radius: 50%;
  border: 2px solid black;
  background-color: #1c1c1c;
  cursor: pointer;
  background-image: ${({ checked }) =>
    checked ? "url(" + checkedimg + ")" : ""};
  background-size: contain;
  background-repeat: no-repeat;

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;

export const Text = styled.h2`
  font-size: 18px;
  width: 70%;
  overflow-wrap: break-word;
  margin: 0.5em 0;
  text-align: start;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-style: ${({ checked }) => (checked ? "italic" : "normal")};
  @media (max-width: 600px) {
   width: 60%;
`;

export const TrashIcon = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  position: relative;
  z-index: 1000;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: auto;

  & > i {
    position: relative;
    visibility: hidden;
    z-index: -1;
    transition: all 0.2s ease;
  }

  &:hover i {
    color: white;
    transform: scale(1.3);
  }

  @media (max-width: 1050px) {
    & > i {
      visibility: visible;
    }
  }
`;
