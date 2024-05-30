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
            roles {
              _id
            }
            userName
            updatedAt
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

export const ROLES_QUERY = gql`
    query Roles {
        Roles {
        _id
        name
        createdAt
        updatedAt
        }
    }
`;