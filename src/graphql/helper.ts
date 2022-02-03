import { ObjectDefinitionBlock } from 'nexus/dist/blocks';

type PickType<T, K extends string> = T extends Pick<any, K> ? T[K] : any;

type CRUD<TypeName extends string> = PickType<
	NexusGenCustomOutputProperties<TypeName>,
	'crud'
>;

type Model<TypeName extends string> = PickType<
	NexusGenCustomOutputProperties<TypeName>,
	'model'
>;

export const crud = <TypeName extends string>(
	t: ObjectDefinitionBlock<TypeName>,
): CRUD<TypeName> => (t as any).crud;

export const model = <TypeName extends string>(
	t: ObjectDefinitionBlock<TypeName>,
): Model<TypeName> => (t as any).model;
