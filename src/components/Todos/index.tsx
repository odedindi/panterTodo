import * as React from 'react';

import useStore from 'src/store';
import {
	useCreateTodo,
	useDeleteTodo,
	useEditTodo,
	useToggleTodo,
	useLayoutEffect,
} from 'src/hooks';

import { List } from '@mui/material';

import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';

import ErrorToast from 'src/components/ErrorToast';

import gsap from 'gsap';

const TodoApp = () => {
	const {
		storeState: { currentTodos, currentList },
	} = useStore();

	const [visibleTodos, setVisibleTodos] = React.useState(() => currentTodos);
	React.useEffect(() => {
		setVisibleTodos(currentTodos);
	}, [currentTodos]);

	const [createTodo, createTodoData] = useCreateTodo();
	const [deleteTodo, deleteTodoData] = useDeleteTodo();
	const [editTodo, editTodoData] = useEditTodo();
	const [toggleTodo, toggleTodoData] = useToggleTodo();

	// new todo
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
			createTodo({
				variables: {
					title: newTodoTitle,
					todoListId: currentList,
				},
			});
			setNewTodoTitle(''); // init value
		}, [createTodo, currentList, newTodoTitle]),
	};

	// todo
	const todoHandle = {
		toggle: React.useCallback(
			({ completed, id }: { completed: ITodo['completed']; id: ITodo['id'] }) =>
				toggleTodo({
					variables: {
						completed,
						id,
					},
				}),
			[toggleTodo],
		),
		delete: React.useCallback(
			(id: ITodo['id']) => deleteTodo({ variables: { id } }),
			[deleteTodo],
		),
	};

	// ui

	const todosRefs = React.useRef<HTMLLIElement[]>([]);
	const todoRef = (el: HTMLLIElement) => {
		if (!todosRefs.current.includes(el)) todosRefs.current.push(el);
	};

	useLayoutEffect(() => {
		const fadeIn = (target: gsap.DOMTarget) =>
			gsap.from(target, { opacity: 0, scale: 0.5, stagger: 0.1 });

		const animation = fadeIn(todosRefs.current);
		return () => {
			animation.kill();
		};
	}, []);
	return (
		<>
			{currentList && (
				<AddTodoForm
					handleChange={addTodoFormHandle.change}
					handleSubmit={addTodoFormHandle.submit}
					value={newTodoTitle}
					ref={textFieldRef}
				/>
			)}
			<ErrorToast show={showToastError} hide={setShowToastErrorFalse} />
			<List>
				{visibleTodos.map((todo) => (
					<TodoItem
						ref={todoRef}
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
