import { gql, useQuery } from '@apollo/client';

import type { Me } from './__generated__/Me';

const ME = gql`
	query Me {
		me {
			id
			email
			image
			name
		}
	}
`;
export const useMe = () => useQuery<Me>(ME);
