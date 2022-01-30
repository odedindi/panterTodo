/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditTodoList
// ====================================================

export interface EditTodoList_editTodoListTitle {
  __typename: "TodoList";
  id: string;
}

export interface EditTodoList {
  editTodoListTitle: EditTodoList_editTodoListTitle;
}

export interface EditTodoListVariables {
  id: string;
  title: string;
}
