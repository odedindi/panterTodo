import { makeSchema, queryType } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';

import * as user from './types/User';
import * as todo from './types/Todo';
import * as todoList from './types/TodoList';
import { join } from 'path';

export const schema = makeSchema({
	types: [user, todo, todoList],
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
	shouldGenerateArtifacts: true,

});
