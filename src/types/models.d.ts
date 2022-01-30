interface ITodo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: string;
	todoListId: string;
}

interface ITodoList {
	id: string;
	todos?: Todo[];
	title: string;
}

interface IUser {
	id: string;
	name: string | null;
	email: string | null;
	image: string | null;
}
