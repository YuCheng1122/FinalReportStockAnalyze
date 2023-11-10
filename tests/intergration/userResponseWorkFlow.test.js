const request = require('supertest')
const { app } = require('../../app')
const db = require('../../src/config/databaseConnect')

const deleteComment = () => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM comment', (error, result) => {
      if (error) {
        reject('DeleteComment have some problems.')
      } else {
        resolve()
      }
    })
  })
}

let server
beforeAll(async () => {
  await deleteComment()
  server = app.listen(0,() => {
  })
})

afterAll(async () => {
  if (server && server.close) {
    await server.close()
  }
  db.end()
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
