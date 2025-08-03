const express = require("express");
const { body, validationResult } = require("express-validator")
const tasksController = require("./tasks.controller.js");
const { StatusCodes } = require("http-status-codes");
const createTaskValidator = require("./validators/createTask.validator.js");
const getTasksValidator = require("./validators/getTasks.validator.js");
const updateTasksValidator = require("./validators/updateTask.validator.js");
const deleteTaskValidator = require("./validators/deleteTask.validator.js");
const authenticateToken = require("../middleware/authenticateToken.middleware.js");

const tasksRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   get:
 *     summary: Get all the tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *          type: integer
 *          default: 10
 *         description: The number of task needed in a single response
 *       - in: query
 *         name: page
 *         schema:
 *          type: integer
 *          default: 1
 *         description: The page number of the tasks response
 *       - in: query
 *         name: order
 *         schema:
 *          type: string
 *          default: 'asc'
 *          enum: ['asc', 'dsc']
 *         description: Order of tasks
 *     responses:
 *       200:
 *         description: Task Create successfully
 *         content:
 *           application/json:
 *             example:
 *              status: success
 *              StatusCode: 200
 *              message: Ok
 *              data:
 *                - _id: 688307ea3e987492ef4317f5
 *                  title: Create a new video
 *                  description: A video about fullstack web development
 *                  status: todo
 *                  priority: normal
 *                  dueDate: 2025-01-01T12:00:00Z
 *       401:
 *         description: Not Authorized error
 *         content:
 *           application/json:
 *             example:
 *              status: error
 *              StatusCode: 401
 *              message: Unauthorized
 *              error:
 *                message:  You are not Authorized to perform this request
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *              status: error
 *              StatusCode: 403
 *              message: Forbidden
 *              error:
 *                message:  Your token is either expired or invalid.
 */

tasksRouter.get("/tasks", [getTasksValidator, authenticateToken], (req, res) => {
  const result = validationResult(req);
  if(result.isEmpty()){
    return tasksController.handleGetTasks(req, res);
  }
  else{
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             example:
 *              status: success
 *              StatusCode: 201
 *              message: Created
 *              data:
 *                _id: 688307ea3e987492ef4317f5
 *                title: Create a new video
 *                description: A video about fullstack web development
 *                status: todo
 *                priority: normal
 *                dueDate: 2025-01-01T12:00:00Z
 *       401:
 *         description: Not Authorized error
 *         content:
 *           application/json:
 *             example:
 *              status: error
 *              StatusCode: 401
 *              message: Unauthorized
 *              error:
 *                message:  You are not Authorized to perform this request
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *              status: error
 *              StatusCode: 403
 *              message: Forbidden
 *              error:
 *                message:  Your token is either expired or invalid.
 */

tasksRouter.post( "/tasks", [createTaskValidator, authenticateToken], (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if(result.isEmpty()){
    return tasksController.handlePostTasks(req, res);
  }
  else{
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   patch:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             example:
 *              status: success
 *              StatusCode: 200
 *              message: Ok
 *              data:
 *                _id: 688307ea3e987492ef4317f5
 *                title: Create a new video
 *                description: A video about fullstack web development
 *                status: todo
 *                priority: normal
 *                dueDate: 2025-01-01T12:00:00Z
 *       401:
 *         description: Not Authorized error
 *         content:
 *           application/json:
 *             example:
 *              status: error
 *              StatusCode: 401
 *              message: Unauthorized
 *              error:
 *                message:  You are not Authorized to perform this request
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *              status: error
 *              StatusCode: 403
 *              message: Forbidden
 *              error:
 *                message:  Your token is either expired or invalid.
 */


tasksRouter.patch("/tasks", [updateTasksValidator, authenticateToken], (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if(result.isEmpty()){
    return tasksController.handlePatchTasks(req, res);
  }
  else{
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskDelete'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             example:
 *              status: success
 *              StatusCode: 200
 *              message: Ok
 *              data:
 *                acknowledged: true
 *                deletedCount: 1
 *       401:
 *         description: Not Authorized error
 *         content:
 *           application/json:
 *             example:
 *              status: error
 *              StatusCode: 401
 *              message: Unauthorized
 *              error:
 *                message:  You are not Authorized to perform this request
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *              status: error
 *              StatusCode: 403
 *              message: Forbidden
 *              error:
 *                message:  Your token is either expired or invalid.
 */

tasksRouter.delete("/tasks", [deleteTaskValidator, authenticateToken], (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if(result.isEmpty()){
    return tasksController.handleDeleteTasks(req, res);
  }
  else{
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});


module.exports = tasksRouter;