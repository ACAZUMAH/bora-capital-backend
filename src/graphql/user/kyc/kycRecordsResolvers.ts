import { MutationUpdateKycArgs } from 'src/common/interfaces/graphql';
import { updateKycRecords } from 'src/services/users/kyc';
import { GraphqlContext } from 'src/common/interfaces';

const updateKyc = (
  _: any,
  args: MutationUpdateKycArgs,
  { user }: GraphqlContext
) => {
  return updateKycRecords({ ...args.data, userId: user?._id! });
};

export const KycRecordsResolvers = {
  Mutation: {
    updateKyc,
  },
};
