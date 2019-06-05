const express = require('express');
const knex = require("knex");
const helmet = require('helmet');
const server = express();
// const cohortRouter = require('./router/cohort.js')
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development);


server.use(helmet());
server.use(express.json());
// server .use('/api/cohorts',  cohortRouter)


server.get("/api/cohorts", (req, res) => {
    console.log('i am here')
    db("cohorts")
      .then(cohort => {
        res.status(200).json(cohort);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

const port = process.env.PORT || 5000;
server.listen(port, () =>
 console.log(`\n** API running on http://localhost:${port} **\n`)
);