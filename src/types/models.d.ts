interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt?: Date;
	todoListId: string;
}

interface TodoList {
	id: string;
	todos: Todo[];
	title: string;
	createdAt?: Date;
}

interface User {
	id: string;
	name: string;
	email: string;
	image: string;
}
