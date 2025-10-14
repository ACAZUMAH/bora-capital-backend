import { describe, test } from '@jest/globals';
import { createExpressApp } from 'src/servers';
import request from 'supertest';

describe('Express App checks', () => {
  const app = createExpressApp();

  test('GET /health', () => {
    return request(app).get('/').expect(200);
  });
});
