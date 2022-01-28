import { mockTodos, mockTodoLists } from 'src/utils/mockTodos';

export const inMemoryStorage = {
	storageName: 'panterTodos',
	getAllTodoLists: function (): TodoList[] {
		if (typeof window !== 'undefined') {
			const data = localStorage.getItem(this.storageName);

			if (data) {
				try {
					const parsed = JSON.parse(data);
					return parsed as TodoList[];
				} catch (err) {
					console.log(err);
				}
			}
		}
		return [];
	},
	get: function (): Todo[] {
		if (typeof window !== 'undefined') {
			const data = localStorage.getItem(this.storageName);
			if (data) {
				return JSON.parse(data);
			}
		}
		return [];
	},
	setTodoLists: function (todoLists: TodoList[]) {
		typeof todoLists === 'string'
			? localStorage.setItem(this.storageName, todoLists)
			: localStorage.setItem(this.storageName, JSON.stringify(todoLists));
	},
	set: function (item: string | any): void {
		typeof item === 'string'
			? localStorage.setItem(this.storageName, item)
			: localStorage.setItem(this.storageName, JSON.stringify(item));
	},
};
