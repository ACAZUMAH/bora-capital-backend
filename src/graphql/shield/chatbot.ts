import { isAuthenticated } from './general';

export const chatBotShield = {
  Mutation: {
    generateResponse: isAuthenticated,
  },
};
