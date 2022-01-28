import * as ActionType from '../actionTypes';

export const selectTodoListAction = ({
	id,
}: {
	id: TodoList['id'];
}): SelectTodoListAction => ({
	type: ActionType.SELECTTODOLIST,
	payload: { id },
});

export const createTodoListAction = ({
	title,
}: {
	title: TodoList['title'];
}): CreateTodoListAction => ({
	type: ActionType.CREATETODOLIST,
	payload: { title },
});

export const deleteTodoListAction = ({
	id,
}: {
	id: TodoList['id'];
}): DeleteTodoListAction => ({
	type: ActionType.DELETETODOLIST,
	payload: { id },
});
