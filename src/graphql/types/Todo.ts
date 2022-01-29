import { context } from './../context';
import { extendType, objectType, queryType, list } from 'nexus';
import { booleanArg, idArg, nonNull, stringArg } from 'nexus';
import { TodoList } from './TodoList';

export const Todo = objectType({
	name: 'Todo',
	definition(t) {
		t.model.id();
		t.model.title();
		t.model.completed();
		t.model.createdAt();
		t.model.todoListId();
	},
});

export const Query = extendType({
	type: 'Query',
	definition(t) {
		t.crud.todo('todoList');
		t.crud.todos({
			ordering: { title: true },
			filtering: { todoListId: true },
		});
		t.field('todosByList', {
			type: list(Todo),
			// args:{todoListId: }
		});
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
			async resolve(root, { title, todoListId }, context) {
				const todo = await context.prisma.todo.create({
					data: {
						title,
						todoListId,
					},
				});
				return todo;
			},
		});
		t.nonNull.field('toggleTodo', {
			type: Todo,
			args: {
				id: nonNull(idArg()),
				completed: nonNull(booleanArg()),
			},
			async resolve(root, args, context) {
				try {
					const todo = await context.prisma.todo.update({
						where: { id: args.id },
						data: {
							completed: args.completed,
						},
					});
					return todo;
				} catch (err) {
					throw new Error('Todo was not found');
				}
			},
		});
	},
});
