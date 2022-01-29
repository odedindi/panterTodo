import * as React from 'react';

import { action, useStore } from 'src/store';

import { List } from '@mui/material';

import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';

import ErrorToast from 'src/components/ErrorToast';

const TodoApp = () => {
	const {
		storeState: { currentTodos, currentList },
		dispatch,
	} = useStore();

	// new todo form
	const [showToastError, setShowToastError] = React.useState(false);
	const setShowToastErrorFalse = () => setShowToastError(false);
	const [newTodoTitle, setNewTodoTitle] = React.useState<string>('');
	const textFieldRef = React.useRef<HTMLInputElement>(undefined!);
	const addTodoFormHandle = {
		change: React.useCallback(
			({
				currentTarget: { value },
			}: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
				setNewTodoTitle(value),
			[],
		),
		submit: React.useCallback(() => {
			if (!newTodoTitle.trim())
				return (
					textFieldRef.current.children['1'].children['0'] as HTMLInputElement
				).focus();

			if (!currentList) return setShowToastError(true);
			dispatch(
				action.createTodo({
					title: newTodoTitle,
					todoListId: currentList,
				}),
			);
			setNewTodoTitle(''); // init value
		}, [currentList, dispatch, newTodoTitle]),
	};

	// todo
	const todoHandle = {
		toggle: React.useCallback(
			(id: Todo['id']) =>
				dispatch(
					action.toggleTodo({
						id,
					}),
				),
			[dispatch],
		),
		delete: React.useCallback(
			(id: Todo['id']) =>
				dispatch(
					action.deleteTodo({
						id,
					}),
				),
			[dispatch],
		),
	};
	return (
		<>
			<AddTodoForm
				handleChange={addTodoFormHandle.change}
				handleSubmit={addTodoFormHandle.submit}
				value={newTodoTitle}
				ref={textFieldRef}
			/>
			<ErrorToast show={showToastError} hide={setShowToastErrorFalse} />
			<List>
				{currentTodos.map((todo) => (
					<TodoItem
						todo={todo}
						key={todo.id}
						handleToggle={todoHandle.toggle}
						handleDelete={todoHandle.delete}
					/>
				))}
			</List>
		</>
	);
};

export default TodoApp;
