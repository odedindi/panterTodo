import { extendType, objectType, queryType } from 'nexus';

import { model } from '../helper';

export const User = objectType({
	name: 'User',
	definition(t) {
		model(t).id()!;
		model(t).email();
		model(t).image();
		model(t).name();
	},
});

export const Query = extendType({
	type: 'Query',
	definition(t) {
		t.field('me', {
			type: User,
			resolve: (_root, _args, context) => {
				if (!context.session?.user.id) return null;

				return context.prisma.user.findFirst({
					where: { id: context.session.user.id },
				});
			},
		});
	},
});
