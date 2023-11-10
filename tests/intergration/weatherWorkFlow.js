const request = require('supertest')
const { app, server } = require('../../app')
const db = require('../../src/config/databaseConnect')

afterAll((done) => {
  if (server) {
    server.close(done)
  }
  db.end()
  done()
})

describe('Test the get predict weather data', () => {
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

  test('Test for weather status like sunny,rainny,cloudy. It should response the status success', async () => {
    const type = 'sunny'
    const stock_id = 1101
    const result = await request(app).get(`/api/weather/predict/${type}/${stock_id}`).set('Authorization', token)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual({
      success: true,
      data: {
        stock_id: expect.any(Number),
        stock_name: expect.any(String),
        stock_price: expect.any(Number),
        change: expect.any(Number),
        trade_volume: expect.any(Number),
        independent_datas: expect.arrayContaining([expect.any(Number)]),
        dependent_datas: expect.arrayContaining([expect.any(Number)])
      },
      errorMessage: null,
    })
  })
})
