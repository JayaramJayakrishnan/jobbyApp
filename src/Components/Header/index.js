import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <ul className="nav-content">
        <li>
          <Link to="/" className="link-styling">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-logo"
            />
          </Link>
        </li>
        <li className="nav-label-container">
          <Link to="/" className="link-styling">
            <p className="nav-label">Home</p>
          </Link>
          <Link to="/jobs" className="link-styling">
            <p className="nav-label">Jobs</p>
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>

        <div className="sm-nav-icons-container">
          <Link to="/" className="link-styling">
            <button className="sm-nav-buttons" type="button">
              <AiFillHome className="sm-nav-icons" />
            </button>
          </Link>
          <Link to="/jobs" className="link-styling">
            <button className="sm-nav-buttons" type="button">
              <BsFillBriefcaseFill className="sm-nav-icons" />
            </button>
          </Link>
          <button
            className="sm-nav-buttons"
            type="button"
            onClick={onClickLogout}
          >
            <FiLogOut className="sm-nav-icons" />
          </button>
        </div>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
