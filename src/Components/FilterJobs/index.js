import Profile from '../Profile'

import './index.css'

const FilterJobs = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    applyTypeFilter,
    applySalaryFilter,
  } = props

  const onCheckTypeFilter = event => {
    applyTypeFilter(event.target.id, event.target.checked)
  }

  const onCheckSalaryFilter = event => {
    applySalaryFilter(event.target.id)
  }

  return (
    <div className="profile-filter-container">
      <Profile />
      <hr className="jobs-page-hr" />
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="employment-types-container">
        {employmentTypesList.map(item => (
          <li key={item.employmentTypeId} className="employment-type">
            <input
              type="checkbox"
              value={item.employmentTypeId}
              id={item.employmentTypeId}
              onChange={onCheckTypeFilter}
            />
            <label
              htmlFor={item.employmentTypeId}
              className="employment-type-label"
            >
              {item.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="jobs-page-hr" />
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="salary-ranges-container">
        {salaryRangesList.map(item => (
          <li key={item.salaryRangeId} className="salary-range">
            <input
              type="radio"
              value={item.salaryRangeId}
              id={item.salaryRangeId}
              name="salaryRange"
              onChange={onCheckSalaryFilter}
            />
            <label htmlFor={item.salaryRangeId} className="salary-range-label">
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterJobs
