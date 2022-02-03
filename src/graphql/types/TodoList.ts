import { extendType, nonNull, objectType, stringArg } from 'nexus';

import { crud, model } from '../helper';

export const TodoList = objectType({
	name: 'TodoList',
	definition(t) {
		model(t).id()!;
		model(t).title()!;
		model(t).userId()!;
		model(t).todos()!;
	},
});
export const Query = extendType({
	type: 'Query',
	definition(t) {
		crud(t).todoList(),
			t.list.nonNull.field('todoLists', {
				type: nonNull(TodoList),
				async resolve(_root, _args, context) {
					if (!context.session?.user.id) return null;
					return await context.prisma.todoList.findMany({
						where: { userId: context.session.user.id },
					});
				},
			});
		t.list.nonNull.field('myTodoLists', {
			type: nonNull(TodoList),
			resolve: async (_root, _args, context) =>
				!context.session?.user.id
					? null
					: await context.prisma.todoList.findMany({
							where: { userId: context.session.user.id },
					  }),
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
			resolve: async (_root, { id, title }, context) => {
				try {
					const todo = await context.prisma.todoList.update({
						where: { id },
						data: { title },
					});
					return todo;
				} catch (err) {
					throw new Error(`Could not find todo id: ${id}, ${err}`);
				}
			},
		});
	},
});
