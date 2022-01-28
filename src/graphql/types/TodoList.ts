import { extendType, objectType, queryType } from 'nexus';

export const TodoList = objectType({
	name: 'TodoList',
	definition(t) {
		t.nonNull.string('id');
		t.nonNull.string('title');
	},
});

export const Query = extendType({
	type: 'Query',
	definition(t) {
		t.field('todoLists', {
			type: TodoList,
			resolve(root, args, context) {
				if (!context.session?.user.id) return null;

				return context.prisma.todoList.findMany({
					where: { userId: context.session?.user.id },
				});
			},
		});
	},
});
