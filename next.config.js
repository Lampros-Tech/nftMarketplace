module.exports = {
  env:{
    'MYSQL_HOST' : '127.0.0.1',
    'MYSQL_PORT' : '3306',
    'MYSQL_DATABASE' : 'MarketPlace',
    'MYSQL_USER' : 'root',
    'MYSQL_PASSWORD' : 'password',
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, tls: false };
    return config;
  },
}
