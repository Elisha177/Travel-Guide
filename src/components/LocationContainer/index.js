/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from 'react'

import './index.css'

const LocationContainer = props => {
  const {locationDetails} = props
  const {name, image_url, description} = locationDetails

  return (
    <li className="list-location">
      <div className="location-card">
        <img src={image_url} alt={name} className="image" />
        <div className="location-content">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
    </li>
  )
}

export default LocationContainer
