interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt?: Date;
	todoListId: string;
}

interface TodoList {
	id: string;
	todos?: Todo[];
	title: string;
}

interface User {
	id: string;
	name: string | null;
	email: string | null;
	image: string | null;
}
