module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "123456",
  "database": "news_app",
  "entities": [__dirname + '/../**/*.entity{.ts,.js}'],
  "synchronize": true,
  "logging": true
}