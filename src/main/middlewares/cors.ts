import { Request, Response, NextFunction } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-headers', '*')
  res.set('access-control-allow-methods', '*')
  res.set('strict-origin-when-cross-origin', '*')
  res.set('no-referrer', '*')
  res.set('no-referrer-when-downgrade', '*')
  res.set('origin-when-cross-origin', '*')
  res.set('same-origin', '*')
  res.set('strict-origin-when-cross-origin', '*')
  res.set('strict-origin', '*')
  res.set('unsafe-url', '*')
  next()
}
