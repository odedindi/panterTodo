import { extendType, nonNull, objectType, queryType, stringArg } from 'nexus';

export const TodoList = objectType({
	name: 'TodoList',
	definition(t) {
		t.model.id()!;
		t.model.title()!;
		t.model.userId()!;
	},
});

export const Query = extendType({
	type: 'Query',
	definition(t) {
		t.crud.todoList(),
			t.list.nonNull.field('todoLists', {
				type: nonNull(TodoList),
				async resolve(_root, _args, context) {
					if (!context.session?.user.id) return null;
					return await context.prisma.todoList.findMany({
						where: { userId: context.session.user.id },
					});
				},
			});
	},
});

export const Mutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createTodoList', {
			type: TodoList,
			args: { title: nonNull(stringArg()) },
			resolve: async (_root, { title }, context) =>
				await context.prisma.todoList.create({
					data: { title, userId: context.session!.user.id },
				}),
		});

		t.nonNull.field('deleteTodoList', {
			type: TodoList,
			args: { id: nonNull(stringArg()) },
			resolve: async (_root, { id }, context) =>
				await context.prisma.todoList.delete({
					where: {
						id,
					},
				}),
		});

		t.nonNull.field('editTodoListTitle', {
			type: TodoList,
			args: { id: nonNull(stringArg()), title: nonNull(stringArg()) },
			resolve: async (_root, { id, title }, context) =>
				await context.prisma.todoList.update({
					where: { id },
					data: { title },
				}),
		});
	},
});
