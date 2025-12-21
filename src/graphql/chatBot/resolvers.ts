import { MutationGenerateResponseArgs } from 'src/common/interfaces/graphql';
import * as service from 'src/services/chatBot';

const generateResponse = async (_: any, args: MutationGenerateResponseArgs) => {
  return service.generateResponse(args.prompt);
};

export const chatBotResolvers = {
  Mutation: {
    generateResponse,
  },
};
