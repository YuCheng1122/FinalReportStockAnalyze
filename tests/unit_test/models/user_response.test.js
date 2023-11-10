const { commentModels } = require('../../../src/models/index2')
const { AppError } = require('../../../src/config/error_classes')

describe('Test the createComment function', () => {
  commentModels.insertComment = jest.fn()
  test('It should successful', async () => {
  
    const insertValues = {
      name : 'test',
      email : 'test@gmail.com',
      subject : '超棒 !',
      content : '超棒網站 !'
    }

    const result = await commentModels.insertComment(insertValues)
    expect(result).toBeUndefined()

  }),
  test('It should throw an AppError if something wrong in Sql and error level = 4', async () => {
    commentModels.insertComment.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

    const insertValues = {
      name : 'test',
      email : 'test@gmail.com',
      subject : '超棒 !',
      content : '超棒網站 !'
    }

    try {
      await commentModels.insertComment(insertValues)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError) 
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  }),
  test('It should throw an AppError if something wrong in Sql and error level = 3', async () => {
    commentModels.insertComment.mockRejectedValue(new AppError(new Error('InsertComment function not insert successfully.'), 'SqlError', 'insertUser', 3))

    const insertValues = {
      name : 'test',
      email : 'test@gmail.com',
      subject : '超棒 !',
      content : '超棒網站 !'
    }

    try {
      await commentModels.insertComment(insertValues)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError) 
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 3)
    }
  })
})
