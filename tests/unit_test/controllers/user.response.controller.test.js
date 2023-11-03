const { userResponseController } = require('../../../src/controllers/index')
const { commentModels } = require('../../../src/models/index2')
const { AppError } = require('../../../src/config/error_classes')

describe('Test the updatePassword function ', () => {
  test('It should successful', async () => {
    // 模擬依賴
    commentModels.insertComment.mockResolvedValue()

    const name = 'test1'
    const email = 'test1@gmail.com'
    const subject = '超棒'
    const content = '妳們網站做的超棒 !'

    const result = await userResponseController.createComment({ name, email, subject, content })
    expect(result).toBeUndefined()

    // 驗證是否正確使用依賴
    expect(commentModels.insertComment).toHaveBeenCalledWith({ name, email, subject, content })
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    commentModels.insertComment.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

    const name = 'test1'
    const email = 'test1@gmail.com'
    const subject = '超棒'
    const content = '妳們網站做的超棒 !'

    try {
      await userResponseController.createComment({ name, email, subject, content })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  }),
  test('It should throw an AppError if something wrong in Controller', async () => {
    userResponseController.createComment = jest.fn().mockImplementation(() => {
      throw new AppError(new Error('Some controller error'), 'ControllerError', 'createGroup', 3)
    })

    const name = 'test1'
    const email = 'test1@gmail.com'
    const subject = '超棒'
    const content = '妳們網站做的超棒 !'

    try {
      await userResponseController.createComment({ name, email, subject, content })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
      expect(error).toHaveProperty('source', 'ControllerError')
      expect(error).toHaveProperty('errorLevel', 3)
    }
  })
})
