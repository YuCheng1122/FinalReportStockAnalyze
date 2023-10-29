const request = require('supertest')
const { app, server } = require('../../app')
const db = require('../../src/config/databaseConnect')

//清出Server連線與DB連線
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

describe('Test the submit comment', () => {
  test('It should response the status success', async () => {
    const data = {
      name: 'test1',
      email: 'test1@gmail.com',
      subject: '超棒',
      content: '妳們網站做的超棒 !',
    }
    const result = await request(app).post('/api/user/response/create/comment').send(data)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: null,
      errorMessage: null,
    })
  })
})
