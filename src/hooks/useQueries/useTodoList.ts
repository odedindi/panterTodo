import { gql, useQuery, useMutation } from '@apollo/client';
import type { TodoList } from './__generated__/TodoList';
import type { CreateTodoList } from './__generated__/CreateTodoList';
import type { DeleteTodoList } from './__generated__/DeleteTodoList';
import type { EditTodoList } from './__generated__/EditTodoList';
const TODOLIST = gql`
	query TodoList {
		todoLists {
			id
			title
		}
	}
`;
export const useTodoList = () => useQuery<TodoList>(TODOLIST);

const CREATETODOLIST = gql`
	mutation CreateTodoList($title: String!) {
		createTodoList(title: $title) {
			id
			title
		}
	}
`;

export const useCreateTodoList = () =>
	useMutation<CreateTodoList>(CREATETODOLIST, {
		refetchQueries: [TODOLIST, 'todoLists'],
		onQueryUpdated: (observableQuery) => observableQuery.refetch(),
	});

const DELETETODOLIST = gql`
	mutation DeleteTodoList($id: String!) {
		deleteTodoList(id: $id) {
			id
		}
	}
`;

export const useDeleteTodoList = () =>
	useMutation<DeleteTodoList>(DELETETODOLIST, {
		refetchQueries: [TODOLIST, 'todoLists'],
		onQueryUpdated: (observableQuery) => observableQuery.refetch(),
	});

const EDITTODOLIST = gql`
	mutation EditTodoList($id: String!, $title: String!) {
		editTodoListTitle(id: $id, title: $title) {
			id
		}
	}
`;

export const useEditTodoList = () =>
	useMutation<EditTodoList>(EDITTODOLIST, {
		refetchQueries: [TODOLIST, 'todoLists'],
		onQueryUpdated: (observableQuery) => observableQuery.refetch(),
	});
