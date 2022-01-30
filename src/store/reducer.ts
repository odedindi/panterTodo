import { Reducer } from 'react';
import * as actionType from './actionTypes';

export const reducer = (
	state: StoreState,
	{ type, payload }: ReducerAction,
): StoreState => {
	switch (type) {
		case actionType.SETTODOLISTS:
			return { ...state, todoLists: payload.todoLists };

		case actionType.SELECTTODOLIST:
			return { ...state, currentList: payload.id };

		case actionType.SETTODOS:
			return { ...state, currentTodos: payload.todos };

		case actionType.SETUSER:
			return {
				...state,
				user: payload.user,
			};
		case actionType.LOGOUTUSER:
			return {
				...state,
				...payload,
			};

		default:
			return state;
	}
};

export default reducer;
