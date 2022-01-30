/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleTodo
// ====================================================

export interface ToggleTodo_toggleTodo {
  __typename: "Todo";
  completed: boolean;
  id: string;
}

export interface ToggleTodo {
  toggleTodo: ToggleTodo_toggleTodo;
}

export interface ToggleTodoVariables {
  completed: boolean;
  id: string;
}
