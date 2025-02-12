const express = require("express");
const knex = require("knex");
const helmet = require("helmet");
const server = express();
// const cohortRouter = require('./router/cohort.js')
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());
// server .use('/api/cohorts',  cohortRouter)

server.get("/api/cohorts", (req, res) => {
  console.log("i am here");
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

server.put("/api/cohorts/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "cohorts" : "cohort"} updated`
        });
      } else {
        res.status(400).json({ message: "no such cohort exists" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/api/cohorts/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "cohorts" : "cohort"} deleted`
        });
      } else {
        res.status(404).json({ message: "no such cohort exists" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/students", (req, res) => {
  console.log("i am here");
  db("students")
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/students/:id", (req, res) => {
  db("students")
    .where({ id: req.params.id })
    .first()
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: "no such cohorts started yet" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/api/students", (req, res) => {
  if (!req.body.name || !req.body.cohorts_id) {
    res.status(400).json({ msg: "please provide a name and cohorts_id" });
  } else {
    db("students")
      .insert(req.body)
      .then(ids => {
        db("students")
          .where({ id: ids[0] })
          .first()
          .then(student => {
            res.status(200).json(student);
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

server.delete("/api/students/:id", (req, res) => {
  db("students")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "cohorts" : "student"} deleted`
        });
      } else {
        res.status(404).json({ message: "no such student exists" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put("/api/students/:id", (req, res) => {
  db("students")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "cohorts" : "cohort"} updated`
        });
      } else {
        res.status(400).json({ message: "no such cohort exists" });
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
