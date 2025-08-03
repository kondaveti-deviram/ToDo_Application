const {body} = require("express-validator");

const deleteTasksValidator = [
  body("_id","Valid document id is required").notEmpty().isMongoId(),

];

module.exports = deleteTasksValidator;