import { gql, useQuery, useLazyQuery } from '@apollo/client';
import type { Todos } from './__generated__/Todos';
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
export const useListTodos = () => useQuery<Todos>(TODO);

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
