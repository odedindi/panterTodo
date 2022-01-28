import * as React from 'react';
import { mockTodos } from 'src/utils/mockTodos';
import { todosReducer, todoListsReducer } from './reducers';
import { inMemoryStorage } from 'src/repositories/inMemory';
import { setTodosAction, selectTodoListAction } from './actions';

const initStates: StoreInitialState = {
	todos: [],
	todoLists: {
		todoLists: inMemoryStorage.getAllTodoLists(),
		selectedTodoList: null,
	},
};

const todoStoreContext = React.createContext<StoreContext>(undefined!);

const { Provider }: { Provider: React.Provider<StoreContext> } =
	todoStoreContext;

export const TodoStoreProvider: React.FC = ({ children }) => {
	const [todosState, todosDispatch] = React.useReducer(
		todosReducer,
		initStates.todos,
	);

	const [todoListsState, todoListsDispatch] = React.useReducer(
		todoListsReducer,
		initStates.todoLists,
	);

	const store = {
		state: {
			todosState,
			todoListsState,
		},
		dispatch: {
			todosDispatch,
			todoListsDispatch,
		},
	};

	// respond to change of todolists
	React.useEffect(() => {
		if (todoListsState.todoLists.length === 1) {
			todoListsDispatch(
				selectTodoListAction({ id: todoListsState.todoLists[0].id }),
			);
		}
		if (todoListsState.selectedTodoList) {
			const matchList = todoListsState.todoLists.find(
				({ id }) => id === todoListsState.selectedTodoList,
			);
			if (matchList) todosDispatch(setTodosAction({ todos: matchList!.todos }));
			else if (!matchList || !todoListsState.selectedTodoList)
				todosDispatch(setTodosAction({ todos: [] }));
		}
	}, [todoListsState.selectedTodoList, todoListsState.todoLists]);

	// update todo lists on localstorage
	React.useEffect(() => {
		inMemoryStorage.setTodoLists(todoListsState.todoLists);
	}, [todoListsState.todoLists]);

	React.useEffect(() => {
		console.log(todosState);
	}, [todosState]);
	return <Provider value={store}>{children}</Provider>;
};

export const useStore = () => React.useContext(todoStoreContext);
export default useStore;
