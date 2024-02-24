import mssql from 'mssql';
import bcrypt from 'bcrypt';
import { createUser } from '../signup.controller';

describe('Signup test suite', () => {
    let res: any

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis() // Make it chainable
        }

    })

    it('Successfully creates a user', async () => {
        let id = 'generatedId sdhfvsdiblfiubsidbfcsuiob'

        const req = {
            body: {
                full_name: "John Doe",
                password: "test12",
                email: "new@gmail.com"
            }
        }
        // 
        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('fuydvfdvfduiyfverfv' as never)
        // Create a mocked pool request

        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValueOnce({ rowsAffected: [1] })

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await createUser(req as any, res)

        expect(res.json).toHaveBeenCalledWith({success: 'User created successfully'})
        expect(res.status).toHaveBeenCalledWith(200)
    })
    })