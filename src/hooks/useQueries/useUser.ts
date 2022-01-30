import { gql, useQuery } from '@apollo/client';
import type { User } from './__generated__/User';
const USER = gql`
	query User {
		user {
			id
			email
			image
			name
		}
	}
`;
export const useUser = () => useQuery<User>(USER);
