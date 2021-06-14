const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();
const PORT = process.env.PORT || 3000;
// Connect to database
mongoose.connect('mongodb://localhost:27017/url-shortner', { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => () => error);

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.use(express.json());

// express-winston logger for logging every requests
app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: './log/combined.log', level: 'info' })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  level: 'info',
  metaField: null,
  responseField: null,
  requestField: null,
  dynamicMeta:  (req, res) => {
    const request = {}
    const meta = {}
    if (req) {
      meta.request = request
      request.requestMethod = req.method
      request.requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
      request.protocol = `HTTP/${req.httpVersion}`
      request.remoteIp = req.ip  
      request.requestSize = req.socket.bytesRead
      request.userAgent = req.get('User-Agent')
      request.referrer = req.get('Referrer')
    }
  
    if (res) {
      meta.request = request
      request.status = res.statusCode
      request.latency = {
        seconds: Math.floor(res.responseTime / 1000),
        nanos: ( res.responseTime % 1000 ) * 1000000
      }
      if (res.body) {
        if (typeof res.body === 'object') {
          request.responseSize = JSON.stringify(res.body).length
        } else if (typeof res.body === 'string') {
          request.responseSize = res.body.length
        }
      }
    }
    return meta
  }
}));


app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));