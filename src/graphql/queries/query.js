import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
    query Users {
        Users {
        _id
        createdAt
        dateOfBirth
        email
        firstName
        lastName
        password
        updatedAt
        userName
        }
    }
`;

export const USER_QUERY = gql`
    query User($userId: ID!) {
        User(id: $userId) {
        _id
        createdAt
        dateOfBirth
        firstName
        email
        lastName
        password
        updatedAt
        userName
        }
    }
`;