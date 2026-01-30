import { getBanks } from 'src/services/transactions/banks';
import { getCountries } from 'src/services/users/countries';
import { getFileTypes } from 'src/services/uploads/fileTypes';
import {
  BanksFilters,
  CountriesFilters,
  FileTypesFilters,
} from 'src/common/interfaces/graphql';

const banks = async (_: any, args: BanksFilters) => {
  return await getBanks(args);
};

const countries = async (_: any, args: CountriesFilters) => {
  return await getCountries(args);
};

const fileTypes = async (_: any, args: FileTypesFilters) => {
  return await getFileTypes(args);
};

export const lookupsResolvers = {
  Query: {
    getBanks: banks,
    getCountries: countries,
    getFileTypes: fileTypes,
  },
};
