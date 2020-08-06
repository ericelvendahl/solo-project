const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// get all tasks from one list by id
router.get("/list/:id", rejectUnauthenticated, (req, res) => {
  //   const username = req.body.username;
  //   const password = encryptLib.encryptPassword(req.body.password);

  // former query that returns relevany task name by ID
  // const queryText = `SELECT "task".task_name FROM "task" JOIN "task_list" ON "task_list".id = "task".task_list_id
  // WHERE "task_list".id = ${req.params.id};`;

  const queryText = `SELECT "task".id, "task".task_list_id, "task".task_name, "task".task_description, "task".task_claimed, "task".task_complete FROM "task" JOIN "task_list" ON "task_list".id = "task".task_list_id
	WHERE "task_list".id = ${req.params.id};`;

  pool
    .query(queryText)
    .then((result) => {
      console.log("GET /api/task/list successsful.");
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error in /api/task/list is", err);
      res.sendStatus(500);
    });
});
// get all task list names and ids for a given user
router.get("/listsbyuser/:id", rejectUnauthenticated, (req, res) => {
  //   const username = req.body.username;
  //   const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `SELECT "task_list".id, "task_list".task_list_name
	FROM "user"
		JOIN "user_task_list" ON "user".id = "user_task_list".user_id
			JOIN "task_list" ON "task_list".id = "user_task_list".task_list_id
			WHERE "user".id = ${req.params.id};`;
  pool
    .query(queryText)
    .then((result) => {
      console.log("GET /api/task/listsbyuser successsful.");
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error in GET /api/task/listsbyuser is", err);
      res.sendStatus(500);
    });
});

router.post("/add/", (req, res) => {
  console.log("req.body is", req.body);
  const queryText = `INSERT INTO "task" ("task_list_id", "task_name", "task_description") 
                    VALUES 
                    (${req.body.currentTaskList[0].task_list_id}, '${req.body.name}', '${req.body.description}');`;
  pool
    .query(queryText)
    .then((result) => {
      console.log("POST /api/task/add successsful.");
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error in POST /api/task/add is", err);
      res.sendStatus(500);
    });
});
module.exports = router;

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
