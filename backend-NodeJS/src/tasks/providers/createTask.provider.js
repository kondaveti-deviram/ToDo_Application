const Task = require("../task.schema.js");
const{ matchedData } = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const logger = require("../../helpers/winston.helper.js");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function createTaskProvider(req, res) {
  const validatedData = matchedData(req);
  const task = new Task({...validatedData, user: req.user.sub});

  console.log(req.user);
  
  try{
    await task.save();
    return res.status(StatusCodes.CREATED).json(task);
  }
  catch (error){
    errorLogger("Error Creating a new task", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your error at the moment, please try later.",
    });
  }
}

module.exports = createTaskProvider;