import { extendType, objectType, queryType, list } from 'nexus';
import { Todo } from './Todo';

export const TodoList = objectType({
	name: 'TodoList',
	definition(t) {
		t.model.id();
		t.model.title();
		t.model.userId();
	},
});

export const Query = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('todoLists', {
			type: TodoList,
			async resolve(_root, _args, context) {
				if (!context.session?.user.id) return null;
				return context.prisma.todoList.findMany({
					where: { userId: context.session.user.id },
				});
			},
		});
	},
});
