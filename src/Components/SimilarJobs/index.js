import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-item-card">
      <div className="job-item-header-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="job-item-card-company-logo"
        />
        <div>
          <h1 className="job-item-card-title">{title}</h1>
          <p className="rating">
            <AiFillStar className="star-icon" /> {rating}
          </p>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="job-location-type-salary-container">
        <div className="job-location-type-container">
          <p className="job-location">
            <MdLocationOn className="location-icon" /> {location}
          </p>
          <p className="job-type">
            <BsBriefcaseFill className="brief-case-icon" /> {employmentType}
          </p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
