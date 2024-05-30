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
    mutation Mutation($input: UserInput) {
        CreateUser(input: $input) {
        _id
        createdAt
        dateOfBirth
        email
        firstName
        lastName
        password
        roles {
            _id
            createdAt
            name
            updatedAt
        }
        updatedAt
        userName
        }
    }
`;

export const UPDATE_USER = gql `
    mutation Mutation($updateUserId: ID!, $input: UserInput) {
        UpdateUser(id: $updateUserId, input: $input) {
        _id
        createdAt
        dateOfBirth
        email
        lastName
        firstName
        password
        roles {
            _id
            createdAt
            name
            updatedAt
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
`
