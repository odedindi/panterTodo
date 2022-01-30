import * as React from 'react';

import * as action from './actions';
import * as actionType from './actionTypes';
import reducer from './reducer';

import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, map, scan, share, tap, takeUntil } from 'rxjs/operators';

import { useMe, useTodoList } from 'src/hooks';

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
	const me = useMe().data?.me;
	const { data: todoLists } = useTodoList();
	const destroyeSubscribtion$: Subject<boolean> = React.useMemo(
		() => new Subject(),
		[],
	);

	const updateStore$ = new BehaviorSubject<StoreOperation>(
		(storeState: Partial<StoreState>) => storeState,
	);
	const user$ = React.useMemo(() => new BehaviorSubject(me), [me]);
	const todoLists$ = React.useMemo(
		() => new BehaviorSubject(todoLists),
		[todoLists],
	);
	React.useEffect(() => {
		user$.pipe(takeUntil(destroyeSubscribtion$)).subscribe((user) => {
			if (user) dispatch(action.setUser({ user }));
		});
		todoLists$
			.pipe(
				tap((tl) => console.log('tl: ', tl)),
				takeUntil(destroyeSubscribtion$),
			)
			.subscribe((todoLists) => {
				if (todoLists) dispatch(action.setTodoLists(todoLists));
			});
		return () => {
			destroyeSubscribtion$.next(true);
			destroyeSubscribtion$.complete();
		};
	}, [destroyeSubscribtion$, todoLists$, user$]);

	return <Provider value={{ storeState, dispatch }}>{children}</Provider>;
};

const useStore = () => React.useContext(todoStoreContext);

export { action, actionType, TodoStoreProvider, useStore };
export default useStore;
