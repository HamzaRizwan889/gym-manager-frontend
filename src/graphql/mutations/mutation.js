import { gql } from "@apollo/client";

export const LOGIN = gql `
    mutation Mutation($email: String!, $password: String!) {
        Login(email: $email, password: $password) {
        message
        token
        user {
            _id
            createdAt
            email
            dateOfBirth
            firstName
            updatedAt
            userName
            password
            lastName
            }
        }
    }
`;

export const CREATE_USER = gql `
mutation CreateUser($input: UserInput) {
    CreateUser(input: $input) {
      _id
      createdAt
      dateOfBirth
      email
      firstName
      membership {
        _id
      }
      lastName
      password
      roles {
        _id
      }
      updatedAt
      userName
    }
  }
`;

export const UPDATE_USER = gql `
mutation UpdateUser($updateUserId: ID!, $input: UserInput) {
    UpdateUser(id: $updateUserId, input: $input) {
      _id
      dateOfBirth
      createdAt
      email
      firstName
      lastName
      membership {
        _id
      }
      password
      roles {
        _id
      }
      updatedAt
      userName
    }
  }
`;

export const DELETE_USER = gql `
    mutation Mutation($deleteUserId: ID!) {
        DeleteUser(id: $deleteUserId)
    }
`;
export const UPDATE_MEMBERSHIP = gql `
    mutation UpdateMembership($updateMembershipId: ID!, $input: MembershipInput) {
        UpdateMembership(id: $updateMembershipId, input: $input) {
        membership {
            _id
        }
        message
        success
        }
    }
`;
