import { uid } from './generateId';

export const generateTodo = ({
	title,
	todoListId,
}: {
	title: Todo['title'];
	todoListId: TodoList['id'];
}): Todo => ({
	id: uid(),
	todoListId,
	title,
	completed: false,
	createdAt: new Date(Date.now()),
});
