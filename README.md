# Making PostgreSQL database realtime with Pusher and Node

Sometimes, we want to watch over specific tables in our database and make new records or entries available to users as soon as they come in. While doing this, we do not want to take away the flexibility and advantages we get from using PostgreSQL databases. In this tutorial, we will learn about making PostgreSQL database realtime using Pusher. 

[View tutorial](https://pusher.com/tutorials/postgresql-realtime)

## Getting Started
Clone the project repository by running the command below if you use SSH

```
git clone git@github.com:samuelayo/realtime_postgres.git
```

If you use https, use this instead

```
git clone https://github.com/samuelayo/realtime_postgres.git
```

Change directory into the newly cloned project and install dependencies

```
cd realtime_postgres
npm install
```

### Prerequisites

#### Setup Pusher

If you don't have one already, create a free Pusher account at https://pusher.com/signup then login to your dashboard and create an app. 


Then fill in your Pusher app credentials in your `.env` file by replacing this line with your appid, appkey and app secret respectively:

```
PUSHER_APP_ID=XXX_APP_ID
PUSHER_APP_KEY=XXX_APP_KEY
PUSHER_APP_SECRET=XXX_APP_SECRET
PUSHER_APP_CLUSTER=XXX_APP_CLUSTER
```

Also, remember to fill in the your app key and app cluster in your `views/index.ejs` file by updating this line:

```
var pusher = new Pusher('XXX-APP-KEY', {
    cluster: 'XXX-APP-CLUSTER',
    encrypted: true
    });
```

#### Setup PostgreSQL
First, you need to define your PostgreSQL connection url by replacing the code below in the `.env` file with your connection URL

```
POSTGRES_CONNECTION_URL=postgres://user:password@postgres_host:postgres_port/database_name
```

Next, you need to migrate your database by running:

```
node node_modules/db-migrate/bin/db-migrate up
```


And finally, start the application by running:

```
node index.js
```

use any PostgreSQL client such as PgAdmin or Adminer to insert new records into your database. while doing that, visit http://localhost:3000 in your browser to view the magic.

## Built With

* [Pusher](https://pusher.com/) - APIs to enable devs building realtime features
* [Node.js](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. 
