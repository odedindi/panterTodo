import { gql, useQuery, useMutation } from '@apollo/client';
import type { TodoList } from './__generated__/TodoList';
import type {
	CreateTodoList,
	CreateTodoListVariables,
} from './__generated__/CreateTodoList';
import type {
	DeleteTodoList,
	DeleteTodoListVariables,
} from './__generated__/DeleteTodoList';
import type {
	EditTodoList,
	EditTodoListVariables,
} from './__generated__/EditTodoList';
import type { MyTodoLists } from './__generated__/MyTodoLists';

const TODOLIST = gql`
	query TodoList {
		todoLists {
			id
			title
		}
	}
`;
export const useTodoList = () => useQuery<TodoList>(TODOLIST);

const MYTODOLISTS = gql`
	query MyTodoLists {
		myTodoLists {
			id
			title
			userId
		}
	}
`;
export const useMyTodoLists = () => useQuery<MyTodoLists>(MYTODOLISTS);
const CREATETODOLIST = gql`
	mutation CreateTodoList($title: String!) {
		createTodoList(title: $title) {
			id
			title
		}
	}
`;

export const useCreateTodoList = () =>
	useMutation<CreateTodoList, CreateTodoListVariables>(CREATETODOLIST, {
		refetchQueries: [TODOLIST],
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
	useMutation<DeleteTodoList, DeleteTodoListVariables>(DELETETODOLIST, {
		refetchQueries: [TODOLIST],
		onQueryUpdated: (observableQuery) => observableQuery.refetch(),
	});

const EDITTODOLIST = gql`
	mutation EditTodoList($id: String!, $title: String!) {
		editTodoListTitle(id: $id, title: $title) {
			id
			title
		}
	}
`;

export const useEditTodoList = () =>
	useMutation<EditTodoList, EditTodoListVariables>(EDITTODOLIST, {
		refetchQueries: [TODOLIST],
		onQueryUpdated: (observableQuery) => observableQuery.refetch(),
	});
