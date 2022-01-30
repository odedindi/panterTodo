import { makeSchema, queryType } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';

import * as userTypes from './types/User';
import * as todoTypes from './types/Todo';
import * as todoListsTypes from './types/TodoList';
import { join } from 'path';

export const schema = makeSchema({
	types: [userTypes, todoTypes, todoListsTypes],
	plugins: [nexusPrisma({ experimentalCRUD: true })],
	

	contextType: {
		module: join(process.cwd(), 'src', 'graphql', 'context.ts'),
		export: 'Context',
	},
	outputs: {
		schema: true, // means schema.graphql in the root
		typegen: join(
			process.cwd(),
			'node_modules/@types/nexus-typegen-custom/index.d.ts',
		),
	},
});
