import React, { Fragment } from 'react';

import { Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const CardComponent = ({
    cityName,
    minTemp,
    maxTemp,
    rainProb,
    rainPrec,
    weatherState
}) => (
    <Card className="card-size">
      <Card.Body>
        <Card.Title>{cityName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{weatherState}</Card.Subtitle>
        <Fragment>
          <div className="temperatures">
            <span className="max">Máx: {maxTemp}ºC</span>
            <span className="min">Mín: {minTemp}ºC</span>
          </div>
          <div>
            Chuva: {rainPrec}mm - {rainProb}%
          </div>
        </Fragment>
      </Card.Body>
    </Card>
)

export default CardComponent