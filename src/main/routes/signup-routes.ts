import { Router } from 'express'
import { makeActivatedAccountController, makeDeleteAccountController, makeGetAccountController, makeGetAccountsActivatedsController, makeGetAccountsController, makeSignUpController, makeUpdateAccountController } from '../factories/signup'
import { AdaptRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories/auth'
import AuthenticationToken from '../../presentation/middlewares/auth-middlewares'
export default (router: Router): void => {
  router.post('/login', AdaptRoute(makeLoginController()))
  router.post('/signup', AdaptRoute(makeSignUpController()))
  router.put('/account/:id', AdaptRoute(makeUpdateAccountController()))
  router.get('/account/activated/:token', AuthenticationToken.veryfyToken, AdaptRoute(makeActivatedAccountController())) // confirm account
  router.get('/accounts/activated/:value', AuthenticationToken.veryfyToken, AdaptRoute(makeGetAccountsActivatedsController())) // get accounts

  router.get('/accounts',  AdaptRoute(makeGetAccountsController()))
  router.get('/get_account/:id/', AdaptRoute(makeGetAccountController()))
  router.delete('/account/:account_id', AuthenticationToken.veryfyToken, AdaptRoute(makeDeleteAccountController()))

}
// AuthenticationToken.veryfyToken, AuthenticationToken.veryfyRole_Admin,
