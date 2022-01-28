import * as actionType from '../actionTypes';
import { generateTodo } from 'src/utils/generateTodo';
import { inMemoryStorage } from 'src/repositories/inMemory';

export const todosReducer = (
	todos: TodosState,
	{ type, payload }: TodosReducerAction,
): TodosState => {
	switch (type) {
		case actionType.SETTODOS:
			return payload.todos;
		case actionType.CREATETODO:
			return [...todos, generateTodo(payload)];
		case actionType.EDITTODO:
			return [
				...todos.map((todo) =>
					todo.id === payload.id ? { ...todo, title: payload.newTitle } : todo,
				),
			];
		case actionType.TOGGLETODO:
			return [
				...todos.map((todo) =>
					todo.id === payload.id
						? { ...todo, completed: !todo.completed }
						: todo,
				),
			];
		case actionType.DELETETODO:
			return [...todos.filter((todo) => todo.id !== payload.id)];
		default:
			return todos;
	}
};
