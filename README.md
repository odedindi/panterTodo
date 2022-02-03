# starter challenge

* Can be seen live [here](https://panter-todo.vercel.app/)

_last changes_

#### After a good review, some changes were made, the app structure now make more sense.

_for example:_

- api calls were modified to be more context sentsitive, for example, useMe to fetch the current user info or useMyTodoLists to fetch the current user's todo lists.
- remove store as it was redundant, exposing needed data where needed using the useQuering or useMutation hooks directly.
- clean the code more.
- move the todo lists menu out from the navbar and have it as a heading on the user page.

## Screenshots

- Login Page

  - <img src='https://github.com/odedindi/panterTodo/blob/main/screenshots/login.png' alt='Login Page' height="600px"  />

- User Page with todo lists and todos

  - <img src='https://github.com/odedindi/panterTodo/blob/main/screenshots/todoLists.png' alt='User Page' height="600px"  />

## The challenge

- [x] A logged in user should be able to create new Todo-lists
- [x] A list should have some title and of course Todos
- [x] A todo has some title and whether it's done
- [x] users can have multiple todolists
- [x] everything should be persisted in the database
- [x] use apollo queries and mutations to fetch and update data
- [x] other users or not logged in users should not see other's todolists

### Work description

1. go throught the readme and the requirements.
2. pull repo.
3. create a postgres db running on a container.
4. install and update dependencies
   - wrong move, updating the dependencies lead to some strange bug related to nexus-plugin-prisma and @apollo/client, in short I couldnt give the schema using nexus makeSchema to the ApolloServer.
5. set up prisma and update schema with todos and todolists.
6. create a google Oaut client id and secret, set up auth login.
7. update schema with todos and todolists
8. set up providers (seo, styles etc.)
9. set up a basic store to manage data
10. build most of the app
11. migrate the store to use the queries and mutations.
12. total about 18 hours of work.
    - stagger for about 1 day (accumulative) while setting up nexus and apollo and all the graphql queries and mutations.
    - most of the difficulties was dealing with nexus and apollo.

Additional funtionality planned:

- [x] dynamic routes
- [x] memoization and caching of functions and values for app performance
- [ ] i18n
- [ ] editablity of both todos and todo lists
- [ ] filterability and typeahead search of both todos and todo lists
- [ ] nicer graphics

## Setup

This is a [nextjs](https://nextjs.org/) project with

- [next-auth](https://next-auth.js.org/) for autorization (currently uses google login)
- apollo server
- [nexus](https://nexusjs.org/) to define graphql resolvers and schema
- [prisma](https://www.prisma.io/) for database (using progress)
- [nexus-plugin-prisma](https://nexusjs.org/docs/plugins/prisma/overview) to derive graphql types from the prisma schema
- [styled-components](https://github.com/styled-components/styled-components) for styling

### getting started and important scripts

- run `docker-compose up` from the root folder to run the db
- run `yarn dev` to run it locally on [localhost:3000](http://localhost:3000)
- run `yarn check:types` to check types
- run `yarn check:lint` to check linting
- run `yarn check:all` to check both types, linting and format (using prettier)
- run `yarn check:build` to check types, linting, format and build
- run `yarn prisma:studio` to run the prisma db control panel on [localhost:5555](http://localhost:5555)
- run `yarn prisma:migrate:dev` to migrate the schema
- run `generate:types` to generate new apollo types

### Env vars

```
DATABASE_URL
AUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
```

### Database schema changes

```
model Todo {
    id         String    @id @default(cuid())
    title      String
    completed  Boolean @default(false)
    createdAt  DateTime @default(now())
    todoListId String
    todoList   TodoList @relation(fields: [todoListId], references: [id], onDelete: Cascade, onUpdate: Cascade)
}

model TodoList {
  id      String  @id @default(cuid())
  userId  String
  title   String
  todos   Todo[]
  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
}
```

### Adjust graphql api

_Todos_

```

export const Todo = objectType({
	name: 'Todo',
	definition(t) {
		t.model.id()!;
		t.model.title()!;
		t.model.completed()!;
		t.model.createdAt()!;
		t.model.todoListId()!;
	},
});

export const Query = extendType({
	type: 'Query',
	definition(t) {
		t.crud.todo();
		t.crud.todos();
	},
});

export const Mutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createTodo', {
			type: Todo,
			args: {
				title: nonNull(stringArg()),
				todoListId: nonNull(stringArg()),
			},
			resolve: async (_root, { title, todoListId }, context) =>
				await context.prisma.todo.create({
					data: {
						title,
						todoListId,
					},
				}),
		});
		t.nonNull.field('deleteTodo', {
			type: Todo,
			args: { id: nonNull(stringArg()) },
			resolve: async (_root, { id }, context) =>
				await context.prisma.todo.delete({
					where: {
						id,
					},
				}),
		});

		t.nonNull.field('editTodoTitle', {
			type: Todo,
			args: { id: nonNull(stringArg()), title: nonNull(stringArg()) },
			resolve: async (_root, { id, title }, context) => {
				try {
					const todo = await context.prisma.todo.update({
						where: { id },
						data: { title },
					});
					return todo;
				} catch (err) {
					throw new Error(`Could not find todo id: ${id}, ${err}`);
				}
			},
		});

		t.nonNull.field('toggleTodo', {
			type: Todo,
			args: {
				id: nonNull(idArg()),
				completed: nonNull(booleanArg()),
			},
			resolve: async (_root, { id, completed }, context) => {
				try {
					const todo = await context.prisma.todo.update({
						where: { id },
						data: { completed },
					});
					return todo;
				} catch (err) {
					throw new Error(`Could not find todo id: ${id}, ${err}`);
				}
			},
		});
	},
});

```

_Todo lists_

```
export const TodoList = objectType({
	name: 'TodoList',
	definition(t) {
		t.model.id()!;
		t.model.title()!;
		t.model.userId()!;
	},
});

export const Query = extendType({
	type: 'Query',
	definition(t) {
		t.crud.todoList(),
			t.list.nonNull.field('todoLists', {
				type: nonNull(TodoList),
				async resolve(_root, _args, context) {
					if (!context.session?.user.id) return null;
					return await context.prisma.todoList.findMany({
						where: { userId: context.session.user.id },
					});
				},
			});
	},
});

export const Mutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createTodoList', {
			type: TodoList,
			args: { title: nonNull(stringArg()) },
			resolve: async (_root, { title }, context) =>
				await context.prisma.todoList.create({
					data: { title, userId: context.session!.user.id },
				}),
		});

		t.nonNull.field('deleteTodoList', {
			type: TodoList,
			args: { id: nonNull(stringArg()) },
			resolve: async (_root, { id }, context) =>
				await context.prisma.todoList.delete({
					where: {
						id,
					},
				}),
		});

		t.nonNull.field('editTodoListTitle', {
			type: TodoList,
			args: { id: nonNull(stringArg()), title: nonNull(stringArg()) },
			resolve: async (_root, { id, title }, context) => {
				try {
					const todo = await context.prisma.todoList.update({
						where: { id },
						data: { title },
					});
					return todo;
				} catch (err) {
					throw new Error(`Could not find todo id: ${id}, ${err}`);
				}
			},
		});
	},
});

```

### Code examples

- store
  - utilize React's createContext, useContext, useReducer and useMemo hooks and RxJS observables
  - accessible throughout the app using a useStore hook

```
onst storeInitalState: StoreState = {
	todoLists: [],
	currentList: undefined,
	currentTodos: [],
	user: undefined,
};

const todoStoreContext = React.createContext<StoreContext>(undefined!);

const { Provider }: { Provider: React.Provider<StoreContext> } =
	todoStoreContext;

type StoreOperation = (storeState: Partial<StoreState>) => Partial<StoreState>;

const TodoStoreProvider: React.FC = ({ children }) => {
	const [storeState, dispatch] = React.useReducer(reducer, storeInitalState);

	const user = useUser().data?.user;
	const todoLists = useTodoList().data?.todoLists;
	const todos = useTodos().data?.todos;

	const destroyeSubscribtion$: Subject<boolean> = React.useMemo(
		() => new Subject(),
		[],
	);

	const user$ = React.useMemo(() => of(user), [user]);
	const todoLists$ = React.useMemo(() => of(todoLists), [todoLists]);
	const currentList$ = React.useMemo(
		() => of(storeState.currentList),
		[storeState.currentList],
	);
	const currentTodos$ = React.useMemo(() => of(todos), [todos]);

	React.useEffect(() => {
		user$.pipe(takeUntil(destroyeSubscribtion$)).subscribe((user) => {
			if (user) dispatch(action.setUser({ user }));
		});
		todoLists$.pipe(takeUntil(destroyeSubscribtion$)).subscribe((todoLists) => {
			if (todoLists) dispatch(action.setTodoLists({ todoLists }));
		});

		currentTodos$
			.pipe(
				combineLatestWith(currentList$),
				map(([todos, currentList]) =>
					todos?.filter(({ todoListId }) => todoListId === currentList),
				),
				takeUntil(destroyeSubscribtion$),
			)
			.subscribe((todos) => {
				if (todos) dispatch(action.setTodos({ todos }));
			});
		return () => {
			destroyeSubscribtion$.next(true);
			destroyeSubscribtion$.complete();
		};
	}, [currentList$, currentTodos$, destroyeSubscribtion$, todoLists$, user$]);

	return <Provider value={{ storeState, dispatch }}>{children}</Provider>;
};

const useStore = () => React.useContext(todoStoreContext);

```

- modular SEO provider
  - using next-seo and a custom extendable provider for flexibility

```
interface SEOProps {
	title?: string;
	description?: string;
	image?: string;
	url?: string;
}

const extendSEO = (options: SEOProps) => ({
	...defaultSEO,
	...options,
});


const SEOProvider: React.FC<SEOProps> = ({
	title,
	description,
	image,
	url,
}) => (
	<>
		<DefaultSeo {...extendSEO({ title, description, image, url })} />
		<Head>
			<title>{`Panter - Todo App`}</title>
			<meta charSet="utf-8" />
			<meta name="theme-color" content="#fff" />
			<meta name="viewport" content="initial-scale=1, width=device-width" />
			<meta name="description" content="Panter Todos exercise" />
			<meta name="keywords" content="Panter Todos exercise" />
			<meta name="application-name" content="Panter Todos exercise" />
			<link data-react-helmet="true" rel="icon" href="/favicon.ico" />
		</Head>
	</>
);
```

## Contributing

- If you'd like to contribute, by all means fork the repository and use a feature branch.
- Pull requests are warmly welcome.
- There are few known bugs and some unintentional behaviors.

## Links

- Project homepage: https://github.com/odedindi/panterTodo
- Repository: git@github.com:odedindi/panterTodo.git
- Issue tracker: https://github.com/odedindi/panterTodo/issues
  #### I value the care and effort to improve the security and privacy of this project!
- In case of sensitive bugs like security vulnerabilities, please contact
  odedindi@gmail.com directly instead of using issue tracker.

## Licensing

The code in this project is licensed under MIT [license](https://github.com/odedindi/panterTodo/blob/main/LICENSE).
