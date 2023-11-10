const { createComment } = require('../../../src/controllers/user_response.controllers')
const { commentModels } = require('../../../src/models/index2')
const { AppError } = require('../../../src/config/error_classes')

describe('Test the createComment function', () => {
  test('It should successful', async () => {
    // 模擬依賴
    commentModels.insertComment = jest.fn()

    const insertValues = {
      name : 'test',
      email : 'test@gmail.com',
      subject : '超棒 !',
      content : '超棒網站 !'
    }

    const result = await createComment(insertValues)
    expect(result).toBeUndefined()

    // 驗證是否正確使用依賴
    expect(commentModels.insertComment).toHaveBeenCalledWith(insertValues)
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    commentModels.insertComment.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

    const insertValues = {
      name : 'test2',
      email : 'test@gmail.com',
      subject : '超棒 !',
      content : '超棒網站 !'
    }

    try {
      await createComment(insertValues)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  }),
  test('It should throw an AppError if something wrong in Controller', async () => {
    let createComment = jest.fn().mockImplementation(() => {
      throw new AppError(new Error('Some controller error'), 'ControllerError', 'createGroup', 3)
    })

    const insertValues = {
      name : 'test2',
      email : 'test@gmail.com',
      subject : '超棒 !',
      content : '超棒網站 !'
    }

    try {
      await createComment(insertValues)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
      expect(error).toHaveProperty('source', 'ControllerError')
      expect(error).toHaveProperty('errorLevel', 3)
    }
  })
})
