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
      userModels.insertUser.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

      const insertValues = {
        name: 'test',
        email: 'test@gmail.com',
        password: '123456',
      }

      try {
        await userControll.createUser(insertValues)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'SqlError')
        expect(error).toHaveProperty('errorLevel', 4)
      }
    }),
    test('It should throw an AppError if something wrong in Controller', async () => {
      bcrypt.hash.mockImplementation(new Error('Some controller error'))

      const insertValues = {
        name: 'test',
        email: 'test@gmail.com',
        password: '123456',
      }

      try {
        await userControll.createUser(insertValues)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'ControllerError')
        expect(error).toHaveProperty('errorLevel', 3)
      }
    })
})

describe('Test the loginUser function', () => {
  test('It should successful', async () => {
    // 模擬依賴
    userModels.selectUser.mockResolvedValue([
      {
        user_id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: '$2b$10$xxxx', // 模擬密碼
      },
    ])
    bcrypt.compare.mockResolvedValue(true)

    const insertValues = {
      email: 'test@gmail.com',
      password: '123456',
    }

    const result = await userControll.loginUser(insertValues)
    expect(result).toEqual({
      user_id: 1,
      name: 'test',
      email: 'test@gmail.com',
    })

    // 驗證是否正確使用依賴
    expect(userModels.selectUser).toHaveBeenCalledWith('test@gmail.com')
    expect(bcrypt.compare).toHaveBeenCalledWith('123456', '$2b$10$xxxx')
  }),
    test('It should throw an AppError if something wrong in Sql', async () => {
      userModels.selectUser.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

      const insertValues = {
        email: 'test@gmail.com',
        password: '123456',
      }

      try {
        await userControll.loginUser(insertValues)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'SqlError')
        expect(error).toHaveProperty('errorLevel', 4)
      }
    }),
    test('It should throw an AppError if email wrong', async () => {
      userModels.selectUser.mockRejectedValue(new AppError(new Error('Email is not correct.'), 'ControllerError', 'createUser', 1))
      const insertValues = {
        email: 'test@gmail.com',
        password: '123456',
      }

      try {
        await userControll.loginUser(insertValues)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'ControllerError')
        expect(error).toHaveProperty('errorLevel', 1)
      }
    }),
    test('It should throw an AppError if password wrong', async () => {
      bcrypt.compare.mockResolvedValue(new AppError(new Error('Password is not correct.'), 'ControllerError', 'createUser', 1))

      const insertValues = {
        email: 'test@gmail.com',
        password: '123456',
      }

      try {
        await userControll.loginUser(insertValues)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'ControllerError')
        expect(error).toHaveProperty('errorLevel', 1)
      }
    })
})

describe('Test the updatePassword function ', () => {
  test('It should successful', async () => {
    // 模擬依賴
    userModels.updatePassword.mockResolvedValue()
    bcrypt.hash.mockResolvedValue('hashPassword')

    const user_id = 1
    const insertValues = {
      password: '123456',
    }

    const result = await userControll.updatePassword(user_id, insertValues)
    expect(result).toBeUndefined()

    // 驗證是否正確使用依賴
    expect(userModels.updatePassword).toHaveBeenCalledWith(user_id, 'hashPassword')
    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10)
  }),
    test('It should throw an AppError if something wrong in Sql', async () => {
      userModels.updatePassword.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

      const user_id = 1
      const insertValues = {
        password: '123456',
      }

      try {
        await userControll.updatePassword(user_id, insertValues)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'SqlError')
        expect(error).toHaveProperty('errorLevel', 4)
      }
    }),
    test('It should throw an AppError if something wrong in Controller', async () => {
      bcrypt.hash.mockImplementation(new Error('Some controller error'))

      const user_id = 1
      const insertValues = {
        password: '123456',
      }

      try {
        await userControll.updatePassword(user_id, insertValues)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'ControllerError')
        expect(error).toHaveProperty('errorLevel', 3)
      }
    })
})

describe('Test the createGroup function', () => {
  test('It should successful', async () => {
    // 模擬依賴
    userModels.insertGroup.mockResolvedValue()

    const user_id = 1
    const group_name = '投資組合1'
    const stock_id_array = [1101, 1102, 1103]

    const result = await userControll.createGroup(user_id, group_name, stock_id_array)
    expect(result).toBeUndefined()

    // 驗證是否正確使用依賴
    expect(userModels.insertGroup).toHaveBeenCalledWith([
      [user_id, group_name, 1101],
      [user_id, group_name, 1102],
      [user_id, group_name, 1103],
    ])
  }),
    test('It should throw an AppError if something wrong in Sql', async () => {
      userModels.insertGroup.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

      const user_id = 1
      const group_name = '投資組合1'
      const stock_id_array = [1101, 1102, 1103]

      try {
        await userControll.createGroup(user_id, group_name, stock_id_array)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'SqlError')
        expect(error).toHaveProperty('errorLevel', 4)
      }
    }),
    test('It should throw an AppError if something wrong in Controller', async () => {
      userControll.createGroup = jest.fn().mockImplementation(() => {
        throw new AppError(new Error('Some controller error'), 'ControllerError', 'createGroup', 3)
      })

      const user_id = 1
      const group_name = '投資組合1'
      const stock_id_array = [1101, 1102, 1103]

      try {
        await userControll.createGroup(user_id, group_name, stock_id_array)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'ControllerError')
        expect(error).toHaveProperty('errorLevel', 3)
      }
    })
})

describe('Test the getGroup function', () => {
  test('It should successful', async () => {
    // 模擬依賴
    const mockData = [
      {
        stock_id: 1108,
        name: '幸福水泥股份有限公司',
        group_name: '投資必殺組合',
        change: '0.10',
        opening_price: '15.00',
        closing_price: '15.15',
        highest_price: '15.30',
        lowest_price: '15.00',
      },
      {
        stock_id: 1109,
        name: '信大水泥股份有限公司',
        group_name: '投資必殺組合',
        change: '0.10',
        opening_price: '18.05',
        closing_price: '18.20',
        highest_price: '18.25',
        lowest_price: '18.05',
      },
      {
        stock_id: 1110,
        name: '東南水泥股份有限公司',
        group_name: '投資必殺組合',
        change: '0.05',
        opening_price: '19.10',
        closing_price: '19.35',
        highest_price: '19.40',
        lowest_price: '19.10',
      },
    ]
    userModels.getGroup.mockResolvedValue(mockData)
    const user_id = 1
    const result = await userControll.getGroup(user_id)
    
    result[0].data.forEach((item) => {
      expect(item).toMatchObject({
        stock_id: expect.any(Number),
        name: expect.any(String),
        group_name: expect.any(String),
        change: expect.any(String),
        opening_price: expect.any(String),
        closing_price: expect.any(String),
        highest_price: expect.any(String),
        lowest_price: expect.any(String),
      })
    })
    // 驗證是否正確使用依賴
    expect(userModels.getGroup).toHaveBeenCalledWith(user_id)
  }),
    test('It should throw an AppError if something wrong in Sql', async () => {
      userModels.getGroup.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

      const user_id = 1

      try {
        await userControll.getGroup(user_id)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'SqlError')
        expect(error).toHaveProperty('errorLevel', 4)
      }
    }),
    test('It should throw an AppError if something wrong in Controller', async () => {
      userControll.getGroup = jest.fn().mockImplementation(() => {
        throw new AppError(new Error('Some controller error'), 'ControllerError', 'createGroup', 3)
      })

      const user_id = 1

      try {
        await userControll.getGroup(user_id)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'ControllerError')
        expect(error).toHaveProperty('errorLevel', 3)
      }
    })
})

describe('Test the deleteGroup function', () => {
  test('It should successful', async () => {
    // 模擬依賴
    userModels.deleteGroup.mockResolvedValue()

    const user_id = 1
    const group_name = '投資組合1'
    const result = await userControll.deleteGroup(user_id, group_name)
    expect(result).toBeUndefined()
    // 驗證是否正確使用依賴
    expect(userModels.deleteGroup).toHaveBeenCalledWith(user_id, group_name)
  }),
    test('It should throw an AppError if something wrong in Sql', async () => {
      userModels.deleteGroup.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

      const user_id = 1
      const group_name = '投資組合1'
      try {
        await userControll.deleteGroup(user_id, group_name)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'SqlError')
        expect(error).toHaveProperty('errorLevel', 4)
      }
    }),
    test('It should throw an AppError if something wrong in Controller', async () => {
      userControll.deleteGroup = jest.fn().mockImplementation(() => {
        throw new AppError(new Error('Some controller error'), 'ControllerError', 'createGroup', 3)
      })

      const user_id = 1
      const group_name = '投資組合1'
      try {
        await userControll.deleteGroup(user_id, group_name)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'ControllerError')
        expect(error).toHaveProperty('errorLevel', 3)
      }
    })
})

describe('Test the updateGroup function', () => {
  test('It should successful', async () => {
    // 模擬依賴
    userModels.deleteGroup.mockResolvedValue()
    userModels.insertGroup.mockResolvedValue()

    const user_id = 1
    const old_group_name = '投資組合1'
    const new_group_name = '投資組合2'
    const stock_id_array = [1108, 1109]

    const result = await userControll.updateGroup(user_id, old_group_name, new_group_name, stock_id_array)
    expect(result).toBeUndefined()
    // 驗證是否正確使用依賴
    expect(userModels.deleteGroup).toHaveBeenCalledWith(user_id, old_group_name)
    expect(userModels.insertGroup).toHaveBeenCalledWith([
      [user_id, new_group_name, 1108],
      [user_id, new_group_name, 1109],
    ])
  }),
    test('It should throw an AppError if something wrong in Sql', async () => {
      userModels.deleteGroup.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

      const user_id = 1
      const old_group_name = '投資組合1'
      const new_group_name = '投資組合2'
      const stock_id_array = [1108, 1109]

      try {
        await userControll.updateGroup(user_id, old_group_name, new_group_name, stock_id_array)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'SqlError')
        expect(error).toHaveProperty('errorLevel', 4)
      }
    }),
    test('It should throw an AppError if something wrong in Sql', async () => {
      userModels.insertGroup.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

      const user_id = 1
      const old_group_name = '投資組合1'
      const new_group_name = '投資組合2'
      const stock_id_array = [1108, 1109]

      try {
        await userControll.updateGroup(user_id, old_group_name, new_group_name, stock_id_array)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'SqlError')
        expect(error).toHaveProperty('errorLevel', 4)
      }
    }),
    test('It should throw an AppError if something wrong in Controller', async () => {
      userControll.updateGroup = jest.fn().mockImplementation(() => {
        throw new AppError(new Error('Some controller error'), 'ControllerError', 'createGroup', 3)
      })

      const user_id = 1
      const old_group_name = '投資組合1'
      const new_group_name = '投資組合2'
      const stock_id_array = [1108, 1109]
      try {
        await userControll.updateGroup(user_id, old_group_name, new_group_name, stock_id_array)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'ControllerError')
        expect(error).toHaveProperty('errorLevel', 3)
      }
    })
})

describe('Test the getAllIndustryStock function', () => {
  test('It should successful', async () => {
    // 模擬依賴
    const mockData = [
      {
        industry: '光電業',
        data: [
          {
            stock_id: 2349,
            name: '錸德科技股份有限公司',
            industry: '光電業',
          },
          {
            stock_id: 3038,
            name: '全台晶像股份有限公司',
            industry: '光電業',
          },
          {
            stock_id: 3535,
            name: '晶彩科技股份有限公司',
            industry: '光電業',
          },
          {
            stock_id: 3543,
            name: '州巧科技股份有限公司',
            industry: '光電業',
          },
        ],
      },
      {
        industry: '其他',
        data: [
          {
            stock_id: 1437,
            name: '勤益投資控股股份有限公司',
            industry: '其他',
          },
          {
            stock_id: 9929,
            name: '秋雨創新股份有限公司',
            industry: '其他',
          },
          {
            stock_id: 6625,
            name: '必應創造股份有限公司',
            industry: '其他',
          },
          {
            stock_id: 2514,
            name: '龍邦國際興業股份有限公司',
            industry: '其他',
          },
        ],
      },
    ]

    userModels.getAllIndustryStock.mockResolvedValue(mockData)
    const result = await userControll.getAllIndustryStock()
    result.forEach((item) => {
      expect(item).toMatchObject({
        industry: expect.any(String),
        data: expect.any(Array),
      })
    })
    // 驗證是否正確使用依賴
    expect(userModels.getAllIndustryStock).toHaveBeenCalledWith()
  }),
    test('It should throw an AppError if something wrong in Sql', async () => {
      userModels.getAllIndustryStock.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

      try {
        await userControll.getAllIndustryStock()
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'SqlError')
        expect(error).toHaveProperty('errorLevel', 4)
      }
    }),
    test('It should throw an AppError if something wrong in Controller', async () => {
      userControll.getAllIndustryStock = jest.fn().mockImplementation(() => {
        throw new AppError(new Error('Some controller error'), 'ControllerError', 'createGroup', 3)
      })

      try {
        await userControll.getAllIndustryStock()
      } catch (error) {
        expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
        expect(error).toHaveProperty('source', 'ControllerError')
        expect(error).toHaveProperty('errorLevel', 3)
      }
    })
})

describe('Test the setDefaultCombo function', () => {
  test('It should successful', async () => {
    // 模擬依賴
    userModels.cleanDefault.mockResolvedValue()
    userModels.setDefault.mockResolvedValue()

    const user_id = 1
    const group_name = '投資組合1'

    const result = await userControll.setDefaultCombo(user_id, group_name)
    expect(result).toBeUndefined()
    // 驗證是否正確使用依賴
    expect(userModels.cleanDefault).toHaveBeenCalledWith(user_id)
    expect(userModels.setDefault).toHaveBeenCalledWith(user_id,group_name)
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.cleanDefault.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

    const user_id = 1
    const group_name = '投資組合1'
    try {
      await userControll.setDefaultCombo(user_id, group_name)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.setDefault.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

    const user_id = 1
    const group_name = '投資組合1'
    try {
      await userControll.setDefaultCombo(user_id, group_name)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  }),
  test('It should throw an AppError if something wrong in Controller', async () => {
    userControll.setDefaultCombo = jest.fn().mockImplementation(() => {
      throw new AppError(new Error('Some controller error'), 'ControllerError', 'createGroup', 3)
    })

    const user_id = 1
    const group_name = '投資組合1'
    try {
      await userControll.setDefaultCombo(user_id, group_name)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
      expect(error).toHaveProperty('source', 'ControllerError')
      expect(error).toHaveProperty('errorLevel', 3)
    }
  })
})

describe('Test the getHistory function', () => {
  test('It should successful', async () => {
    // 模擬依賴
    userModels.getUserHistory.mockResolvedValue([])
    
    const user_id = 1
    const result = await userControll.getHistory(user_id)
    expect(Array.isArray(result)).toBe(true)
    // 驗證是否正確使用依賴
    expect(userModels.getUserHistory).toHaveBeenCalledWith(user_id)
  }),
  test('It should throw an AppError if something wrong in Sql', async () => {
    userModels.getUserHistory.mockRejectedValue(new AppError(new Error('Model have something wrong.'), 'SqlError', 'insertUser', 4))

    const user_id = 1
    try {
      await userControll.getHistory(user_id)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
      expect(error).toHaveProperty('source', 'SqlError')
      expect(error).toHaveProperty('errorLevel', 4)
    }
  }),
  test('It should throw an AppError if something wrong in Controller', async () => {
    userControll.getHistory = jest.fn().mockImplementation(() => {
      throw new AppError(new Error('Some controller error'), 'ControllerError', 'createGroup', 3)
    })

    const user_id = 1
    try {
      await userControll.getHistory(user_id)
    } catch (error) {
      expect(error).toBeInstanceOf(AppError) // 檢查錯誤是否為 AppError 類型
      expect(error).toHaveProperty('source', 'ControllerError')
      expect(error).toHaveProperty('errorLevel', 3)
    }
  })
})
