// import { useEffect, useState } from 'react';
// import { fetchWeather } from '../../services/api';
// import useUserStore from '../../zustand/useUserStore';

// const Weather = () => {
//   const { user, setUser } = useUserStore();
//   const [weather, setWeather] = useState(user.weather || null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(!weather);

//   useEffect(() => {
//     const getWeather = async (lat, lon) => {
//       try {
//         const data = await fetchWeather(lat, lon);
//         setWeather(data);
//         setUser({ weather: data });
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!weather) {
//       if ('geolocation' in navigator) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             getWeather(latitude, longitude);
//           },
//           (error) => {
//             setError('Permission to access location was denied');
//             setLoading(false);
//           }
//         );
//       } else {
//         setError('Geolocation is not supported by this browser');
//         setLoading(false);
//       }
//     } else {
//       setLoading(false);
//     }
//   }, [weather, setUser]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Local Weather in {weather.location.name}</h2>
//       <p>Region: {weather.location.region}</p>
//       <p>Country: {weather.location.country}</p>
//       <p>Temperature: {weather.current.temp_c} °C</p>
//       <p>Weather: {weather.current.condition.text}</p>
//       <img
//         src={`https:${weather.current.condition.icon}`}
//         alt={weather.current.condition.text}
//       />
//       <p>Humidity: {weather.current.humidity}%</p>
//       <p>
//         Wind: {weather.current.wind_kph} kph {weather.current.wind_dir}
//       </p>
//       <p>Pressure: {weather.current.pressure_mb} mb</p>
//       <p>Visibility: {weather.current.vis_km} km</p>
//     </div>
//   );
// };

// export default Weather;
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { fetchWeather } from '../../services/api';
import useUserStore from '../../zustand/useUserStore';

const WeatherBar = styled('div')(({ theme }) => ({
  backgroundColor: '#111',
  color: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  maxWidth: '100%',
  margin: '0 auto',
}));

const WeatherInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 10px',
});

const WeatherText = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: '14px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '16px',
  },
}));

const WeatherIcon = styled('img')({
  width: '50px',
  height: '50px',
  margin: '0 10px',
});

const Loading = styled('div')(({ theme }) => ({
  color: theme.palette.common.white,
  margin: theme.spacing(2, 0),
}));

const Error = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  margin: theme.spacing(2, 0),
}));

const Weather = () => {
  const { user, setUser } = useUserStore();
  const [weather, setWeather] = useState(user.weather || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!weather);

  useEffect(() => {
    const getWeather = async (lat, lon) => {
      try {
        const data = await fetchWeather(lat, lon);
        setWeather(data);
        setUser({ weather: data });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!weather) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeather(latitude, longitude);
          },
          (error) => {
            setError('Permission to access location was denied');
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [weather, setUser]);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <Error>Error: {error}</Error>;
  }

  return (
    <WeatherBar>
      <WeatherIcon
        src={`https:${weather.current.condition.icon}`}
        alt={weather.current.condition.text}
      />
      <WeatherInfo>
        <WeatherText>{weather.location.name}</WeatherText>
        <WeatherText>
          {weather.location.region}, {weather.location.country}
        </WeatherText>
      </WeatherInfo>
      <WeatherInfo>
        <WeatherText>{weather.current.temp_c} °C</WeatherText>
        <WeatherText>{weather.current.condition.text}</WeatherText>
      </WeatherInfo>
      <WeatherInfo>
        <WeatherText>Humidity: {weather.current.humidity}%</WeatherText>
        <WeatherText>
          Wind: {weather.current.wind_kph} kph {weather.current.wind_dir}
        </WeatherText>
      </WeatherInfo>
    </WeatherBar>
  );
};

export default Weather;
