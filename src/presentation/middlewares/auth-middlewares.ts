
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import AccountSchema from '../../infra/db/mongodb/mongo-schemas/account-schema'

export class AuthenticationToken {
  async veryfyToken (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('x-access-token')
      
      if (!token) {
        return res.status(403).json({
          ok: false,
          message: 'Token is required'
        })
      }
      

      const account: any = jwt.verify(token, process.env.SEED)

      const { id } = account

      const accountDB = await AccountSchema.findById(id)

      if (!accountDB) {
        return res.status(403).json({
          ok: false,
          mensaje: {
            mensaje: 'Must be authenticated ADMIN_ ROLE User no exist'
          }
        })
      }
      next()
    } catch (error) {
      if (error) {
        res.status(403).json({
          error
        })
      }
    }
  }

  async veryfyRole_Admin (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('x-access-token')
      
      if (!token) {
        return res.status(403).json({
          ok: false,
          message: 'Token is required'
        })
      }
      

      const account: any = jwt.verify(token, process.env.SEED)

      const { id } = account

      const accountDB: any = await AccountSchema.findById(id)

      if (!accountDB) {
        return res.status(403).json({
          ok: false,
          mensaje: {
            mensaje: 'Must be authenticated ADMIN_ ROLE User no exist'
          }
        })
      }

      if(accountDB.role !== 'ADMIN_ROLE') {
        return res.status(403).json({
          ok: false,
          mensaje: {
            mensaje: 'Must be authenticated ADMIN_ ROLE User no exist'
          }
        })
      }
      
      


      next()
    } catch (error) {
      if (error) {
        res.status(403).json({
          error
        })
      }
    }
  }
  
}

export default new AuthenticationToken()
