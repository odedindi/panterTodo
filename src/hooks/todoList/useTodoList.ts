import { Query } from './../../graphql/types/User';
import { gql, useQuery } from '@apollo/client';

const TODOLIST = gql`
	query TodoList {
		todoLists {
			id
			title
		}
	}
`;
export const useTodoList = () => useQuery<any>(TODOLIST);

