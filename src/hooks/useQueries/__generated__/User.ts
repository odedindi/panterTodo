/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user {
  __typename: "User";
  id: string;
  email: string | null;
  image: string | null;
  name: string | null;
}

export interface User {
  user: User_user | null;
}
