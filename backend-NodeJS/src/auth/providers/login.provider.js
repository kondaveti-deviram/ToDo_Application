const Task = require("../../users/user.schema.js");
const {matchedData} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const getUserByEmail = require("../../users/providers/getUserByEmail.provider.js");
const bcrypt = require("bcrypt");
const generateTokenProvider = require("./generateTokenProvider.js")

async function loginProvider(req, res) {
  const validatedData = matchedData(req);
  console.log("Data",validatedData);
  try {

    const user = await getUserByEmail(validatedData.email);
    console.log(user);
    console.log("validatedData",validatedData.password);
    console.log("user",user.password)
    const result = await bcrypt.compare(validatedData.password, user.password);
    
    console.log("Password Match Result:",result);
    if(!result){
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please check your credentials",
      })
    }


    const token = generateTokenProvider(user);
    
    return res.status(StatusCodes.OK).json({
      accessToken: token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } 
  catch(error) {
    errorLogger("Error while trying to login", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = loginProvider;