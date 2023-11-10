const { userModels } = require('../../../src/models/index2')
const { AppError } = require('../../../src/config/error_classes')
const db = require('../../../src/config/databaseConnect')

afterAll((done) => {
  db.end()
  done()
})

jest.mock('../../../src/models/user.models')
jest.mock('bcrypt')

describe('Test the insertUser function', () => {
  test('It should successful', async () => {
    const insertValues = {
      name: 'test2',
      email: 'test2@gmail.com',
      password: '123456',
    }
    try{
      const result = await userModels.insertUser(insertValues)
      console.log(result);
      expect(result).any(Number)
    }catch(error){
      console.log(error);
    }
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.insertUser.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

    const insertValues = {
      name: 'test',
      email: 'test@gmail.com',
      password: '123456',
    }

    try {
      await userModels.insertUser(insertValues)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  })
})

describe('Test the selectUser function', () => {
  let insertedUserId
  beforeAll(async () => {
    insertedUserId = await userModels.insertUser({ 
      name: 'test',
      email: 'test@gmail.com',
      password: '123456',
    })
  });
  test('It should successful', async () => {
    const email = 'test@gmail.com'
    // 只需判斷有無錯誤
    const result = await userModels.selectUser(email)
    expect(Array.isArray(result)).toBe(true)
  });
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.selectUser.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'selectUser', 4))

    const email = 'test@gmail.com'
    try {
      await userModels.insertUser(email)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  });
  afterAll(async() => {
    await userModels.deleteUser(insertedUserId)
  });
})

describe('Test the selectUserwithJWT function', () => {
  test('It should successful', async () => {
    const user_id = 1
    const email = 'test@gmail'
    const result = await userModels.selectUserwithJWT(user_id,email)
    expect(result).toBe(true)
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.selectUserwithJWT.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'selectUserwithJWT', 4))
    const user_id = 1
    const email = 'test@gmail'
    try {
      await userModels.selectUserwithJWT(user_id,email)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  }),
  test('It should throw an AppError if not search data', async () => {
    userModels.selectUserwithJWT.mockRejectedValue(new AppError(new Error('Not correct jwt'), 'SqlError', 'selectUserwithJWT', 3))

    const user_id = 1
    const email = 'test@gmail'

    try {
      await userModels.selectUserwithJWT(user_id,email)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 3)
      expect(error.message).toBe('Error: Not correct jwt')
    }
  })
})

describe('Test the updatePassword function', () => {
  test('It should successful', async () => {
    const user_id = 1
    const hashPassword = 'dmqpondpqhndpq[jdoqexqxq'
    const result = await userModels.updatePassword(user_id,hashPassword)
    expect(result).toBeUndefined()
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.updatePassword.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'updatePassword', 4))

    const user_id = 1
    const hashPassword = 'dmqpondpqhndpq[jdoqexqxq'
    try {
      await userModels.updatePassword(user_id,hashPassword)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  }),
  test('It should throw an AppError if no search data', async () => {
    userModels.updatePassword.mockRejectedValue(new AppError(new Error('Not search data'), 'SqlError', 'updatePassword', 3))

    const user_id = 1
    const hashPassword = 'dmqpondpqhndpq[jdoqexqxq'

    try {
      await userModels.updatePassword(user_id,hashPassword)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 3)
    }
  })
})

describe('Test the insertGroup function', () => {
  test('It should successful', async () => {
    const user_id = 1
    const group_name = '投資組合'
    const stock_id = 1101
    const result = await userModels.insertGroup(user_id,group_name,stock_id)
    expect(result).toBeUndefined()
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.insertGroup.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertGroup', 4))

    const user_id = 1
    const group_name = '投資組合'
    const stock_id = 1101
    try {
      await userModels.insertGroup(user_id,group_name,stock_id)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  })
})

describe('Test the getGroup function', () => {
  test('It should successful', async () => {
    const user_id = 1
    const result = await userModels.getGroup(user_id)
    expect(Array.isArray(result)).toBe(true)
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.insertGroup.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'getGroup', 4))

    const user_id = 1
    try {
      await userModels.getGroup(user_id)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  })
})

describe('Test the deleteGroup function', () => {
  test('It should successful', async () => {
    const user_id = 1
    const group_name = '投資組合'
    const result = await userModels.deleteGroup(user_id,group_name)
    expect(result).toBeUndefined()
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.deleteGroup.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'deleteGroup', 4))
    const user_id = 1
    const group_name = '投資組合'
    try {
      await userModels.deleteGroup(user_id,group_name)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  })
})

describe('Test the getAllIndustryStock function', () => {
  test('It should successful', async () => {
    const result = await userModels.getAllIndustryStock()
    expect(Array.isArray(result)).toBe(true)
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.getAllIndustryStock.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'getAllIndustryStock', 4))

    try {
      await userModels.getAllIndustryStock()
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  })
})

describe('Test the setDefault function', () => {
  test('It should successful', async () => {
    const user_id = 1
    const group_name = '投資組合'
    const result = await userModels.setDefault(user_id,group_name)
    expect(result).toBeUndefined()
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.setDefault.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'setDefault', 4))
    const user_id = 1
    const group_name = '投資組合'
    try {
      await userModels.setDefault(user_id,group_name)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  })
})

describe('Test the cleanDefault function', () => {
  test('It should successful', async () => {
    const user_id = 1
    
    const result = await userModels.cleanDefault(user_id,)
    expect(result).toBeUndefined()
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.cleanDefault.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'cleanDefault', 4))
    const user_id = 1
    
    try {
      await userModels.cleanDefault(user_id)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  })
})

describe('Test the getUserHistory function', () => {
  test('It should successful', async () => {
    const user_id = 1
    const result = await userModels.getUserHistory(user_id,)
    expect(Array.isArray(result)).toBe(true)
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.cleanDefault.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'getUserHistory', 4))
    const user_id = 1
    try {
      await userModels.getUserHistory(user_id)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  })
})






