/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TodoList
// ====================================================

export interface TodoList_todoLists {
  __typename: "TodoList";
  id: string;
  title: string;
}

export interface TodoList {
  todoLists: TodoList_todoLists[] | null;
}
