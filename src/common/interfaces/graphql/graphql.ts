import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AccountNumber: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Byte: { input: any; output: any; }
  CountryCode: { input: any; output: any; }
  CountryName: { input: any; output: any; }
  Cuid: { input: any; output: any; }
  Currency: { input: any; output: any; }
  DID: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  DateTimeISO: { input: any; output: any; }
  DeweyDecimal: { input: any; output: any; }
  Duration: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  GUID: { input: any; output: any; }
  GeoJSON: { input: any; output: any; }
  HSL: { input: any; output: any; }
  HSLA: { input: any; output: any; }
  HexColorCode: { input: any; output: any; }
  Hexadecimal: { input: any; output: any; }
  IBAN: { input: any; output: any; }
  IP: { input: any; output: any; }
  IPCPatent: { input: any; output: any; }
  IPv4: { input: any; output: any; }
  IPv6: { input: any; output: any; }
  ISBN: { input: any; output: any; }
  ISO8601Duration: { input: any; output: any; }
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  JWT: { input: any; output: any; }
  LCCSubclass: { input: any; output: any; }
  Latitude: { input: any; output: any; }
  LocalDate: { input: any; output: any; }
  LocalDateTime: { input: any; output: any; }
  LocalEndTime: { input: any; output: any; }
  LocalTime: { input: any; output: any; }
  Locale: { input: any; output: any; }
  Long: { input: any; output: any; }
  Longitude: { input: any; output: any; }
  MAC: { input: any; output: any; }
  NegativeFloat: { input: any; output: any; }
  NegativeInt: { input: any; output: any; }
  NonEmptyString: { input: any; output: any; }
  NonNegativeFloat: { input: any; output: any; }
  NonNegativeInt: { input: any; output: any; }
  NonPositiveFloat: { input: any; output: any; }
  NonPositiveInt: { input: any; output: any; }
  ObjectID: { input: any; output: any; }
  PhoneNumber: { input: any; output: any; }
  Port: { input: any; output: any; }
  PositiveFloat: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
  PostalCode: { input: any; output: any; }
  RGB: { input: any; output: any; }
  RGBA: { input: any; output: any; }
  RoutingNumber: { input: any; output: any; }
  SESSN: { input: any; output: any; }
  SafeInt: { input: any; output: any; }
  SemVer: { input: any; output: any; }
  Time: { input: any; output: any; }
  TimeZone: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
  URL: { input: any; output: any; }
  USCurrency: { input: any; output: any; }
  UUID: { input: any; output: any; }
  UnsignedFloat: { input: any; output: any; }
  UnsignedInt: { input: any; output: any; }
  UtcOffset: { input: any; output: any; }
  Void: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  accountName: Scalars['String']['output'];
  accountNumber: Scalars['ID']['output'];
  balance?: Maybe<Scalars['Float']['output']>;
  currencyCode?: Maybe<Scalars['String']['output']>;
  nav?: Maybe<Scalars['Float']['output']>;
  portfolioId: Scalars['String']['output'];
  portfolioName?: Maybe<Scalars['String']['output']>;
};

export type AmortizationScheduleItem = {
  __typename?: 'AmortizationScheduleItem';
  balance: Scalars['Float']['output'];
  interestPayment: Scalars['Float']['output'];
  payment: Scalars['Float']['output'];
  paymentNumber: Scalars['Int']['output'];
  principalPayment: Scalars['Float']['output'];
};

export type Bank = {
  __typename?: 'Bank';
  bankCode?: Maybe<Scalars['String']['output']>;
  bankId?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
};

export type BanksFilters = {
  BankId?: InputMaybe<Scalars['String']['input']>;
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  response?: Maybe<Scalars['String']['output']>;
};

export type CountriesFilters = {
  CountryId?: InputMaybe<Scalars['String']['input']>;
};

export type Country = {
  __typename?: 'Country';
  countryCode?: Maybe<Scalars['String']['output']>;
  countryName?: Maybe<Scalars['String']['output']>;
};

export type CreateAccountInput = {
  accountName: Scalars['String']['input'];
  currencyCode: Scalars['String']['input'];
  portfolioId: Scalars['String']['input'];
};

export type CreateFundInput = {
  assetClass: Scalars['String']['input'];
  baseCurrency: Scalars['String']['input'];
  description: Scalars['String']['input'];
  inceptionDate: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  objective: Scalars['String']['input'];
  symbol: Scalars['String']['input'];
};

export type CreateFundPerformancesInput = {
  date: Scalars['DateTime']['input'];
  fundId: Scalars['ID']['input'];
  nav: Scalars['Float']['input'];
  returnPeriod: Scalars['Float']['input'];
};

export type DepositCashInput = {
  accountNumber: Scalars['String']['input'];
  amount: Scalars['String']['input'];
  extTranID: Scalars['String']['input'];
  narration: Scalars['String']['input'];
  transactionDate: Scalars['String']['input'];
  transactionReference: Scalars['String']['input'];
};

export type DepositCashSuccessResponse = {
  __typename?: 'DepositCashSuccessResponse';
  erpReffID?: Maybe<Scalars['String']['output']>;
};

export type FileType = {
  __typename?: 'FileType';
  extension?: Maybe<Scalars['String']['output']>;
  fileTypeId?: Maybe<Scalars['String']['output']>;
  fileTypeName?: Maybe<Scalars['String']['output']>;
};

export type FileTypesFilters = {
  FileTypeId?: InputMaybe<Scalars['String']['input']>;
};

export type Fund = {
  __typename?: 'Fund';
  assetClass: Scalars['String']['output'];
  baseCurrency: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inceptionDate?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  objective?: Maybe<Scalars['String']['output']>;
  symbol: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FundPerformance = {
  __typename?: 'FundPerformance';
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['String']['output'];
  fundId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  nav: Scalars['Float']['output'];
  returnPeriod: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FundPerformanceConnection = {
  __typename?: 'FundPerformanceConnection';
  edges: Array<FundPerformance>;
  pageInfo: PageInfo;
};

export type FundsConnection = {
  __typename?: 'FundsConnection';
  edges: Array<Fund>;
  pageInfo: PageInfo;
};

export enum Gender {
  F = 'F',
  M = 'M'
}

export type GetFundsFilters = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type InvestmentGrowthInput = {
  compoundFrequency?: InputMaybe<Scalars['String']['input']>;
  initialAmount: Scalars['Float']['input'];
  monthlyContribution: Scalars['Float']['input'];
  rate: Scalars['Float']['input'];
  term: Scalars['Int']['input'];
};

export type InvestmentGrowthResult = {
  __typename?: 'InvestmentGrowthResult';
  futureValue: Scalars['Float']['output'];
  schedule: Array<InvestmentGrowthScheduleItem>;
  totalContributions: Scalars['Float']['output'];
  totalInterest: Scalars['Float']['output'];
};

export type InvestmentGrowthScheduleItem = {
  __typename?: 'InvestmentGrowthScheduleItem';
  balance: Scalars['Float']['output'];
  contribution: Scalars['Float']['output'];
  interest: Scalars['Float']['output'];
  year: Scalars['Int']['output'];
};

export type KycRecords = {
  __typename?: 'KycRecords';
  VATNumber?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  currencyCode?: Maybe<Scalars['String']['output']>;
  idNumber?: Maybe<Scalars['String']['output']>;
  imgBankProofString?: Maybe<Scalars['String']['output']>;
  imgIDString?: Maybe<Scalars['String']['output']>;
  imgPINString?: Maybe<Scalars['String']['output']>;
  imgPhotoString?: Maybe<Scalars['String']['output']>;
  imgSignatureString?: Maybe<Scalars['String']['output']>;
  maritalStatus?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  nationalityCountryCode?: Maybe<Scalars['String']['output']>;
  nextOfKin?: Maybe<Scalars['String']['output']>;
  occupation?: Maybe<Scalars['String']['output']>;
  passportNumber?: Maybe<Scalars['String']['output']>;
  physicalAddress?: Maybe<Scalars['String']['output']>;
  pinNumber?: Maybe<Scalars['String']['output']>;
  postalAddress?: Maybe<Scalars['String']['output']>;
  residencyCountryCode?: Maybe<Scalars['String']['output']>;
  residencyStatus?: Maybe<Scalars['String']['output']>;
  secondaryEmail?: Maybe<Scalars['String']['output']>;
  sourceOfFunds?: Maybe<Scalars['String']['output']>;
  spouseName?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  workPermit?: Maybe<Scalars['String']['output']>;
};

export enum KycStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  SUBMITTED = 'SUBMITTED'
}

export type LoanAmortizationInput = {
  principal: Scalars['Float']['input'];
  rate: Scalars['Float']['input'];
  term: Scalars['Int']['input'];
  termType?: InputMaybe<Scalars['String']['input']>;
};

export type LoanAmortizationResult = {
  __typename?: 'LoanAmortizationResult';
  monthlyPayment: Scalars['Float']['output'];
  schedule: Array<AmortizationScheduleItem>;
  totalInterest: Scalars['Float']['output'];
  totalPayment: Scalars['Float']['output'];
};

export type MarketNews = {
  __typename?: 'MarketNews';
  author: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  publishedAt: Scalars['String']['output'];
  source: Scalars['String']['output'];
  summary?: Maybe<Scalars['String']['output']>;
  tag: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type MarketNewsConnection = {
  __typename?: 'MarketNewsConnection';
  edges: Array<MarketNews>;
  pageInfo: PageInfo;
};

export type MarketNewsFilters = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  createAccount: Account;
  createFund: Fund;
  createFundPerformances: FundPerformance;
  deleteFund: Scalars['Boolean']['output'];
  depositCash: DepositCashSuccessResponse;
  forgetPassword: AuthResponse;
  generateResponse?: Maybe<ChatResponse>;
  logout: AuthResponse;
  refreshToken: RefreshTokenResponse;
  resendOtp: AuthResponse;
  resetUserPassword: AuthResponse;
  signin: AuthResponse;
  signup: AuthResponse;
  updateFund: Fund;
  updateFundPerformances: FundPerformance;
  updateKyc: User;
  updateUser: User;
  verifyOtpAndCompleteAuth: Authenticated;
  withdrawCash: WithdrawalSuccessResponse;
};


export type MutationCreateAccountArgs = {
  data: CreateAccountInput;
};


export type MutationCreateFundArgs = {
  data: CreateFundInput;
};


export type MutationCreateFundPerformancesArgs = {
  data: CreateFundPerformancesInput;
};


export type MutationDeleteFundArgs = {
  fundId: Scalars['ID']['input'];
};


export type MutationDepositCashArgs = {
  data: DepositCashInput;
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationGenerateResponseArgs = {
  prompt: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationResendOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetUserPasswordArgs = {
  newPassword: Scalars['String']['input'];
};


export type MutationSigninArgs = {
  data: SigninInput;
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationUpdateFundArgs = {
  data: UpdateFundInput;
};


export type MutationUpdateFundPerformancesArgs = {
  data: UpdateFundPerformancesInput;
};


export type MutationUpdateKycArgs = {
  data: UpdateKycInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationVerifyOtpAndCompleteAuthArgs = {
  otp: Scalars['String']['input'];
};


export type MutationWithdrawCashArgs = {
  data: WithdrawCashInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PerformanceFilters = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  fundId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Portfolio = {
  __typename?: 'Portfolio';
  offerPrice: Scalars['Float']['output'];
  portfolioId: Scalars['ID']['output'];
  portfolioName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  calculateInvestmentGrowth: InvestmentGrowthResult;
  calculateLoanAmortization: LoanAmortizationResult;
  getAccount?: Maybe<Account>;
  getBanks: Array<Maybe<Bank>>;
  getCountries: Array<Maybe<Country>>;
  getFileTypes: Array<Maybe<FileType>>;
  getFundById: Fund;
  getFundPerformanceById: FundPerformance;
  getFundPerformances: FundPerformanceConnection;
  getFunds: FundsConnection;
  getMarketNews: MarketNewsConnection;
  getMarketNewsById?: Maybe<MarketNews>;
  getMyAccounts: Array<Account>;
  getMyAccountsWithNav: Array<Account>;
  getPortfolioById?: Maybe<Portfolio>;
  getPortfolios: Array<Portfolio>;
  getTransactionById: Transaction;
  getTransactions: Array<Maybe<Transaction>>;
  getTransactionsWithDateRanges: Array<Maybe<Transaction>>;
  getUserById: User;
  healthCheck: Scalars['String']['output'];
  hello: Scalars['String']['output'];
  me: User;
};


export type QueryCalculateInvestmentGrowthArgs = {
  data: InvestmentGrowthInput;
};


export type QueryCalculateLoanAmortizationArgs = {
  data: LoanAmortizationInput;
};


export type QueryGetAccountArgs = {
  accountNumber: Scalars['String']['input'];
};


export type QueryGetBanksArgs = {
  filters?: InputMaybe<BanksFilters>;
};


export type QueryGetCountriesArgs = {
  filters?: InputMaybe<CountriesFilters>;
};


export type QueryGetFileTypesArgs = {
  filters?: InputMaybe<FileTypesFilters>;
};


export type QueryGetFundByIdArgs = {
  fundId: Scalars['ID']['input'];
};


export type QueryGetFundPerformanceByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFundPerformancesArgs = {
  filters?: InputMaybe<PerformanceFilters>;
};


export type QueryGetFundsArgs = {
  filters: GetFundsFilters;
};


export type QueryGetMarketNewsArgs = {
  filters: MarketNewsFilters;
};


export type QueryGetMarketNewsByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPortfolioByIdArgs = {
  portfolioId: Scalars['ID']['input'];
};


export type QueryGetTransactionByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTransactionsArgs = {
  filters: TransactionFilters;
};


export type QueryGetTransactionsWithDateRangesArgs = {
  filters: TransactionsWithDateRangesFilters;
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['ID']['input'];
};

export type Relation = {
  __typename?: 'Relation';
  beneficiaryPercentage?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  idNumber?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  relationshipId: Scalars['String']['output'];
};

export type RelationInput = {
  beneficiaryPercentage: Scalars['String']['input'];
  dob: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  idNumber: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  relationshipId: Scalars['String']['input'];
};

export enum Role {
  ADMIN = 'ADMIN',
  ADVISOR = 'ADVISOR',
  CLIENT = 'CLIENT'
}

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']['output']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount?: Maybe<Scalars['Float']['output']>;
  bankId?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  chequeNumber?: Maybe<Scalars['String']['output']>;
  currencyName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instrument?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  transactionDate: Scalars['DateTime']['output'];
  transactionType: Scalars['String']['output'];
  units?: Maybe<Scalars['Float']['output']>;
};

export type TransactionFilters = {
  accountNumber: Scalars['String']['input'];
};

export type TransactionsWithDateRangesFilters = {
  accountNumber: Scalars['String']['input'];
  fromDate: Scalars['String']['input'];
  toDate: Scalars['String']['input'];
};

export type UpdateFundInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  fundId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  objective?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFundPerformancesInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  nav?: InputMaybe<Scalars['Float']['input']>;
  performanceId: Scalars['ID']['input'];
  returnPeriod?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateKycInput = {
  currencyCode: Scalars['String']['input'];
  idNumber: Scalars['String']['input'];
  maritalStatus?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  nationalityCountryCode: Scalars['String']['input'];
  nextOfKin: Scalars['String']['input'];
  occupation: Scalars['String']['input'];
  passportNumber?: InputMaybe<Scalars['String']['input']>;
  physicalAddress: Scalars['String']['input'];
  pinNumber?: InputMaybe<Scalars['String']['input']>;
  postalAddress: Scalars['String']['input'];
  relations?: InputMaybe<Array<RelationInput>>;
  residencyCountryCode: Scalars['String']['input'];
  residencyStatus: Scalars['String']['input'];
  sourceOfFunds: Scalars['String']['input'];
  spouseName?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  kycStatus?: InputMaybe<KycStatus>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  accountNumbers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateOfBirth: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  identityId?: Maybe<Scalars['String']['output']>;
  kycRecords?: Maybe<KycRecords>;
  kycStatus: KycStatus;
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  relations?: Maybe<Array<Maybe<Relation>>>;
  role?: Maybe<Role>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WithdrawCashInput = {
  accountNumber: Scalars['String']['input'];
  amount: Scalars['String']['input'];
  comment: Scalars['String']['input'];
  mobileNumber: Scalars['String']['input'];
  primaryEmail: Scalars['String']['input'];
  transactionDate: Scalars['String']['input'];
};

export type WithdrawalSuccessResponse = {
  __typename?: 'WithdrawalSuccessResponse';
  Description?: Maybe<Scalars['String']['output']>;
};

export type AuthResponse = {
  __typename?: 'authResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export type Authenticated = {
  __typename?: 'authenticated';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type RefreshTokenResponse = {
  __typename?: 'refreshTokenResponse';
  accessToken: Scalars['String']['output'];
};

export type SigninInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignupInput = {
  dateOfBirth: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Gender;
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  AccountNumber: ResolverTypeWrapper<Scalars['AccountNumber']['output']>;
  AmortizationScheduleItem: ResolverTypeWrapper<AmortizationScheduleItem>;
  Bank: ResolverTypeWrapper<Bank>;
  BanksFilters: BanksFilters;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']['output']>;
  ChatResponse: ResolverTypeWrapper<ChatResponse>;
  CountriesFilters: CountriesFilters;
  Country: ResolverTypeWrapper<Country>;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']['output']>;
  CountryName: ResolverTypeWrapper<Scalars['CountryName']['output']>;
  CreateAccountInput: CreateAccountInput;
  CreateFundInput: CreateFundInput;
  CreateFundPerformancesInput: CreateFundPerformancesInput;
  Cuid: ResolverTypeWrapper<Scalars['Cuid']['output']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']['output']>;
  DID: ResolverTypeWrapper<Scalars['DID']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']['output']>;
  DepositCashInput: DepositCashInput;
  DepositCashSuccessResponse: ResolverTypeWrapper<DepositCashSuccessResponse>;
  DeweyDecimal: ResolverTypeWrapper<Scalars['DeweyDecimal']['output']>;
  Duration: ResolverTypeWrapper<Scalars['Duration']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  FileType: ResolverTypeWrapper<FileType>;
  FileTypesFilters: FileTypesFilters;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Fund: ResolverTypeWrapper<Fund>;
  FundPerformance: ResolverTypeWrapper<FundPerformance>;
  FundPerformanceConnection: ResolverTypeWrapper<FundPerformanceConnection>;
  FundsConnection: ResolverTypeWrapper<FundsConnection>;
  GUID: ResolverTypeWrapper<Scalars['GUID']['output']>;
  Gender: Gender;
  GeoJSON: ResolverTypeWrapper<Scalars['GeoJSON']['output']>;
  GetFundsFilters: GetFundsFilters;
  HSL: ResolverTypeWrapper<Scalars['HSL']['output']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']['output']>;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']['output']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']['output']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  IP: ResolverTypeWrapper<Scalars['IP']['output']>;
  IPCPatent: ResolverTypeWrapper<Scalars['IPCPatent']['output']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']['output']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']['output']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']['output']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InvestmentGrowthInput: InvestmentGrowthInput;
  InvestmentGrowthResult: ResolverTypeWrapper<InvestmentGrowthResult>;
  InvestmentGrowthScheduleItem: ResolverTypeWrapper<InvestmentGrowthScheduleItem>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']['output']>;
  KycRecords: ResolverTypeWrapper<KycRecords>;
  KycStatus: KycStatus;
  LCCSubclass: ResolverTypeWrapper<Scalars['LCCSubclass']['output']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']['output']>;
  LoanAmortizationInput: LoanAmortizationInput;
  LoanAmortizationResult: ResolverTypeWrapper<LoanAmortizationResult>;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']['output']>;
  LocalDateTime: ResolverTypeWrapper<Scalars['LocalDateTime']['output']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']['output']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']['output']>;
  Locale: ResolverTypeWrapper<Scalars['Locale']['output']>;
  Long: ResolverTypeWrapper<Scalars['Long']['output']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']['output']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']['output']>;
  MarketNews: ResolverTypeWrapper<MarketNews>;
  MarketNewsConnection: ResolverTypeWrapper<MarketNewsConnection>;
  MarketNewsFilters: MarketNewsFilters;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']['output']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']['output']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']['output']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']['output']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']['output']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']['output']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']['output']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PerformanceFilters: PerformanceFilters;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']['output']>;
  Port: ResolverTypeWrapper<Scalars['Port']['output']>;
  Portfolio: ResolverTypeWrapper<Portfolio>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']['output']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']['output']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']['output']>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RGB: ResolverTypeWrapper<Scalars['RGB']['output']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']['output']>;
  Relation: ResolverTypeWrapper<Relation>;
  RelationInput: RelationInput;
  Role: Role;
  RoutingNumber: ResolverTypeWrapper<Scalars['RoutingNumber']['output']>;
  SESSN: ResolverTypeWrapper<Scalars['SESSN']['output']>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']['output']>;
  SemVer: ResolverTypeWrapper<Scalars['SemVer']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  TimeZone: ResolverTypeWrapper<Scalars['TimeZone']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionFilters: TransactionFilters;
  TransactionsWithDateRangesFilters: TransactionsWithDateRangesFilters;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']['output']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']['output']>;
  UpdateFundInput: UpdateFundInput;
  UpdateFundPerformancesInput: UpdateFundPerformancesInput;
  UpdateKycInput: UpdateKycInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']['output']>;
  Void: ResolverTypeWrapper<Scalars['Void']['output']>;
  WithdrawCashInput: WithdrawCashInput;
  WithdrawalSuccessResponse: ResolverTypeWrapper<WithdrawalSuccessResponse>;
  authResponse: ResolverTypeWrapper<AuthResponse>;
  authenticated: ResolverTypeWrapper<Authenticated>;
  refreshTokenResponse: ResolverTypeWrapper<RefreshTokenResponse>;
  signinInput: SigninInput;
  signupInput: SignupInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AccountNumber: Scalars['AccountNumber']['output'];
  AmortizationScheduleItem: AmortizationScheduleItem;
  Bank: Bank;
  BanksFilters: BanksFilters;
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  Byte: Scalars['Byte']['output'];
  ChatResponse: ChatResponse;
  CountriesFilters: CountriesFilters;
  Country: Country;
  CountryCode: Scalars['CountryCode']['output'];
  CountryName: Scalars['CountryName']['output'];
  CreateAccountInput: CreateAccountInput;
  CreateFundInput: CreateFundInput;
  CreateFundPerformancesInput: CreateFundPerformancesInput;
  Cuid: Scalars['Cuid']['output'];
  Currency: Scalars['Currency']['output'];
  DID: Scalars['DID']['output'];
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  DateTimeISO: Scalars['DateTimeISO']['output'];
  DepositCashInput: DepositCashInput;
  DepositCashSuccessResponse: DepositCashSuccessResponse;
  DeweyDecimal: Scalars['DeweyDecimal']['output'];
  Duration: Scalars['Duration']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  FileType: FileType;
  FileTypesFilters: FileTypesFilters;
  Float: Scalars['Float']['output'];
  Fund: Fund;
  FundPerformance: FundPerformance;
  FundPerformanceConnection: FundPerformanceConnection;
  FundsConnection: FundsConnection;
  GUID: Scalars['GUID']['output'];
  GeoJSON: Scalars['GeoJSON']['output'];
  GetFundsFilters: GetFundsFilters;
  HSL: Scalars['HSL']['output'];
  HSLA: Scalars['HSLA']['output'];
  HexColorCode: Scalars['HexColorCode']['output'];
  Hexadecimal: Scalars['Hexadecimal']['output'];
  IBAN: Scalars['IBAN']['output'];
  ID: Scalars['ID']['output'];
  IP: Scalars['IP']['output'];
  IPCPatent: Scalars['IPCPatent']['output'];
  IPv4: Scalars['IPv4']['output'];
  IPv6: Scalars['IPv6']['output'];
  ISBN: Scalars['ISBN']['output'];
  ISO8601Duration: Scalars['ISO8601Duration']['output'];
  Int: Scalars['Int']['output'];
  InvestmentGrowthInput: InvestmentGrowthInput;
  InvestmentGrowthResult: InvestmentGrowthResult;
  InvestmentGrowthScheduleItem: InvestmentGrowthScheduleItem;
  JSON: Scalars['JSON']['output'];
  JSONObject: Scalars['JSONObject']['output'];
  JWT: Scalars['JWT']['output'];
  KycRecords: KycRecords;
  LCCSubclass: Scalars['LCCSubclass']['output'];
  Latitude: Scalars['Latitude']['output'];
  LoanAmortizationInput: LoanAmortizationInput;
  LoanAmortizationResult: LoanAmortizationResult;
  LocalDate: Scalars['LocalDate']['output'];
  LocalDateTime: Scalars['LocalDateTime']['output'];
  LocalEndTime: Scalars['LocalEndTime']['output'];
  LocalTime: Scalars['LocalTime']['output'];
  Locale: Scalars['Locale']['output'];
  Long: Scalars['Long']['output'];
  Longitude: Scalars['Longitude']['output'];
  MAC: Scalars['MAC']['output'];
  MarketNews: MarketNews;
  MarketNewsConnection: MarketNewsConnection;
  MarketNewsFilters: MarketNewsFilters;
  Mutation: Record<PropertyKey, never>;
  NegativeFloat: Scalars['NegativeFloat']['output'];
  NegativeInt: Scalars['NegativeInt']['output'];
  NonEmptyString: Scalars['NonEmptyString']['output'];
  NonNegativeFloat: Scalars['NonNegativeFloat']['output'];
  NonNegativeInt: Scalars['NonNegativeInt']['output'];
  NonPositiveFloat: Scalars['NonPositiveFloat']['output'];
  NonPositiveInt: Scalars['NonPositiveInt']['output'];
  ObjectID: Scalars['ObjectID']['output'];
  PageInfo: PageInfo;
  PerformanceFilters: PerformanceFilters;
  PhoneNumber: Scalars['PhoneNumber']['output'];
  Port: Scalars['Port']['output'];
  Portfolio: Portfolio;
  PositiveFloat: Scalars['PositiveFloat']['output'];
  PositiveInt: Scalars['PositiveInt']['output'];
  PostalCode: Scalars['PostalCode']['output'];
  Query: Record<PropertyKey, never>;
  RGB: Scalars['RGB']['output'];
  RGBA: Scalars['RGBA']['output'];
  Relation: Relation;
  RelationInput: RelationInput;
  RoutingNumber: Scalars['RoutingNumber']['output'];
  SESSN: Scalars['SESSN']['output'];
  SafeInt: Scalars['SafeInt']['output'];
  SemVer: Scalars['SemVer']['output'];
  String: Scalars['String']['output'];
  Subscription: Record<PropertyKey, never>;
  Time: Scalars['Time']['output'];
  TimeZone: Scalars['TimeZone']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  Transaction: Transaction;
  TransactionFilters: TransactionFilters;
  TransactionsWithDateRangesFilters: TransactionsWithDateRangesFilters;
  URL: Scalars['URL']['output'];
  USCurrency: Scalars['USCurrency']['output'];
  UUID: Scalars['UUID']['output'];
  UnsignedFloat: Scalars['UnsignedFloat']['output'];
  UnsignedInt: Scalars['UnsignedInt']['output'];
  UpdateFundInput: UpdateFundInput;
  UpdateFundPerformancesInput: UpdateFundPerformancesInput;
  UpdateKycInput: UpdateKycInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UtcOffset: Scalars['UtcOffset']['output'];
  Void: Scalars['Void']['output'];
  WithdrawCashInput: WithdrawCashInput;
  WithdrawalSuccessResponse: WithdrawalSuccessResponse;
  authResponse: AuthResponse;
  authenticated: Authenticated;
  refreshTokenResponse: RefreshTokenResponse;
  signinInput: SigninInput;
  signupInput: SignupInput;
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  accountName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accountNumber?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  balance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currencyCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nav?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  portfolioId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  portfolioName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface AccountNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AccountNumber'], any> {
  name: 'AccountNumber';
}

export type AmortizationScheduleItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['AmortizationScheduleItem'] = ResolversParentTypes['AmortizationScheduleItem']> = {
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  interestPayment?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  paymentNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  principalPayment?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type BankResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bank'] = ResolversParentTypes['Bank']> = {
  bankCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bankId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bankName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export type ChatResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatResponse'] = ResolversParentTypes['ChatResponse']> = {
  response?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface CountryCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CountryCode'], any> {
  name: 'CountryCode';
}

export interface CountryNameScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CountryName'], any> {
  name: 'CountryName';
}

export interface CuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cuid'], any> {
  name: 'Cuid';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export interface DidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DateTimeIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeISO'], any> {
  name: 'DateTimeISO';
}

export type DepositCashSuccessResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DepositCashSuccessResponse'] = ResolversParentTypes['DepositCashSuccessResponse']> = {
  erpReffID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface DeweyDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DeweyDecimal'], any> {
  name: 'DeweyDecimal';
}

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type FileTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileType'] = ResolversParentTypes['FileType']> = {
  extension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileTypeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileTypeName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type FundResolvers<ContextType = any, ParentType extends ResolversParentTypes['Fund'] = ResolversParentTypes['Fund']> = {
  assetClass?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  baseCurrency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inceptionDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  objective?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
};

export type FundPerformanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundPerformance'] = ResolversParentTypes['FundPerformance']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fundId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nav?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  returnPeriod?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type FundPerformanceConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundPerformanceConnection'] = ResolversParentTypes['FundPerformanceConnection']> = {
  edges?: Resolver<Array<ResolversTypes['FundPerformance']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type FundsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FundsConnection'] = ResolversParentTypes['FundsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['Fund']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export interface GeoJsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GeoJSON'], any> {
  name: 'GeoJSON';
}

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface IpScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IP'], any> {
  name: 'IP';
}

export interface IpcPatentScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPCPatent'], any> {
  name: 'IPCPatent';
}

export interface IPv4ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv4'], any> {
  name: 'IPv4';
}

export interface IPv6ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv6'], any> {
  name: 'IPv6';
}

export interface IsbnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISBN'], any> {
  name: 'ISBN';
}

export interface Iso8601DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601Duration'], any> {
  name: 'ISO8601Duration';
}

export type InvestmentGrowthResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvestmentGrowthResult'] = ResolversParentTypes['InvestmentGrowthResult']> = {
  futureValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  schedule?: Resolver<Array<ResolversTypes['InvestmentGrowthScheduleItem']>, ParentType, ContextType>;
  totalContributions?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalInterest?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type InvestmentGrowthScheduleItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvestmentGrowthScheduleItem'] = ResolversParentTypes['InvestmentGrowthScheduleItem']> = {
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  contribution?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  interest?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export type KycRecordsResolvers<ContextType = any, ParentType extends ResolversParentTypes['KycRecords'] = ResolversParentTypes['KycRecords']> = {
  VATNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currencyCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imgBankProofString?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imgIDString?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imgPINString?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imgPhotoString?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imgSignatureString?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maritalStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  middleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nationalityCountryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextOfKin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  occupation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passportNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  physicalAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pinNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  residencyCountryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  residencyStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  secondaryEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceOfFunds?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spouseName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workPermit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface LccSubclassScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LCCSubclass'], any> {
  name: 'LCCSubclass';
}

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export type LoanAmortizationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoanAmortizationResult'] = ResolversParentTypes['LoanAmortizationResult']> = {
  monthlyPayment?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  schedule?: Resolver<Array<ResolversTypes['AmortizationScheduleItem']>, ParentType, ContextType>;
  totalInterest?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalPayment?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export interface LocalDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDate'], any> {
  name: 'LocalDate';
}

export interface LocalDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDateTime'], any> {
  name: 'LocalDateTime';
}

export interface LocalEndTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalEndTime'], any> {
  name: 'LocalEndTime';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export interface LocaleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Locale'], any> {
  name: 'Locale';
}

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export type MarketNewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarketNews'] = ResolversParentTypes['MarketNews']> = {
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  publishedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tag?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MarketNewsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarketNewsConnection'] = ResolversParentTypes['MarketNewsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['MarketNews']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'data'>>;
  createFund?: Resolver<ResolversTypes['Fund'], ParentType, ContextType, RequireFields<MutationCreateFundArgs, 'data'>>;
  createFundPerformances?: Resolver<ResolversTypes['FundPerformance'], ParentType, ContextType, RequireFields<MutationCreateFundPerformancesArgs, 'data'>>;
  deleteFund?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteFundArgs, 'fundId'>>;
  depositCash?: Resolver<ResolversTypes['DepositCashSuccessResponse'], ParentType, ContextType, RequireFields<MutationDepositCashArgs, 'data'>>;
  forgetPassword?: Resolver<ResolversTypes['authResponse'], ParentType, ContextType, RequireFields<MutationForgetPasswordArgs, 'email'>>;
  generateResponse?: Resolver<Maybe<ResolversTypes['ChatResponse']>, ParentType, ContextType, RequireFields<MutationGenerateResponseArgs, 'prompt'>>;
  logout?: Resolver<ResolversTypes['authResponse'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['refreshTokenResponse'], ParentType, ContextType, RequireFields<MutationRefreshTokenArgs, 'refreshToken'>>;
  resendOtp?: Resolver<ResolversTypes['authResponse'], ParentType, ContextType, RequireFields<MutationResendOtpArgs, 'email'>>;
  resetUserPassword?: Resolver<ResolversTypes['authResponse'], ParentType, ContextType, RequireFields<MutationResetUserPasswordArgs, 'newPassword'>>;
  signin?: Resolver<ResolversTypes['authResponse'], ParentType, ContextType, RequireFields<MutationSigninArgs, 'data'>>;
  signup?: Resolver<ResolversTypes['authResponse'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'data'>>;
  updateFund?: Resolver<ResolversTypes['Fund'], ParentType, ContextType, RequireFields<MutationUpdateFundArgs, 'data'>>;
  updateFundPerformances?: Resolver<ResolversTypes['FundPerformance'], ParentType, ContextType, RequireFields<MutationUpdateFundPerformancesArgs, 'data'>>;
  updateKyc?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateKycArgs, 'data'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>;
  verifyOtpAndCompleteAuth?: Resolver<ResolversTypes['authenticated'], ParentType, ContextType, RequireFields<MutationVerifyOtpAndCompleteAuthArgs, 'otp'>>;
  withdrawCash?: Resolver<ResolversTypes['WithdrawalSuccessResponse'], ParentType, ContextType, RequireFields<MutationWithdrawCashArgs, 'data'>>;
};

export interface NegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface NegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface NonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface NonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface PortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Port'], any> {
  name: 'Port';
}

export type PortfolioResolvers<ContextType = any, ParentType extends ResolversParentTypes['Portfolio'] = ResolversParentTypes['Portfolio']> = {
  offerPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  portfolioId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  portfolioName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  calculateInvestmentGrowth?: Resolver<ResolversTypes['InvestmentGrowthResult'], ParentType, ContextType, RequireFields<QueryCalculateInvestmentGrowthArgs, 'data'>>;
  calculateLoanAmortization?: Resolver<ResolversTypes['LoanAmortizationResult'], ParentType, ContextType, RequireFields<QueryCalculateLoanAmortizationArgs, 'data'>>;
  getAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryGetAccountArgs, 'accountNumber'>>;
  getBanks?: Resolver<Array<Maybe<ResolversTypes['Bank']>>, ParentType, ContextType, Partial<QueryGetBanksArgs>>;
  getCountries?: Resolver<Array<Maybe<ResolversTypes['Country']>>, ParentType, ContextType, Partial<QueryGetCountriesArgs>>;
  getFileTypes?: Resolver<Array<Maybe<ResolversTypes['FileType']>>, ParentType, ContextType, Partial<QueryGetFileTypesArgs>>;
  getFundById?: Resolver<ResolversTypes['Fund'], ParentType, ContextType, RequireFields<QueryGetFundByIdArgs, 'fundId'>>;
  getFundPerformanceById?: Resolver<ResolversTypes['FundPerformance'], ParentType, ContextType, RequireFields<QueryGetFundPerformanceByIdArgs, 'id'>>;
  getFundPerformances?: Resolver<ResolversTypes['FundPerformanceConnection'], ParentType, ContextType, Partial<QueryGetFundPerformancesArgs>>;
  getFunds?: Resolver<ResolversTypes['FundsConnection'], ParentType, ContextType, RequireFields<QueryGetFundsArgs, 'filters'>>;
  getMarketNews?: Resolver<ResolversTypes['MarketNewsConnection'], ParentType, ContextType, RequireFields<QueryGetMarketNewsArgs, 'filters'>>;
  getMarketNewsById?: Resolver<Maybe<ResolversTypes['MarketNews']>, ParentType, ContextType, RequireFields<QueryGetMarketNewsByIdArgs, 'id'>>;
  getMyAccounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  getMyAccountsWithNav?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  getPortfolioById?: Resolver<Maybe<ResolversTypes['Portfolio']>, ParentType, ContextType, RequireFields<QueryGetPortfolioByIdArgs, 'portfolioId'>>;
  getPortfolios?: Resolver<Array<ResolversTypes['Portfolio']>, ParentType, ContextType>;
  getTransactionById?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<QueryGetTransactionByIdArgs, 'id'>>;
  getTransactions?: Resolver<Array<Maybe<ResolversTypes['Transaction']>>, ParentType, ContextType, RequireFields<QueryGetTransactionsArgs, 'filters'>>;
  getTransactionsWithDateRanges?: Resolver<Array<Maybe<ResolversTypes['Transaction']>>, ParentType, ContextType, RequireFields<QueryGetTransactionsWithDateRangesArgs, 'filters'>>;
  getUserById?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'userId'>>;
  healthCheck?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export type RelationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Relation'] = ResolversParentTypes['Relation']> = {
  beneficiaryPercentage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  relationshipId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface RoutingNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RoutingNumber'], any> {
  name: 'RoutingNumber';
}

export interface SessnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SESSN'], any> {
  name: 'SESSN';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export interface SemVerScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SemVer'], any> {
  name: 'SemVer';
}

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _empty?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "_empty", ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimeZoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TimeZone'], any> {
  name: 'TimeZone';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bankId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bankName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chequeNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currencyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  instrument?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  remarks?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  transactionType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  units?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UnsignedFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedFloat'], any> {
  name: 'UnsignedFloat';
}

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  accountNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dateOfBirth?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  identityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kycRecords?: Resolver<Maybe<ResolversTypes['KycRecords']>, ParentType, ContextType>;
  kycStatus?: Resolver<ResolversTypes['KycStatus'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  relations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Relation']>>>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
};

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type WithdrawalSuccessResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WithdrawalSuccessResponse'] = ResolversParentTypes['WithdrawalSuccessResponse']> = {
  Description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['authResponse'] = ResolversParentTypes['authResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type AuthenticatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['authenticated'] = ResolversParentTypes['authenticated']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RefreshTokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['refreshTokenResponse'] = ResolversParentTypes['refreshTokenResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  AccountNumber?: GraphQLScalarType;
  AmortizationScheduleItem?: AmortizationScheduleItemResolvers<ContextType>;
  Bank?: BankResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Byte?: GraphQLScalarType;
  ChatResponse?: ChatResponseResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  CountryCode?: GraphQLScalarType;
  CountryName?: GraphQLScalarType;
  Cuid?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DateTimeISO?: GraphQLScalarType;
  DepositCashSuccessResponse?: DepositCashSuccessResponseResolvers<ContextType>;
  DeweyDecimal?: GraphQLScalarType;
  Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  FileType?: FileTypeResolvers<ContextType>;
  Fund?: FundResolvers<ContextType>;
  FundPerformance?: FundPerformanceResolvers<ContextType>;
  FundPerformanceConnection?: FundPerformanceConnectionResolvers<ContextType>;
  FundsConnection?: FundsConnectionResolvers<ContextType>;
  GUID?: GraphQLScalarType;
  GeoJSON?: GraphQLScalarType;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IP?: GraphQLScalarType;
  IPCPatent?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  InvestmentGrowthResult?: InvestmentGrowthResultResolvers<ContextType>;
  InvestmentGrowthScheduleItem?: InvestmentGrowthScheduleItemResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  KycRecords?: KycRecordsResolvers<ContextType>;
  LCCSubclass?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  LoanAmortizationResult?: LoanAmortizationResultResolvers<ContextType>;
  LocalDate?: GraphQLScalarType;
  LocalDateTime?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Locale?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  MarketNews?: MarketNewsResolvers<ContextType>;
  MarketNewsConnection?: MarketNewsConnectionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  PhoneNumber?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  Portfolio?: PortfolioResolvers<ContextType>;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  Relation?: RelationResolvers<ContextType>;
  RoutingNumber?: GraphQLScalarType;
  SESSN?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  SemVer?: GraphQLScalarType;
  Subscription?: SubscriptionResolvers<ContextType>;
  Time?: GraphQLScalarType;
  TimeZone?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  Transaction?: TransactionResolvers<ContextType>;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
  WithdrawalSuccessResponse?: WithdrawalSuccessResponseResolvers<ContextType>;
  authResponse?: AuthResponseResolvers<ContextType>;
  authenticated?: AuthenticatedResolvers<ContextType>;
  refreshTokenResponse?: RefreshTokenResponseResolvers<ContextType>;
};

