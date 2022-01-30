import * as React from 'react';

import * as action from './actions';
import * as actionType from './actionTypes';
import reducer from './reducer';

import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { combineLatestWith, map, tap, takeUntil } from 'rxjs/operators';

import { useUser, useTodoList, useTodos } from 'src/hooks';

const storeInitalState: StoreState = {
	todoLists: [],
	currentList: undefined,
	currentTodos: [],
	user: undefined,
};

const todoStoreContext = React.createContext<StoreContext>(undefined!);

const { Provider }: { Provider: React.Provider<StoreContext> } =
	todoStoreContext;

type StoreOperation = (storeState: Partial<StoreState>) => Partial<StoreState>;

const TodoStoreProvider: React.FC = ({ children }) => {
	const [storeState, dispatch] = React.useReducer(reducer, storeInitalState);

	const user = useUser().data?.user;
	const todoLists = useTodoList().data?.todoLists;
	const todos = useTodos().data?.todos;

	// ========== failed attempt using lazy query ==========
	// const [getCurrentTodos, { data }] = useTodos();
	// let query = true;
	// if (storeState.currentList && query) {
	// 	query = false;
	// 	console.log('currentList: ', storeState.currentList);
	// 	getCurrentTodos();
	// }
	// console.log('currentTodos:', data);
	// ========== failed attempt using lazy query ==========

	const destroyeSubscribtion$: Subject<boolean> = React.useMemo(
		() => new Subject(),
		[],
	);

	const user$ = React.useMemo(() => of(user), [user]);
	const todoLists$ = React.useMemo(() => of(todoLists), [todoLists]);
	const currentList$ = React.useMemo(
		() => of(storeState.currentList),
		[storeState.currentList],
	);
	const currentTodos$ = React.useMemo(() => of(todos), [todos]);

	React.useEffect(() => {
		user$.pipe(takeUntil(destroyeSubscribtion$)).subscribe((user) => {
			if (user) dispatch(action.setUser({ user }));
		});
		todoLists$.pipe(takeUntil(destroyeSubscribtion$)).subscribe((todoLists) => {
			if (todoLists) dispatch(action.setTodoLists({ todoLists }));
		});

		currentTodos$
			.pipe(
				combineLatestWith(currentList$),
				map(([todos, currentList]) =>
					todos?.filter(({ todoListId }) => todoListId === currentList),
				),
				takeUntil(destroyeSubscribtion$),
			)
			.subscribe((todos) => {
				if (todos) dispatch(action.setTodos({ todos }));
			});
		return () => {
			destroyeSubscribtion$.next(true);
			destroyeSubscribtion$.complete();
		};
	}, [currentList$, currentTodos$, destroyeSubscribtion$, todoLists$, user$]);

	return <Provider value={{ storeState, dispatch }}>{children}</Provider>;
};

const useStore = () => React.useContext(todoStoreContext);

export { action, actionType, TodoStoreProvider, useStore };
export default useStore;
