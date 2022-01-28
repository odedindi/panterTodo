type CREATETODO = 'CREATETODO';
interface CreateTodoAction {
	type: CREATETODO;
	payload: {
		title: Todo['title'];
		todoListId: TodoList['id'];
	};
}

type DELETETODO = 'DELETETODO';
interface DeleteTodoAction {
	type: DELETETODO;
	payload: { id: Todo['id']; todoListId: TodoList['id'] };
}

type EDITTODO = 'EDITTODO';
interface EditTodoAction {
	type: EDITTODO;
	payload: {
		id: Todo['id'];
		newTitle: Todo['title'];
		todoListId: TodoList['id'];
	};
}

type TOGGLETODO = 'TOGGLETODO';
interface ToggleTodoAction {
	type: TOGGLETODO;
	payload: { id: Todo['id']; todoListId: TodoList['id'] };
}

type SETTODOS = 'SETTODOS';
interface SetTodosAction {
	type: SETTODOS;
	payload: { todos: Todo[] };
}

type TodosReducerAction =
	| CreateTodoAction
	| DeleteTodoAction
	| EditTodoAction
	| SetTodosAction
	| ToggleTodoAction;

type CREATETODOLIST = 'CREATETODOLIST';
interface CreateTodoListAction {
	type: CREATETODOLIST;
	payload: {
		title: TodoList['title'];
	};
}

type DELETETODOLIST = 'DELETETODOLIST';
interface DeleteTodoListAction {
	type: DELETETODOLIST;
	payload: { id: TodoList['id'] };
}

type SELECTTODOLIST = 'SELECTTODOLIST';
interface SelectTodoListAction {
	type: SELECTTODOLIST;
	payload: { id: TodoList['id'] };
}

type TodoListsReducerAction =
	| SelectTodoListAction
	| CreateTodoListAction
	| DeleteTodoListAction;

type TodosState = Todo[];

type TodoListsState = {
	todoLists: TodoList[];
	selectedTodoList: TodoList['id'] | null;
};

type StoreInitialState = {
	todos: TodosState;
	todoLists: TodoListsState;
};

interface StoreContext {
	state: {
		todosState: TodosState;
		todoListsState: TodoListsState;
	};
	dispatch: {
		todosDispatch: React.Dispatch<TodosReducerAction>;
		todoListsDispatch: React.Dispatch<TodoListsReducerAction>;
	};
}
