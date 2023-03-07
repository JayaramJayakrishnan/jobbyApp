import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import FilterJobs from '../FilterJobs'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiCallStatusList = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobItemsList: [],
    apiCallStatus: apiCallStatusList.initial,
    employmentType: [],
    minimumPackage: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  onClickRetry = () => {
    this.getJobsList()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsList()
  }

  applyTypeFilter = (employmentTypeId, checked) => {
    if (checked) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, employmentTypeId],
        }),
        this.getJobsList,
      )
    } else {
      this.setState(prevState => {
        const filteredList = prevState.employmentType.filter(
          id => id !== employmentTypeId,
        )

        return {
          employmentType: filteredList,
        }
      }, this.getJobsList)
    }
  }

  applySalaryFilter = salaryRangeId => {
    this.setState({minimumPackage: salaryRangeId}, this.getJobsList)
  }

  getJobsList = async () => {
    this.setState({apiCallStatus: apiCallStatusList.inProgress})

    const {employmentType, minimumPackage, searchInput} = this.state
    const employmentTypesString = employmentType.join(',')
    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesString}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        apiCallStatus: apiCallStatusList.success,
        jobItemsList: updatedData,
      })
    } else {
      this.setState({apiCallStatus: apiCallStatusList.failure})
    }
  }

  renderJobItems = () => {
    const {jobItemsList} = this.state

    if (jobItemsList.length === 0) {
      return (
        <div className="no-jobs-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-view-image"
          />
          <h1 className="no-jobs-view-heading">No Jobs Found</h1>
          <p className="no-jobs-view-text">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }

    return (
      <ul className="job-items-list-container">
        {jobItemsList.map(item => (
          <JobItem jobItem={item} key={item.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="jobs-list-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="jobs-list-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-list-failure-view-image"
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
        return this.renderJobItems()
      case apiCallStatusList.inProgress:
        return this.renderLoader()
      case apiCallStatusList.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="sm-search-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.onClickSearchButton}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="jobs-page">
          <FilterJobs
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            applyTypeFilter={this.applyTypeFilter}
            applySalaryFilter={this.applySalaryFilter}
          />
          <div className="job-items-container">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.switchViews()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
