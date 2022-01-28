import * as React from 'react';

import useStore from 'src/store';
import {
	createTodoAction,
	deleteTodoAction,
	toggleTodoAction,
} from 'src/store/actions';

import { List } from '@mui/material';

import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';
import ErrorToast from 'components/ErrorToast';

const TodoApp = () => {
	const {
		state: {
			todosState: todos,
			todoListsState: { selectedTodoList },
		},
		dispatch: { todosDispatch: dispatch },
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

			if (!selectedTodoList) return setShowToastError(true);
			dispatch(
				createTodoAction({ title: newTodoTitle, todoListId: selectedTodoList }),
			);
			setNewTodoTitle(''); // init value
		}, [dispatch, newTodoTitle, selectedTodoList]),
	};

	// todo
	const todoHandle = {
		toggle: React.useCallback(
			(id: Todo['id']) =>
				dispatch(
					toggleTodoAction({
						id,
						todoListId: selectedTodoList!,
					}),
				),
			[dispatch, selectedTodoList],
		),
		delete: React.useCallback(
			(id: Todo['id']) =>
				dispatch(
					deleteTodoAction({
						id,
						todoListId: selectedTodoList!,
					}),
				),
			[dispatch, selectedTodoList],
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
				{todos.map((todo) => (
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
