const { StatusCodes, getReasonPhrase } 


= require("http-status-codes");

function responseFormatter(req, res, next) {
  // Store the original res.json function to a variable
  const originalJson = res.json;

  // Redefine res.json method
  res.json = (data) => {

    // Construct the standardized response structure
    const response = {
      status: res.statusCode >= 200 && res.statusCode < 300 ? "success" : "error",
      statusCode: res.statusCode,
      message: getReasonPhrase(res.statusCode),
    };

      if(res.statusCode >= 200 && res.statusCode < 300) {
        response.data = data.pagination? data.data : data;
      }
      
      if(data && data.pagination){
        response.pagination = data.pagination;
      }

      if(res.statusCode >= 300) {
        response.error = data;
      }



    // Call the original res.json function with the new response structure
    /**
     * Here’s what is happening:
     *
     * Function Invocation: originalJson is a reference to the original res.json method that was saved earlier in the middleware function. The call() method is used to invoke this originalJson function.
     *
     * Setting this: The first argument of call(), in this case, res, sets the this context for the function being called. This is crucial because the res.json method in Express needs to operate in the context of the specific response object (res) it is meant to handle. This ensures that the method behaves as if it were still part of the original res object.
     *
     * Arguments: The second argument, response, is the data that you want to send back to the client. This is passed as the argument to the originalJson function, effectively the payload for the res.json method.
     *
     * Purpose of Using call()
     * Preserve Functionality: By using call(), the middleware seamlessly integrates with Express's built-in response methods without disrupting their native functionalities. It allows the middleware to enhance or modify the response (by standardizing the response format in your case) without losing the context or functionality of the original res.json method.
     * Maintain Context: It ensures that despite redirecting the function call through middleware, the function still executes in the correct context (res), which is vital for methods that are tied to particular objects—in this case, the Express response object.
     * This approach is often used in middleware and libraries to extend or customize the behavior of existing methods while preserving their operational context and expected behavior.
     */
    originalJson.call(res, response);
  };

  next();
}

module.exports = responseFormatter;