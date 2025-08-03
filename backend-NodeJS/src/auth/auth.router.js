const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const authController = require("./auth.controller.js");
const loginValidator = require("./validators/login.validator.js");

const authRouter = express.Router();

/**
 * @swagger
 * 
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             example:
 *              status: success
 *              StatusCode: 200
 *              message: Ok
 *              data:
 *                accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODgyYzFiODI5MDM0MjRiMDczYmQ3YmUiLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsImlhdCI6MTc1MzQ1Njc1OCwiZXhwIjoxNzUzNTQzMTU4fQ.FaUXkJmtdZjtqZjv2wvYUkx3Fho7e1zmAwvr9RpSxpw
 *       
 */

authRouter.post("/login", loginValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return authController.handleLogin(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = authRouter;

/** 
 * @swagger
 * 
 * components: 
 *  schemas:
 *    Login:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: A valid email address
 *        password:
 *          type: string
 *          description: Must contain 8 characters and also a number, a capital letter and a special character
 *      example:
 *        email: john@doe.com
 *        password: Password123#
 * 
 * 
*/