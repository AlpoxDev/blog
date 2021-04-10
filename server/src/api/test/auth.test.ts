import request from 'supertest';
import app from '../../index';

describe('Auth API TEST', () => {
  test('201 - POST /auth/register', async () => {
    const params = {
      email: 'test@test.com',
      password: 'test',
      nickname: 'test',
      isMarketing: true,
    };
    request(app)
      .post('/auth/register')
      .send(params)
      .set('Accept', 'application/json')
      .expect(201)
      .then((response) => console.log(response));
  });
});
