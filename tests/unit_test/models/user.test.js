const { userModels } = require('../../../src/models/index2')
const { AppError } = require('../../../src/config/error_classes')

jest.mock('../../../src/models/user.models')
jest.mock('bcrypt')

describe('Test the insertUser function', () => {
  test('It should successful', async () => {
    const insertValues = {
      name: 'test',
      email: 'test@gmail.com',
      password: '123456',
    }

    const result = await userModels.insertUser(insertValues)
    expect(result).toBeUndefined()
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.insertUser.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

    const insertValues = {
      name: 'test',
      email: 'test@gmail.com',
      password: '123456',
    }

    try {
      await await userModels.insertUser(insertValues)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  })
})
