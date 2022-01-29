import * as actionType from './actionTypes';
import { generateTodoList } from 'src/utils/generateTodoList';
import { generateTodo } from 'src/utils/generateTodo';

import { inMemoryStorage } from 'src/repositories/inMemory';

export const reducer = (
	state: StoreState,
	{ type, payload }: ReducerAction,
): StoreState => {
	switch (type) {
		case actionType.SELECTTODOLIST:
			return { ...state, currentList: payload.id };

		case actionType.CREATETODOLIST:
			return {
				...state,
				todoLists: [generateTodoList(payload), ...state.todoLists],
			};

		case actionType.DELETETODOLIST:
			return {
				...state,
				todoLists: [...state.todoLists.filter(({ id }) => id !== payload.id)],
				currentList:
					state.currentList === payload.id ? undefined : state.currentList,
			};

		case actionType.SETTODOS:
			return { ...state, currentTodos: payload.todos };

		case actionType.CREATETODO:
			return {
				...state,
				currentTodos: [...state.currentTodos, generateTodo(payload)],
			};

		case actionType.EDITTODO:
			return {
				...state,
				currentTodos: [
					...state.currentTodos.map((todo) =>
						todo.id === payload.id
							? { ...todo, title: payload.newTitle }
							: todo,
					),
				],
			};

		case actionType.TOGGLETODO:
			return {
				...state,
				currentTodos: [
					...state.currentTodos.map((todo) =>
						todo.id === payload.id
							? { ...todo, completed: !todo.completed }
							: todo,
					),
				],
			};

		case actionType.DELETETODO:
			return {
				...state,
				currentTodos: [
					...state.currentTodos.filter((todo) => todo.id !== payload.id),
				],
			};

		case actionType.SETUSER:
			return {
				...state,
				user: payload.user,
			};
		case actionType.LOGOUTUSER:
			return {
				...state,
				user: undefined,
			};

		default:
			return state;
	}
};

export default reducer;
