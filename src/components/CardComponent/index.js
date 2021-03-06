import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '../'
import { Card } from 'react-bootstrap';
import Error from '../ErrorComponent'
import { WeatherIcon } from '../'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const CardComponent = ({
    cityName,
    neighborhood,
    minTemp,
    maxTemp,
    rainProb,
    rainPrec,
    weatherState,
    period,
    icon,
    error,
    sharedLocation,
}) => {
  const { t } = useTranslation('common')

  const handleError = (error, sharedLocation) => (
    <Fragment>
      {(error && !sharedLocation) &&
        <Error locationError={sharedLocation}/>
      }
      {(error && sharedLocation && !cityName) &&
        <Error locationError={sharedLocation}/>
      }
    </Fragment>
  )

  const handleInformation = () => {
    if (cityName !== null) {
      return (
        <Fragment>
          <Card.Title>
            <div className="cardTitle">
              <span>{cityName}</span>
              <span className="period">{period}</span>
            </div>
          </Card.Title>
          <Card.Subtitle className="mb-2 subtitle">{neighborhood}</Card.Subtitle>
          <Fragment>
            <div className="temperatures">
              <div className="weatherStatus">
                <WeatherIcon
                  icon = { icon }
                />
              </div>      
              <span className="weatherState">{weatherState}</span>
              <span className="max">{maxTemp} ºC</span>
              {minTemp &&
                <span className="min">{minTemp} ºC</span>
              }
            </div>
            {rainPrec !== 0 &&
              <div>
                {rainPrec} mm - {rainProb} %
              </div>
            }
            {rainPrec === 0 &&
              <div>{t('cards.noRain')}</div>
            }
          </Fragment>
      </Fragment>
      )
    }

    if(cityName === null) {
      return <Loader />
    }
  }

  return (
    <Card className="card-size">
      {!error &&
        <Card.Body>
          {handleInformation()}
        </Card.Body>
      }
      { handleError(error, sharedLocation) }
    </Card>
  )
}

export default CardComponent
