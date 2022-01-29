import { gql, useQuery } from '@apollo/client';

const TODOLIST = gql`
	query TodoList {
		todoList {
			id
			title
			todos
		}
	}
`;
export const useTodoList = () => useQuery<any>(TODOLIST);
