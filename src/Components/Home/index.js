import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="home-bg-container">
    <Header />
    <div className="home-page">
      <div className="home-page-content">
        <h1 className="home-page-heading">Find The Job That Fits Your Life</h1>
        <p className="home-page-description">
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="link-styling">
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
