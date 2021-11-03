const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: 'config.env' });

//db connect
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE).then(console.log('DB connected'));

//require app
const app = require('./app');
