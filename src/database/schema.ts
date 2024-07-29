import { gql } from 'apollo-server-express';
import { supabase } from './supabase';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String
    coin_balance: Int
  }

  type Query {
    getUsers: [User!]!
    getUserById(id: ID!): User
    getUserByUsername(username: String!): User
  }

  type Mutation {
    updateUserCoins(id: ID!, coin_balance: Int!): User
  }
`;

export const resolvers = {
  Query: {
    getUsers: async () => {
      const { data, error } = await supabase
        .from('tapkitty')
        .select('*');
      if (error) throw new Error(error.message);
      return data;
    },
    getUserById: async (_: any, { id }: { id: string }) => {
      const { data, error } = await supabase
        .from('tapkitty')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    getUserByUsername: async (_: any, { username }: { username: string }) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  },
  Mutation: {
    updateUserCoins: async (_: any, { id, coin_balance }: { id: string, coin_balance: number }) => {
      const { data, error } = await supabase
        .from('users')
        .update({ coin_balance })
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  },
};
