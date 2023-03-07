import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem

  return (
    <Link to={`/jobs/${id}`} className="link-styling">
      <li className="job-item-card">
        <div className="job-item-header-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
              <BsBriefcaseFill className="brief-case-icon" /> {employmentType}
            </p>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="jobs-page-hr" />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
