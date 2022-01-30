/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditTodo
// ====================================================

export interface EditTodo_editTodoTitle {
  __typename: "Todo";
  id: string;
  title: string;
}

export interface EditTodo {
  editTodoTitle: EditTodo_editTodoTitle;
}

export interface EditTodoVariables {
  id: string;
  title: string;
}
