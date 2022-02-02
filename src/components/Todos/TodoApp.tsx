import * as React from 'react';

import { useMyTodoLists, useTodos, useSelectedTodoList } from 'src/hooks';

import { useDeleteTodo, useToggleTodo, useLayoutEffect } from 'src/hooks';

import { List } from '@mui/material';

import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';

import gsap from 'gsap';

const TodoApp = () => {
	const { selectedTodoList } = useSelectedTodoList();
	const todos = useTodos().data?.todos;
	const visibleTodos =
		todos?.filter(({ todoListId }) => todoListId === selectedTodoList?.id) ??
		[];

	const [deleteTodo, _deleteTodoData] = useDeleteTodo();
	// const [editTodo, editTodoData] = useEditTodo();
	const [toggleTodo, _toggleTodoData] = useToggleTodo();

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
			{selectedTodoList && <AddTodoForm currentList={selectedTodoList.title} />}
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
