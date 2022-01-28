import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// const todos: Prisma.TodoCreateInput[] = [
//   {
//     title: "create todos",
//   },
//   {
//     title: "create more todos",
//   },
//   {
//     title: "create even more todos",
//   },
//   {
//     title: "create more and more and more todos",
//   },
// ];

// const seed = async (todos: Prisma.TodoCreateInput[]) => {
//   await prisma.todo.create({
//     data: {
//       title,
//     },
//   });
// };

const todoLists: Prisma.TodoListCreateInput[] = [
	{
		user: 'ckyxd85ba0010iijoljomfkif' as Prisma.UserCreateNestedOneWithoutTodoListsInput,
	},
];

const seedTodoLists = async (todoLists: Prisma.TodoListCreateInput[]) => {
	console.info(`===> 🌱Seeding start🌱 <===`);
	todoLists.forEach(async (todoList) => {
		const prismaTodoList = await prisma.todoList.create({ data: todoList });
		console.info(`todoList: ${prismaTodoList.id} successfully created`);
	});
	console.info('===> 🌱Seeding end🌱 <===');
};

seedTodoLists(todoLists)
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => await prisma.$disconnect());
