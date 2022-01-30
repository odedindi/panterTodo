type SETUSER = 'SETUSER';
interface SetUserAction {
	type: SETUSER;
	payload: { user: User };
}

type LOGOUTUSER = 'LOGOUTUSER';
interface LogoutUserAction {
	type: LOGOUTUSER;
	payload: undefined;
}

type CREATETODO = 'CREATETODO';
interface CreateTodoAction {
	type: CREATETODO;
	payload: {
		title: Todo['title'];
		todoListId: TodoList['title'];
	};
}

type DELETETODO = 'DELETETODO';
interface DeleteTodoAction {
	type: DELETETODO;
	payload: { id: Todo['id'] };
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
	payload: { id: Todo['id'] };
}

type SETTODOS = 'SETTODOS';
interface SetTodosAction {
	type: SETTODOS;
	payload: { todos: Todo[] };
}

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

type SETTODOLISTS = 'SETTODOLISTS';
interface SetTodoListsAction {
	type: SETTODOLISTS;
	payload: { todoLists: TodoList[] };
}

type ReducerAction =
	| CreateTodoListAction
	| CreateTodoAction
	| DeleteTodoListAction
	| DeleteTodoAction
	| EditTodoAction
	| LogoutUserAction
	| SelectTodoListAction
	| SetTodoListsAction
	| SetTodosAction
	| SetUserAction
	| ToggleTodoAction;

type TodosState = Todo[];

type TodoListsState = {
	todoLists: TodoList[];
	selectedTodoList: TodoList['id'] | null;
};

interface StoreState {
	todoLists: TodoList[];
	currentList: TodoList['id'] | undefined;
	currentTodos: Todo[];
	user: User | undefined;
}
interface StoreContext {
	storeState: StoreState;
	dispatch: React.Dispatch<ReducerAction>;
}
