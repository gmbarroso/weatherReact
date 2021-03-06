import React, { useEffect, useCallback, Fragment } from "react";
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../../hooks/'

import { Button } from 'react-bootstrap';
import { Loader } from '../'

import './style.css'

const Timer = ({
  isReseted,
  seconds,
  buttonEnabled,
  cityName,
  error
}) => {
  const [timeLeft, setTimeLeft] = useLocalStorage('timeLeft', seconds);
  const [ buttonDisabled, setButtonDisabled ] = useLocalStorage('buttonEnabled', false)
  const { t } = useTranslation('common')

  const handleTimer = useCallback(() => {
    setTimeLeft(seconds);
    setButtonDisabled(!buttonDisabled)
    isReseted(!buttonDisabled) // passando o valor para o pai
  }, [seconds, isReseted, buttonDisabled, setButtonDisabled, setTimeLeft])

  const renderTimer = () => {
    if(cityName !== null) {
      return (
        <Fragment>
          <h5>{t('timer.title')}</h5>
          <h5>{secondsToHms(timeLeft)}</h5>
          {buttonEnabled &&
          <div className="buttonTimer">
            <Button
                onClick = { () => handleTimer() }
                variant="primary"
                disabled = { buttonDisabled }
                size = "sm"
              >
                {t('timer.button')}
            </Button>
          </div>
          }
        </Fragment>
      )
    } else {
      return <Loader />
    }
  }

  useEffect(() => {
    let interval = null

    if (timeLeft === 0) {
      handleTimer()
      setButtonDisabled(!isReseted)
    }

    if (isReseted) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000);
    } else if (timeLeft !== 10800) {
      clearInterval(interval);
    }

    return () => clearInterval(interval)
  }, [timeLeft, isReseted, handleTimer, setButtonDisabled, setTimeLeft]);

  const secondsToHms = (value) => {
    const h = Math.floor(value / 3600);
    const m = Math.floor(value % 3600 / 60);
    const s = Math.floor(value % 3600 % 60);

    let hour = h > 0 ? h + `${t('timer.hour')}` : "";
    let minute = m > 0 ? m + `${t('timer.minutes')}` : "";
    let second = s > 0 ? s : "";
    return hour + minute + second;
  }

  return (
    <div className="timer">
      {!error &&
      <Fragment>
        {renderTimer()}
      </Fragment>
      }
    </div>
  );
};

export default Timer