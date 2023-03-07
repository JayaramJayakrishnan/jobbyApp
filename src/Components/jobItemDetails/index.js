import {Component} from 'react'
import Cookie from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiCallStatusList = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {jobItemDetails: {}, apiCallStatus: apiCallStatusList.initial}

  componentDidMount() {
    this.getJobItemDetails()
  }

  onClickRetry = () => {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiCallStatus: apiCallStatusList.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
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
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          skills: data.job_details.skills.map(item => ({
            name: item.name,
            imageUrl: item.image_url,
          })),
          title: data.job_details.title,
        },
        similarJobs: data.similar_jobs.map(item => ({
          companyLogoUrl: item.company_logo_url,
          employmentType: item.employment_type,
          id: item.id,
          jobDescription: item.job_description,
          location: item.location,
          rating: item.rating,
          title: item.title,
        })),
      }
      console.log(updatedData)
      this.setState({
        jobItemDetails: updatedData,
        apiCallStatus: apiCallStatusList.success,
      })
    } else {
      this.setState({apiCallStatus: apiCallStatusList.failure})
    }
  }

  renderJobItemDetails = () => {
    const {jobItemDetails} = this.state
    const {jobDetails, similarJobs} = jobItemDetails
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <>
        <div className="job-item-details-container">
          <div className="job-item-details-card">
            <div className="job-item-header-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="job-item-card-company-logo"
              />
              <div>
                <h1 className="job-item-card-title">{title}</h1>
                <p className="rating">
                  <AiFillStar className="star-icon" /> {rating}
                </p>
              </div>
            </div>
            <div className="job-location-type-salary-container">
              <div className="job-location-type-container">
                <p className="job-location">
                  <MdLocationOn className="location-icon" /> {location}
                </p>
                <p className="job-type">
                  <BsBriefcaseFill className="brief-case-icon" />{' '}
                  {employmentType}
                </p>
              </div>
              <p className="salary">{packagePerAnnum}</p>
            </div>
            <hr className="jobs-page-hr" />
            <div className="job-item-description-container">
              <h1 className="job-item-description-heading">Description</h1>
              <a
                href={companyWebsiteUrl}
                className="company-website-link-styling"
              >
                Visit
                <FiExternalLink className="external-link-icon" />
              </a>
            </div>
            <p className="job-description">{jobDescription}</p>
            <h1 className="skill-heading">Skills</h1>
            <ul className="skills-list-container">
              {skills.map(item => (
                <li className="skill-container" key={item.name}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="skill-image"
                  />
                  <p className="skill-name">{item.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-company-description-container">
              <p className="life-at-company-description">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobs.map(item => (
            <SimilarJobs similarJobDetails={item} key={item.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div className="job-item-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-list-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-item-details-failure-view-image"
      />
      <h1 className="jobs-list-failure-view-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="jobs-list-failure-view-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-list-retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  switchViews = () => {
    const {apiCallStatus} = this.state

    switch (apiCallStatus) {
      case apiCallStatusList.success:
        return this.renderJobItemDetails()
      case apiCallStatusList.inProgress:
        return this.renderLoader()
      case apiCallStatusList.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-bg-container">
        <Header />
        {this.switchViews()}
      </div>
    )
  }
}

export default JobItemDetails
