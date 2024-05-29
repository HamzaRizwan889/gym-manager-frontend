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