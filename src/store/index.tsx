import * as React from 'react';

import * as action from './actions';
import * as actionType from './actionTypes';
import reducer from './reducer';

const storeInitalState: StoreState = {
	todoLists: [],
	currentList: undefined,
	currentTodos: [],
	user: undefined,
};

const todoStoreContext = React.createContext<StoreContext>(undefined!);

const { Provider }: { Provider: React.Provider<StoreContext> } =
	todoStoreContext;

const TodoStoreProvider: React.FC = ({ children }) => {
	const [storeState, dispatch] = React.useReducer(reducer, storeInitalState);

	return <Provider value={{ storeState, dispatch }}>{children}</Provider>;
};

const useStore = () => React.useContext(todoStoreContext);

export { action, actionType, TodoStoreProvider, useStore };
export default useStore;
