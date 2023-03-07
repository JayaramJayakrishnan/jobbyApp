import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isUserVerified: true, errMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()

    this.verifyUser()

    this.setState({
      username: '',
      password: '',
    })
  }

  verifyUser = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}

    const {history} = this.props

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookie.set('jwt_token', jwtToken, {expires: 10})
      history.replace('/')
    } else {
      this.setState({isUserVerified: false, errMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, isUserVerified, errMsg} = this.state

    const jwtToken = Cookie.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <div className="label-input-container">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input"
                id="username"
                value={username}
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="label-input-container">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input"
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {!isUserVerified && <p className="error-msg">*{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
