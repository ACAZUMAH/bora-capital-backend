import { describe, test, jest } from '@jest/globals';
import request from 'supertest';

// Mock uuid to prevent ESM issues
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

import { createExpressApp } from 'src/servers';

describe('Express App checks', () => {
  const app = createExpressApp();

  test('GET /health', () => {
    return request(app).get('/').expect(200);
  });
});
