/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import LocationContainer from '../LocationContainer'

import './index.css'

class Home extends Component {
  state = {
    locationList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.fetchPackages()
  }

  fetchPackages = async () => {
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {method: 'GET'}

    try {
      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.packages.map(location => ({
          id: location.id,
          name: location.name,
          image_url: location.image_url,
          description: location.description,
        }))

        this.setState({
          locationList: updatedData,
          isLoading: false,
        })
      } else {
        console.error('Failed to fetch packages')
        this.setState({isLoading: false})
      }
    } catch (error) {
      console.error('An error occurred:', error)
      this.setState({isLoading: false})
    }
  }

  renderLocationList = () => {
    const {locationList} = this.state
    return (
      <ul className="location-list">
        {locationList.map(location => (
          <LocationContainer locationDetails={location} key={location.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading, locationList} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        <hr className="horizontal-line" />
        <div className="locations-container">
          {isLoading ? (
            this.renderLoader()
          ) : locationList.length >= 3 ? (
            this.renderLocationList()
          ) : (
            <p>No packages available.</p>
          )}
        </div>
      </div>
    )
  }
}

export default Home
