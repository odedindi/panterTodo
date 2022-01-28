import * as actionType from '../actionTypes';
import { generateTodoList } from 'src/utils/generateTodoList';
import { inMemoryStorage } from 'src/repositories/inMemory';

export const todoListsReducer = (
	state: TodoListsState,
	{ type, payload }: TodoListsReducerAction,
): TodoListsState => {
	switch (type) {
		case actionType.SELECTTODOLIST:
			return { ...state, selectedTodoList: payload.id };

		case actionType.CREATETODOLIST:
			return {
				...state,
				todoLists: [generateTodoList(payload), ...state.todoLists],
			};

		case actionType.DELETETODOLIST:
			return {
				...state,
				todoLists: [...state.todoLists.filter(({ id }) => id !== payload.id)],
				selectedTodoList:
					state.selectedTodoList === payload.id ? null : state.selectedTodoList,
			};

		default:
			return state;
	}
};
