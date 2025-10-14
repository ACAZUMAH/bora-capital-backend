const hello = () => 'hello world';

const healthCheck = () => 'OK';

export const idResolver = (parent: { _id: string }) => parent._id.toString();

export const generalResolvers = {
  Query: {
    hello,
    healthCheck,
  },

  Mutation: {},

  Subscription: {},
};
