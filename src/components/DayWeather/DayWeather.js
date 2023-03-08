import React from 'react';
import PropTypes from 'prop-types';
import styles from './DayWeather.module.css';

const DayWeather = ({day}) => (
  <div className={styles.DayWeather}>
    {day.diaSemana} {day.estadoCielo==='soleado'?'☀️':'☁️'} {day.temperatura>19?'🌡️':''} {day.humedad>70?'💧':''}
  </div>
);

DayWeather.propTypes = {};

DayWeather.defaultProps = {};

export default DayWeather;
