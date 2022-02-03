/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyTodoLists
// ====================================================

export interface MyTodoLists_myTodoLists {
  __typename: "TodoList";
  id: string;
  title: string;
  userId: string;
}

export interface MyTodoLists {
  myTodoLists: MyTodoLists_myTodoLists[] | null;
}
