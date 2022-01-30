import {
	booleanArg,
	extendType,
	idArg,
	nonNull,
	objectType,
	stringArg,
} from 'nexus';

export const Todo = objectType({
	name: 'Todo',
	definition(t) {
		t.model.id()!;
		t.model.title()!;
		t.model.completed()!;
		t.model.createdAt()!;
		t.model.todoListId()!;
	},
});

export const Query = extendType({
	type: 'Query',
	definition(t) {
		t.crud.todo();
		t.crud.todos();
	},
});

export const Mutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createTodo', {
			type: Todo,
			args: {
				title: nonNull(stringArg()),
				todoListId: nonNull(stringArg()),
			},
			resolve: async (_root, { title, todoListId }, context) =>
				await context.prisma.todo.create({
					data: {
						title,
						todoListId,
					},
				}),
		});
		t.nonNull.field('deleteTodo', {
			type: Todo,
			args: { id: nonNull(stringArg()) },
			resolve: async (_root, { id }, context) =>
				await context.prisma.todo.delete({
					where: {
						id,
					},
				}),
		});

		t.nonNull.field('editTodoTitle', {
			type: Todo,
			args: { id: nonNull(stringArg()), title: nonNull(stringArg()) },
			resolve: async (_root, { id, title }, context) => {
				try {
					const todo = await context.prisma.todo.update({
						where: { id },
						data: { title },
					});
					return todo;
				} catch (err) {
					throw new Error(`Could not find todo id: ${id}, ${err}`);
				}
			},
		});

		t.nonNull.field('toggleTodo', {
			type: Todo,
			args: {
				id: nonNull(idArg()),
				completed: nonNull(booleanArg()),
			},
			resolve: async (_root, { id, completed }, context) => {
				try {
					const todo = await context.prisma.todo.update({
						where: { id },
						data: { completed },
					});
					return todo;
				} catch (err) {
					throw new Error(`Could not find todo id: ${id}, ${err}`);
				}
			},
		});
	},
});
