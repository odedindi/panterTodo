import { useContext } from 'react';
import { selectedTodoListContext } from 'src/providers/SelectedTodoList';

export const useSelectedTodoList = () => useContext(selectedTodoListContext);
export default useSelectedTodoList;
