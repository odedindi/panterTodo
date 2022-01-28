import { uid } from './generateId';

export const generateTodoList = ({
	title,
}: {
	title: TodoList['title'];
}): TodoList => ({
	id: uid(),
	title,
	createdAt: new Date(Date.now()),
	todos: [],
});
