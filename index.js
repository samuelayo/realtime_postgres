
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const pg = require ('pg');

require('dotenv').config();

const app = express();

let pgClient;

// set the view engine to ejs
app.set('view engine', 'ejs');

const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_CONNECTION_URL,
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session middleware

// Create an instance of Pusher
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true
});

pool.connect((err, client) => {
  if(err) {
    console.log(err);
  }
  pgClient = client;
  client.on('notification', function(msg) {
    pusher.trigger('watch_realtime_table', 'new_record', JSON.parse(msg.payload));
  });
  const query = client.query('LISTEN watch_realtime_table');
});

app.get('/', async(req, res) => {
    const data = await pgClient.query('SELECT * FROM realtime_table');
    return res.render('index', {table: data.rows});
});

//listen on the app
app.listen(3000, () => {
    return console.log('Server is up on 3000')
});