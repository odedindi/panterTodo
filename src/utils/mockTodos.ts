import { generateTodo } from './generateTodo';
import { generateTodoList } from './generateTodoList';
import { getNumberWithOrdinal } from './getNumberWithOrdinal';

export const mockTodoLists = (n: number): TodoList[] =>
	Array.from({ length: n }, (_, i) =>
		generateTodoList({ title: `${getNumberWithOrdinal(i + 1)} list` }),
	);

export const mockTodos = (n: number, todoListId: TodoList['id']): Todo[] =>
	Array.from({ length: n }, (_, i) =>
		generateTodo({ title: `${getNumberWithOrdinal(i + 1)} todo`, todoListId }),
	);
