import * as actionType from '../actionTypes';

export const setTodosAction = ({
	todos,
}: {
	todos: Todo[];
}): SetTodosAction => ({
	type: actionType.SETTODOS,
	payload: { todos },
});

export const createTodoAction = ({
	title,
	todoListId,
}: {
	title: Todo['title'];
	todoListId: TodoList['id'];
}): CreateTodoAction => ({
	type: actionType.CREATETODO,
	payload: { title, todoListId },
});

export const editTodoAction = ({
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

export const toggleTodoAction = ({
	id,
	todoListId,
}: {
	id: Todo['id'];
	todoListId: TodoList['id'];
}): ToggleTodoAction => ({
	type: actionType.TOGGLETODO,
	payload: { id, todoListId },
});

export const deleteTodoAction = ({
	id,
	todoListId,
}: {
	id: Todo['id'];
	todoListId: TodoList['id'];
}): DeleteTodoAction => ({
	type: actionType.DELETETODO,
	payload: { id, todoListId },
});
