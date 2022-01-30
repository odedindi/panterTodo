import { actionType } from './';

export const selectTodoList = ({
	id,
}: {
	id: ITodoList['id'];
}): SelectTodoListAction => ({
	type: actionType.SELECTTODOLIST,
	payload: { id },
});

export const setTodoLists = ({
	todoLists,
}: {
	todoLists: ITodoList[];
}): SetTodoListsAction => ({
	type: actionType.SETTODOLISTS,
	payload: { todoLists },
});

export const setTodos = ({ todos }: { todos: ITodo[] }): SetTodosAction => ({
	type: actionType.SETTODOS,
	payload: { todos },
});

export const setUser = ({ user }: { user: IUser }): SetUserAction => ({
	type: actionType.SETUSER,
	payload: { user },
});

export const Logout = (): LogoutUserAction => ({
	type: actionType.LOGOUTUSER,
	payload: {
		todoLists: [],
		currentList: undefined,
		currentTodos: [],
		user: undefined,
	},
});
