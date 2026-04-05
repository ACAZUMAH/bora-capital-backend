import { allow } from 'graphql-shield';

export const lookupsShield = {
  Query: {
    getBanks: allow,
    getCountries: allow,
    getFileTypes: allow,
  },
};
