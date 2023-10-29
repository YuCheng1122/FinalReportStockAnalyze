const request = require('supertest')
const { app, server } = require('../../app')
const db = require('../../src/config/databaseConnect')

// 清出Server連線與DB連線
afterAll((done) => {
  if (server) {
    server.close(() => {
      db.end(() => {
        done()
      })
    })
  } else {
    db.end(() => {
      done()
    })
  }
})

describe('Test the register user', () => {
  test('It should response the status success', async () => {
    const data = {
      name: 'test',
      email: 'test@gmail.com',
      password: '123',
    }
    const result = await request(app).post('/api/user/register').send(data)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: null,
      errorMessage: null,
    })
  }),
    test('It should response the status false', async () => {
      const data = {
        name: 'test',
        email: 'test@gmail.com',
        password: '123',
      }
      const result = await request(app).post('/api/user/register').send(data)
      expect(result.statusCode).toBe(200)
      expect(result.body).toEqual({
        success: false,
        data: null,
        errorMessage: 'An error occured, Please contact relevant technoligists for assistance.',
      })
    })
})

describe('Test the login user', () => {
  test('It should response the status success', async () => {
    const data = {
      email: 'test@gmail.com',
      password: '123',
    }
    const result = await request(app).post('/api/user/login').send(data)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: {
        user_id: expect.any(Number),
        email: expect.any(String),
        token: expect.any(String),
      },
      errorMessage: null,
    })
    jwtToken = result.body.token
  }),
    test('It should response the status false cause wrong email', async () => {
      const data = {
        email: 'testtest@gmail.com',
        password: '123',
      }
      const result = await request(app).post('/api/user/login').send(data)
      expect(result.statusCode).toBe(200)
      expect(result.body).toEqual({
        success: false,
        data: null,
        errorMessage: 'Error: Email is not correct.',
      })
    }),
    test('It should response the status false cause wrong password', async () => {
      const data = {
        email: 'test@gmail.com',
        password: '12345678',
      }
      const result = await request(app).post('/api/user/login').send(data)
      expect(result.statusCode).toBe(200)
      expect(result.body).toEqual({
        success: false,
        data: null,
        errorMessage: 'Error: Password is not correct.',
      })
    })
})

describe('Test the updatepassword', () => {
  let token
  beforeAll((done) => {
    request(app)
      .post('/api/user/login')
      .send({
        email: 'test@gmail.com',
        password: '123',
      })
      .end((err, response) => {
        token = response.body.data.token // 儲存 token
        done()
      })
  })

  test('It should response the status success', async () => {
    const data = {
      password: '123456',
    }

    const result = await request(app).patch('/api/user/update/password').set('Authorization', token).send(data)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: null,
      errorMessage: null,
    })
  }),
    test('It should can login new password', async () => {
      data = {
        email: 'test@gmail.com',
        password: '123456',
      }
      const loginResult = await request(app).post('/api/user/login').send(data)
      expect(loginResult.statusCode).toBe(200)
    })
})

describe('Test the getlightup history', () => {
  let token
  let user_id
  beforeAll((done) => {
    request(app)
      .post('/api/user/login')
      .send({
        email: 'test@gmail.com',
        password: '123456',
      })
      .end((err, response) => {
        user_id = response.body.data.user_id
        token = response.body.data.token
        done()
      })
  })

  test('It should response the status success', async () => {
    const result = await request(app).get(`/api/user/lightup/history/${user_id}`).set('Authorization', token)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: expect.any(Array),
      errorMessage: null,
    })
  })
})

describe('Test the createGroup', () => {
  let token
  beforeAll((done) => {
    request(app)
      .post('/api/user/login')
      .send({
        email: 'test@gmail.com',
        password: '123456',
      })
      .end((err, response) => {
        token = response.body.data.token
        done()
      })
  })

  test('It should response the status success', async () => {
    const data = {
      stock_id_array: [1101, 1102],
      group_name: '投資組合1',
    }
    const result = await request(app).post('/api/user/createGroup').set('Authorization', token).send(data)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: null,
      errorMessage: null,
    })
  })
})

describe('Test the getGroup', () => {
  let token
  beforeAll((done) => {
    request(app)
      .post('/api/user/login')
      .send({
        email: 'test@gmail.com',
        password: '123456',
      })
      .end((err, response) => {
        token = response.body.data.token
        done()
      })
  })

  test('It should response the status success', async () => {
    const result = await request(app).get('/api/user/getGroup').set('Authorization', token)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: expect.arrayContaining([expect.any(Object)]),
      errorMessage: null,
    })
  })
})

describe('Test the updateGroup', () => {
  let token
  beforeAll((done) => {
    request(app)
      .post('/api/user/login')
      .send({
        email: 'test@gmail.com',
        password: '123456',
      })
      .end((err, response) => {
        token = response.body.data.token
        done()
      })
  })

  test('It should response the status success', async () => {
    const data = {
      old_group_name: '投資組合1',
      new_group_name: '投資組合1(已更改)',
      stock_id_array: [1108, 1109],
    }
    const result = await request(app).patch('/api/user/updateGroup').set('Authorization', token).send(data)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: null,
      errorMessage: null,
    })
  })
})

describe('Test the deleteGroup', () => {
  let token
  beforeAll((done) => {
    request(app)
      .post('/api/user/login')
      .send({
        email: 'test@gmail.com',
        password: '123456',
      })
      .end((err, response) => {
        token = response.body.data.token
        done()
      })
  })

  test('It should response the status success', async () => {
    const data = {
      group_name: '投資組合1(已更改)',
    }
    const result = await request(app).delete('/api/user/deleteGroup').set('Authorization', token).send(data)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: null,
      errorMessage: null,
    })
  })
})

describe('Test the get all industry stock', () => {
  let token
  beforeAll((done) => {
    request(app)
      .post('/api/user/login')
      .send({
        email: 'test@gmail.com',
        password: '123456',
      })
      .end((err, response) => {
        token = response.body.data.token
        done()
      })
  })

  test('It should response the status success', async () => {
    const result = await request(app).get('/api/user/all/industry/stock').set('Authorization', token)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: expect.any(Array),
      errorMessage: null,
    })
  })
})

describe('Test the change default investment combo', () => {
  let token
  beforeAll((done) => {
    request(app)
      .post('/api/user/login')
      .send({
        email: 'test@gmail.com',
        password: '123456',
      })
      .end((err, response) => {
        token = response.body.data.token
        done()
      })
  })

  test('It should response the status success', async () => {
    const data = {
      group_name: '投資組合1(已更改)',
    }
    const result = await request(app).patch('/api/user/set/default/combo').set('Authorization', token).send(data)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: null,
      errorMessage: null,
    })
  })
})
