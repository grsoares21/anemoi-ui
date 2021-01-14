const dev = {
  anemoiServicesUrl: 'http://10.0.2.2:3001/'
};

const prod = {
  anemoiServicesUrl: 'https://api.anemoi.app/.netlify/functions/server/'
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default prod;
