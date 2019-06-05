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


  server.post("/api/cohorts", (req, res) => {
    if (!req.body.name) {
      res.status(400).json({ msg: "please provide a name" });
    } else {
      db("cohorts")
        .insert(req.body, "id")
        .then(ids => {
          db("cohorts")
            .where({ id: ids[0] })
            .first()
            .then(cohort => {
              res.status(200).json(cohort);
            })
            .catch(err => {
              res.status(500).json(err);
            });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    }
  });

server.get("/api/cohorts/:id", (req, res) => {
    db("cohorts")
      .where({ id: req.params.id })
      .first()
      .then(cohort => {
        if (cohort) {
          res.status(200).json(cohort);
        } else {
          res.status(404).json({ message: "no such cohorts started yet" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  


const port = process.env.PORT || 5000;
server.listen(port, () =>
 console.log(`\n** API running on http://localhost:${port} **\n`)
);