/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me {
  __typename: "User";
  id: string;
  email: string | null;
  image: string | null;
  name: string | null;
}

export interface Me {
  me: Me_me | null;
}
