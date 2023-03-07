import {Route, Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = props => {
  const verifyUser = () => {
    const jwtToken = Cookie.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return <Route {...props} />
  }

  return verifyUser()
}

export default ProtectedRoute
