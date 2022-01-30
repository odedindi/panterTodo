type SETUSER = 'SETUSER';
interface SetUserAction {
	type: SETUSER;
	payload: { user: IUser };
}

type LOGOUTUSER = 'LOGOUTUSER';
interface LogoutUserAction {
	type: LOGOUTUSER;
	payload: StoreState;
}

type SETTODOS = 'SETTODOS';
interface SetTodosAction {
	type: SETTODOS;
	payload: { todos: ITodo[] };
}

type SELECTTODOLIST = 'SELECTTODOLIST';
interface SelectTodoListAction {
	type: SELECTTODOLIST;
	payload: { id: ITodoList['id'] };
}

type SETTODOLISTS = 'SETTODOLISTS';
interface SetTodoListsAction {
	type: SETTODOLISTS;
	payload: { todoLists: ITodoList[] };
}

type ReducerAction =
	| LogoutUserAction
	| SelectTodoListAction
	| SetTodoListsAction
	| SetTodosAction
	| SetUserAction;

type TodosState = ITodo[];

interface StoreState {
	todoLists: ITodoList[];
	currentList: ITodoList['id'] | undefined;
	currentTodos: ITodo[];
	user: IUser | undefined;
}
interface StoreContext {
	storeState: StoreState;
	dispatch: React.Dispatch<ReducerAction>;
}
