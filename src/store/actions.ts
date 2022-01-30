import { actionType } from './';

export const createTodoList = ({
	title,
}: {
	title: TodoList['title'];
}): CreateTodoListAction => ({
	type: actionType.CREATETODOLIST,
	payload: { title },
});

export const createTodo = ({
	title,
	todoListId,
}: {
	title: Todo['title'];
	todoListId: TodoList['id'];
}): CreateTodoAction => ({
	type: actionType.CREATETODO,
	payload: { title, todoListId },
});

export const deleteTodoList = ({
	id,
}: {
	id: TodoList['id'];
}): DeleteTodoListAction => ({
	type: actionType.DELETETODOLIST,
	payload: { id },
});

export const deleteTodo = ({ id }: { id: Todo['id'] }): DeleteTodoAction => ({
	type: actionType.DELETETODO,
	payload: { id },
});

export const editTodo = ({
	id,
	newTitle,
	todoListId,
}: {
	id: Todo['id'];
	newTitle: Todo['title'];
	todoListId: TodoList['id'];
}): EditTodoAction => ({
	type: actionType.EDITTODO,
	payload: { id, newTitle, todoListId },
});

export const selectTodoList = ({
	id,
}: {
	id: TodoList['id'];
}): SelectTodoListAction => ({
	type: actionType.SELECTTODOLIST,
	payload: { id },
});

export const setTodoLists = ({
	todoLists,
}: {
	todoLists: TodoList[];
}): SetTodoListsAction => ({
	type: actionType.SETTODOLISTS,
	payload: { todoLists },
});

export const setTodos = ({ todos }: { todos: Todo[] }): SetTodosAction => ({
	type: actionType.SETTODOS,
	payload: { todos },
});

export const toggleTodo = ({ id }: { id: Todo['id'] }): ToggleTodoAction => ({
	type: actionType.TOGGLETODO,
	payload: { id },
});

export const setUser = ({ user }: { user: User }): SetUserAction => ({
	type: actionType.SETUSER,
	payload: { user },
});
