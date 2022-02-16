## NEWS API WITH CRON AND JWT AUTH

To configure the database (MongoDB) you need to go to: https://www.mongodb.com/es/cloud/atlas/register 
Here you can register and you will be given a free Cluster, where you can create a database and then with this link you can connect putting it in the app.module.ts
mongodb+srv://USERNAME:PASSWORD@cluster0.8uvul.mongodb.net/DATABASENAME?retryWrites=true&w=majority

(Please change USERNAME, PASSWORD, DATABASENAME for your credentials, also in the "connect" section you have this information) 

After this you will be able to use the API and you will be able to see how it modifies the database. To populate it you will only have to use the /news/uploadNews endpoint.
On the other hand, talking about the API, through a CronJob the app will take every hour, through an Httpclient request, all the news provided by Hacker News URL and will upload them to the database.  Also, as the test says there are endpoints to delete by id, I also added an endpoint to empty all the news from the database if desired, you also get the first 5 news as requested in the test and you can search by title (field: title) and by author (field: author). However, the whole JWT authentication system was added as requested in the test (register, login, authenticated user and logout) the token has a duration of 1 day.

I hope you like it, as I really enjoyed programming everything. 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


