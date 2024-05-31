import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
    query Users {
        Users {
        _id
        createdAt
        dateOfBirth
        email
        lastName
        firstName
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

export const USER_QUERY = gql`
    query User($userId: ID!) {
        User(id: $userId) {
        _id
        createdAt
        dateOfBirth
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

export const MEMBERSHIPS_QUERY = gql`
    query Memberships {
        Memberships {
        _id
        createdAt
        name
        price
        updatedAt
        }
    }
`