import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiCallStatusList = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {apiCallStatus: apiCallStatusList.initial, profileData: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  onClickRetry = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiCallStatus: apiCallStatusList.inProgress})

    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedData,
        apiCallStatus: apiCallStatusList.success,
      })
    } else {
      this.setState({apiCallStatus: apiCallStatusList.failure})
    }
  }

  renderProfile = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="30" width="30" />
    </div>
  )

  renderFailure = () => (
    <div className="failure-view-container">
      <button
        type="button"
        className="profile-retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  switchView = () => {
    const {apiCallStatus} = this.state

    switch (apiCallStatus) {
      case apiCallStatusList.inProgress:
        return this.renderLoading()
      case apiCallStatusList.success:
        return this.renderProfile()
      case apiCallStatusList.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return this.switchView()
  }
}

export default Profile
