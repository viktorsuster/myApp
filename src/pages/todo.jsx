import React from 'react'
import { Input, Checkbox, Button, Heading } from "@chakra-ui/react"
import { nanoid } from "https://cdn.skypack.dev/nanoid@3.1.23";

const initialTodos = [
	
];
const AddTodos = ({ onAddToDo }) => {
	const [toDoText, setToDoText] = React.useState("");
	return (
		<>
			<Input
            placeholder="What is next?"
            width="60vh"
				onChange={(e) => {
					setToDoText(e.target.value);
				}}
				value={toDoText}
			/>
			<Button
                padding="1em"
                float="right"
                width="18vh"
                colorScheme="blue"
				onClick={() => {
					if (toDoText) {
						onAddToDo(toDoText);
						setToDoText("");
					}
				}}
			>
				Add
			</Button>
		</>
	);
};
const ToDoItem = (props) => (
	<div>
		<label>
			<Checkbox padding="4px" 
                cursor="pointer" type="checkbox" checked={props.isChecked} onChange={props.onChange} />
			{props.text}
		</label>
	</div>
);
const ToDos = ({ toDos, onToDoToggle }) => (
	<>
		<Heading  margin="20px" color="#2B6CB0">ToDo</Heading>
		{toDos
			.filter((toDo) => !toDo.isCompleted)
			.map((toDo) => (
				<ToDoItem
					key={toDo.id}
					text={toDo.text}
					isChecked={toDo.isCompleted}
					onChange={() => onToDoToggle(toDo.id)}
				/>
			))}
	</>
);
const CompletedToDos = ({ toDos, onToDoToggle }) => (
	<>
		<Heading  margin="20px" color="#2C5282">Done</Heading>
		{toDos.map((toDo) =>
			toDo.isCompleted ? (
				<ToDoItem
					key={toDo.id}
					text={toDo.text}
					isChecked={toDo.isCompleted}
					onChange={() => onToDoToggle(toDo.id)}
				/>
			) : null
		)}
	</>
);
const ToDoList = () => {
	const [toDos, setToDos] = React.useState(initialTodos);
	const handleAddToDo = (text) => {
		setToDos((previousToDos) => [
			...previousToDos,
			{
				id: nanoid(),
				text,
				isCompleted: false
			}
		]);
	};
	const handleToDoToggle = (id) => {
		setToDos((previousToDos) => {
			const currentToDoItem = previousToDos.find((prevToDo) => prevToDo.id === id);
			return [
				...previousToDos.filter((item) => item.id !== id),
				{
					...currentToDoItem,
					isCompleted: !currentToDoItem.isCompleted
				}
			];
		});
	};
	return (
		<Heading color="white" size="15px">
			<AddTodos onAddToDo={handleAddToDo} />
			<ToDos padding="1rem" toDos={toDos} onToDoToggle={handleToDoToggle} />
			<CompletedToDos padding="3rem" toDos={toDos} onToDoToggle={handleToDoToggle} />
		</Heading>
	);
};

export const AppToDo = () => <ToDoList />;