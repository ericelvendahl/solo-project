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

  const queryText = `SELECT "task".task_name FROM "task" JOIN "task_list" ON "task_list".id = "task".task_list_id
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
      console.log("Error in /api/task/listsbyuser is", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
