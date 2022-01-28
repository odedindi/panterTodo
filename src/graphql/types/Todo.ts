import { extendType, objectType, queryType } from 'nexus';

export const TodoList = objectType({
	name: 'Todo',
	definition(t) {
		// t.model.id();
		// t.model.title();
		// t.model.completed();
		// t.model.createdAt();
		// t.model.todoListId();
	},
});

export const Query = extendType({
	type: 'Query',
	definition(t) {
		// t.field("todos", {
		//   type: Todo,
		//   resolve(root, args, context) {
		//     if (!context.session?.user.id) return null;
		//     return context.prisma.todo.findMany({});
		//   },
		// });
		// t.crud.todo();
		// t.crud.todos();
	},
});
