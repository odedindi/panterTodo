import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import type { Todos } from './__generated__/Todos';
import type { CreateTodo } from './__generated__/CreateTodo';
import type { DeleteTodo } from './__generated__/DeleteTodo';
import type { EditTodo } from './__generated__/EditTodo';
import type { ToggleTodo } from './__generated__/ToggleTodo';

const TODO = gql`
	query Todos {
		todos {
			id
			title
			completed
			createdAt
			todoListId
		}
	}
`;
export const useTodos = () => useQuery<Todos>(TODO);

// ========== failed attempt using lazy query ==========
// export const useListTodos = () => useLazyQuery<any>(TODO);
// ========== failed attempt using lazy query ==========

/**
// ========== failed attempt to query by currentList ==========
    query Todos (todoListId: String!) 
		todos (todoListId:todoListId){
			...
		}
	}  	
    query Todos (todoListId: String!) {
		todos (where: {todoListId:todoListId)}{
			...
		}
	}
    // works on the playground (localhost/api/graphql), 
    // not sure why but it refuses to cooperate when using the hook.  
*/

const CREATETODO = gql`
	mutation CreateTodo($todoListId: String!, $title: String!) {
		createTodo(todoListId: $todoListId, title: $title) {
			todoListId
			title
		}
	}
`;

export const useCreateTodo = () =>
	useMutation<CreateTodo>(CREATETODO, {
		refetchQueries: [TODO],
		onQueryUpdated: (observableQuery) => observableQuery.refetch(),
	});

const DELETETODO = gql`
	mutation DeleteTodo($id: String!) {
		deleteTodo(id: $id) {
			id
		}
	}
`;

export const useDeleteTodo = () =>
	useMutation<DeleteTodo>(DELETETODO, {
		refetchQueries: [TODO],
		onQueryUpdated: (observableQuery) => observableQuery.refetch(),
	});

const EDITTODO = gql`
	mutation EditTodo($id: String!, $title: String!) {
		editTodoTitle(id: $id, title: $title) {
			id
			title
		}
	}
`;

export const useEditTodo = () =>
	useMutation<EditTodo>(EDITTODO, {
		refetchQueries: [TODO],
		onQueryUpdated: (observableQuery) => observableQuery.refetch(),
	});

const TOGGLETODO = gql`
	mutation ToggleTodo($completed: Boolean!, $id: ID!) {
		toggleTodo(completed: $completed, id: $id) {
			completed
			id
		}
	}
`;

export const useToggleTodo = () =>
	useMutation<ToggleTodo>(TOGGLETODO, {
		refetchQueries: [TODO],
		onQueryUpdated: (observableQuery) => observableQuery.refetch(),
	});
