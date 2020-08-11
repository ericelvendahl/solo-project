const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  console.log("in delete / with id:", req.params.id);
  const queryString = `DELETE FROM "task" WHERE "id" = ${req.params.id};`;
  pool
    .query(queryString)
    .then((result) => {
      console.log(`delete ${req.params.id} successful`);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in / delete for ${req.params.id}`);
      res.sendStatus(500);
    });
});

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
}); // end router.get "/list/:id"

router.get("/listname/:id", rejectUnauthenticated, (req, res) => {
  //   const username = req.body.username;
  //   const password = encryptLib.encryptPassword(req.body.password);

  // former query that returns relevany task name by ID
  // const queryText = `SELECT "task".task_name FROM "task" JOIN "task_list" ON "task_list".id = "task".task_list_id
  // WHERE "task_list".id = ${req.params.id};`;

  const queryText = `SELECT "task_list_name" FROM "task" JOIN "task_list" 
    ON "task".task_list_id = "task_list".id 
    WHERE "task".task_list_id = ${req.params.id} GROUP BY "task_list".id;`;
  pool
    .query(queryText)
    .then((result) => {
      console.log("GET /api/listname successsful.");
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error in /api/listname is", err);
      res.sendStatus(500);
    });
}); // end router.get "/listname/:id"

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
}); // end router.get "/listsbyuser/:id"

// Add task to list
router.post("/add/", (req, res) => {
  console.log("req.body is", req.body);
  const queryText = `INSERT INTO "task" ("task_list_id", "task_name", "task_description") 
                    VALUES 
                    ($1, $2, $3);`;
  pool
    .query(queryText, [
      req.body.currentTaskList[0].task_list_id,
      req.body.name,
      req.body.description,
    ])
    .then((result) => {
      console.log("POST /api/task/add successsful.");
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error in POST /api/task/add is", err);
      res.sendStatus(500);
    });
}); // end router.post("/add/"

// add new list and assign to current user
router.post("/list/add/", async (req, res) => {
  console.log("in /list/add/ POST. req.body is", req.body);

  const name = req.body.name;
  const userId = req.body.id;
  // const amount = req.body;

  const connection = await pool.connect();

  try {
    await connection.query("BEGIN;");

    // Create the list and get back the new ID
    const createAccount = `INSERT INTO "task_list" ("task_list_name") VALUES ($1) RETURNING "id";`;
    // We care about the result coming out of the database, so save it (need id)
    const createResult = await connection.query(createAccount, [name]);

    // Get the id from the query result
    const newTaskListId = createResult.rows[0].id;
    console.log("new list id is:", newTaskListId);

    const userTaskListQuery = `INSERT INTO user_task_list (task_list_id, user_id) VALUES ($1, $2);`;
    // We don't care about the result coming back so ignore it
    await connection.query(userTaskListQuery, [newTaskListId, userId]);

    await connection.query("COMMIT;");
    res.sendStatus(200);
  } catch (err) {
    console.log("Error on create new list:", err);
    await connection.query("ROLLBACK;");
    res.sendStatus(201);
  } finally {
    // IMPORTANT:
    // Puts the connection back in the pool to be used again later.
    connection.release();
  }
}); // end router.post("/list/add")

router.post("/updatelistname/", (req, res) => {
  console.log("in /updatelistname req.body is", req.body);
  const queryText = `UPDATE "task_list" SET "task_list_name" = $1 WHERE "id" = $2;`;
  pool
    .query(queryText, [req.body.name, req.body.id])
    .then((result) => {
      console.log("POST /api/task/add successsful.");
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error in POST /api/task/add is", err);
      res.sendStatus(500);
    });
}); // end router.post("/updatelistname/"

module.exports = router;

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
