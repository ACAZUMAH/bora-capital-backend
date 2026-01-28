import { getBanks } from 'src/services/transactions/banks';
import { getCountries } from 'src/services/users/countries';
import { getFileTypes } from 'src/services/uploads/fileTypes';

const banks = async () => {
  return await getBanks();
};

const countries = async () => {
  return await getCountries();
};

const fileTypes = async () => {
  return await getFileTypes();
};

export const lookupsResolvers = {
  Query: {
    getBanks: banks,
    getCountries: countries,
    getFileTypes: fileTypes,
  },
};
