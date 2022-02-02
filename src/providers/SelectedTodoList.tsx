import * as React from 'react';

import type { MyTodoLists_myTodoLists } from 'src/hooks/useQueries/__generated__/MyTodoLists';

const initialSelectedTodoList: MyTodoLists_myTodoLists | undefined = undefined;

type SelectedTodoListContext = {
	selectedTodoList: MyTodoLists_myTodoLists | undefined;
	setSelectedTodoList: React.Dispatch<
		React.SetStateAction<MyTodoLists_myTodoLists | undefined>
	>;
};

const selectedTodoListContext = React.createContext<SelectedTodoListContext>(
	undefined!,
);

const { Provider } = selectedTodoListContext;

const SelectedTodoListProvider: React.FC = ({ children }) => {
	const [selectedTodoList, setSelectedTodoList] = React.useState<
		MyTodoLists_myTodoLists | undefined
	>(undefined);

	return (
		<Provider value={{ selectedTodoList, setSelectedTodoList }}>
			{children}
		</Provider>
	);
};

export { selectedTodoListContext, SelectedTodoListProvider };
export default SelectedTodoListProvider;
