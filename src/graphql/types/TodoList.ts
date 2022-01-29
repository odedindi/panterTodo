import { extendType, objectType, queryType, list } from 'nexus';
import { Todo } from './Todo';

export const TodoList = objectType({
	name: 'TodoList',
	definition(t) {
		t.model.id();
		t.model.title();
	},
});

export const Query = extendType({
	type: 'Query',
	definition(t) {
		t.crud.todoList(),
		t.crud.todoLists({
			ordering: true,
			filtering: true,
		});
	},
});
