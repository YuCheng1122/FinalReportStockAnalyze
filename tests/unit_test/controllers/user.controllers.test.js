const { userControll } = require('../../../src/controllers/index')
const { userModels } = require('../../../src/models/index2')
const bcrypt = require('bcrypt')
const { AppError } = require('../../../src/config/error_classes')

jest.mock('../../../src/models/user.models')
jest.mock('bcrypt')

describe('Test the createUser function', () => {
  test('It should successful', async () => {
    // 模擬依賴
    userModels.insertUser.mockResolvedValue()
    bcrypt.hash.mockResolvedValue('hashPassword')

    const insertValues = {
      name: 'test',
      email: 'test@gmail.com',
      password: '123456',
    }

    await expect(userControll.createUser(insertValues)).resolves.toBeUndefined()
    // 驗證是否正確使用依賴
    expect(userModels.insertUser).toHaveBeenCalledWith({
      name: 'test',
      email: 'test@gmail.com',
      password: 'hashPassword',
    })
    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10)
  }),
    test('It should throw an AppError if something wrong in Sql', async () => {
      userModels.insertUser.mockRejectedValue(new Error('Some sql error'))

      const insertValues = {
        name: 'test',
        email: 'test@gmail.com',
        password: '123456',
      }

      try {
        await userControll.createUser(insertValues);
      } catch (error) {
        console.log('error: ',error);
        expect(error).toBeInstanceOf(AppError);  // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'SqlError');
        expect(error).toHaveProperty('errorLevel', 4);
      }
    }),
    test('It should throw an AppError if something wrong in Controller', async () => {
      bcrypt.hash.mockImplementation(() => {
        throw new Error('Some controller error')
      })

      const insertValues = {
        name: 'test',
        email: 'test@gmail.com',
        password: '123456',
      }

      try {
        await userControll.createUser(insertValues);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);  // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'ControllerError');
        expect(error).toHaveProperty('errorLevel', 3);
      }
    })
})
