import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import {
  depositCash,
  withdrawCash,
  fetchMiniStatement,
  fetchTransactionsWithDateRanges,
} from 'src/services/transactions';
import { bclClient } from 'src/services/bcl';
import {
  DepositCashInput,
  WithdrawCashInput,
  FetchMiniStatementFilters,
  FetchMiniStatementWithDateRangesFilters,
} from 'src/common/interfaces';
import dayjs from 'dayjs';

// Mock dependencies
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));
jest.mock('src/services/bcl');
jest.mock('src/loggers/logger');
jest.mock('src/services/users');

describe('Transaction Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('depositCash', () => {
    const mockDepositData: DepositCashInput = {
      transactionReference: 'REF123',
      extTranID: 'EXT123',
      accountNumber: 'ACC123',
      transactionDate: '2026-01-01',
      amount: '1000',
      narration: 'Test Deposit',
    };

    test('should return success response when BCL returns success status', async () => {
      const mockResponse = {
        Status: [
          { statusCode: '0', statusMessage: 'Success', erpReffID: 'ERP123' },
        ],
      };
      (bclClient.post as jest.Mock<any>).mockResolvedValue(mockResponse);

      const result = await depositCash(mockDepositData);

      expect(result).toEqual({ erpReffID: 'ERP123' });
      expect(bclClient.post).toHaveBeenCalledWith(
        '/api/partner/depositcicash_bcl',
        mockDepositData
      );
    });

    // Test that failure handled with logging (returning undefined) as per error handling pattern
    test('should return undefined (log only) when http error has status', async () => {
      const error = { status: 500, message: 'Server error' };
      (bclClient.post as jest.Mock<any>).mockRejectedValue(error);

      const result = await depositCash(mockDepositData);

      expect(result).toBeUndefined();
    });

    test('should throw BadRequest when BCL response has error message', async () => {
      const error = { response: { Message: 'Invalid account' } };
      (bclClient.post as jest.Mock<any>).mockRejectedValue(error);

      await expect(depositCash(mockDepositData)).rejects.toThrow(
        'Invalid account'
      );
    });
  });

  describe('withdrawCash', () => {
    const mockWithdrawData: WithdrawCashInput = {
      primaryEmail: 'test@example.com',
      mobileNumber: '1234567890',
      accountNumber: 'ACC123',
      transactionDate: '2026-01-01',
      amount: '500',
      comment: 'Test Withdraw',
    };

    test('should return success response when BCL returns success status', async () => {
      const mockResponse = {
        Status: [{ Status: '0', Description: 'Success' }],
      };
      (bclClient.post as jest.Mock<any>).mockResolvedValue(mockResponse);

      const result = await withdrawCash(mockWithdrawData);

      expect(result).toEqual({ description: 'Success' });
      expect(bclClient.post).toHaveBeenCalledWith(
        '/api/partner/addcicashwithdrawal_bcl',
        mockWithdrawData
      );
    });

    test('should throw error when http error has status', async () => {
      const error = { status: 500, message: 'Invalid account number' };
      (bclClient.post as jest.Mock<any>).mockRejectedValue(error);

      await expect(withdrawCash(mockWithdrawData)).rejects.toThrow(
        'Invalid account number'
      );
    });

    test('should throw BadRequest when BCL response has error message', async () => {
      const error = { response: { Message: 'Insufficient funds' } };
      (bclClient.post as jest.Mock<any>).mockRejectedValue(error);

      await expect(withdrawCash(mockWithdrawData)).rejects.toThrow(
        'Insufficient funds'
      );
    });
  });

  describe('fetchMiniStatement', () => {
    const mockFetchData: FetchMiniStatementFilters = {
      accountNumber: 'ACC123',
      userId: 'user1',
    };

    const mockUser = {
      email: 'test@example.com',
      phoneNumber: '1234567890',
    };

    beforeEach(() => {
      // @ts-ignore
      require('src/services/users').getUserById.mockResolvedValue(mockUser);
    });

    test('should return mapped transactions when BCL returns success', async () => {
      const mockResponse = {
        Status: [{ Status: '0', Description: 'Success' }],
        CIMiniStatementDetails: [
          {
            TranID: 123,
            TransactionType: 'DEPOSIT',
            TransactionDate: '2026-01-01',
            Instrument: 'Cash',
            CurrencyName: 'KES',
            Amount: 1000,
            Price: 1,
            Units: 1000,
            Remarks: 'Deposit',
          },
        ],
      };
      (bclClient.post as jest.Mock<any>).mockResolvedValue(mockResponse);

      const result = await fetchMiniStatement(mockFetchData);

      expect(result).toHaveLength(1);
      expect(bclClient.post).toHaveBeenCalledWith(
        '/api/partner/fetchministatement_bcl',
        {
          AccountNumber: mockFetchData.accountNumber,
          PrimaryEmail: mockUser.email,
          MobileNumber: mockUser.phoneNumber,
        }
      );
    });

    test('should throw error when http error has status', async () => {
      const error = { status: 500, message: 'Server error' };
      (bclClient.post as jest.Mock<any>).mockRejectedValue(error);

      await expect(fetchMiniStatement(mockFetchData)).rejects.toThrow(
        'Server error'
      );
    });

    test('should throw BadRequest when BCL response has error message', async () => {
      const error = { response: { Message: 'Invalid account' } };
      (bclClient.post as jest.Mock<any>).mockRejectedValue(error);

      await expect(fetchMiniStatement(mockFetchData)).rejects.toThrow(
        'Invalid account'
      );
    });
  });

  describe('fetchTransactionsWithDateRanges', () => {
    const mockFilterData: FetchMiniStatementWithDateRangesFilters = {
      accountNumber: 'ACC123',
      userId: 'user1',
      fromDate: '2026-01-01',
      toDate: '2026-01-31',
    };

    const mockUser = {
      email: 'test@example.com',
      phoneNumber: '1234567890',
    };

    beforeEach(() => {
      // @ts-ignore
      require('src/services/users').getUserById.mockResolvedValue(mockUser);
    });

    test('should return mapped transactions when BCL returns success', async () => {
      const mockResponse = {
        Status: [{ Status: '0', Description: 'Success' }],
        CIMiniStatementDetails: [
          {
            TranID: 123,
            TransactionType: 'DEPOSIT',
            TransactionDate: '2026-01-01',
            Instrument: 'Cash',
            ChequeNumber: 'CHQ123',
            BankID: 'BANK1',
            BankName: 'Test Bank',
            CurrencyName: 'KES',
            Amount: 1000,
            Price: 1,
            Units: 1000,
            Remarks: 'Deposit',
          },
        ],
      };
      (bclClient.post as jest.Mock<any>).mockResolvedValue(mockResponse);

      const result = await fetchTransactionsWithDateRanges(mockFilterData);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 123,
        transactionType: 'DEPOSIT',
        transactionDate: dayjs('2026-01-01').toISOString(),
        instrument: 'Cash',
        chequeNumber: 'CHQ123',
        bankId: 'BANK1',
        bankName: 'Test Bank',
        currencyName: 'KES',
        amount: 1000,
        price: 1,
        units: 1000,
        remarks: 'Deposit',
      });
      expect(bclClient.post).toHaveBeenCalledWith(
        '/api/partner/fetchciaccountStatement_bcl',
        {
          AccountNumber: mockFilterData.accountNumber,
          PrimaryEmail: mockUser.email,
          MobileNumber: mockUser.phoneNumber,
          FromDate: mockFilterData.fromDate,
          ToDate: mockFilterData.toDate,
        }
      );
    });

    test('should throw error when http error has status', async () => {
      const error = { status: 500, message: 'Server error' };
      (bclClient.post as jest.Mock<any>).mockRejectedValue(error);

      await expect(
        fetchTransactionsWithDateRanges(mockFilterData)
      ).rejects.toThrow('Server error');
    });

    test('should throw BadRequest when BCL response has error message', async () => {
      const error = { response: { Message: 'Invalid account' } };
      (bclClient.post as jest.Mock<any>).mockRejectedValue(error);

      await expect(
        fetchTransactionsWithDateRanges(mockFilterData)
      ).rejects.toThrow('Invalid account');
    });
  });
});
