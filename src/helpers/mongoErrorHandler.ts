import { ResponseModel } from '../models/DTOs/responseModel';


export class MongoErrorHandler {

  public static handleError(err): ResponseModel {
    // Log error.
    // logger.error(err.message);
    console.error(err);
    console.error(err.message);

    // Handle error.
    return ResponseModel.getInvalidResponse(this.getError(err));
  }

  private static getError(err) {
    if (err && err.name && err.name == 'ValidationError') {
      return [MongoErrorHandler.formatValidationErrorMessage(err.message)];
    }

    if (err && err.name && err.name == 'MongoError') {
      return [MongoErrorHandler.formatMongoErrorMessage(err)];
    }

    if (err && err.name && err.name == 'CastError') {
      return [MongoErrorHandler.formatCastErrorMessage(err)];
    }

    return ["Something went wrong! " + err.message];
  }

  private static formatValidationErrorMessage(message) {
    message = message.replace(/Path/g, '');
    message = message.replace(/`/g, '');
    //message = message.replace(/(/g, '');
    message = message.replace(/[.*+?^${}()|[\]\\]/g, '');
    //message = message.replace("Path", '');

    return message;
  }

  private static formatMongoErrorMessage(err) {
    var index;
    var data = {
      name: err.name,
      message: err.message,
      code: err.code
    };

    switch (err.code) {
      case 11000:
        //data.index = err.message ? err.message.split('$', 2)[1].split(' ', 2)[0].split('_', 2)[0] : "";
        index = err.message ? err.message.split("index")[1] : "";
        data.message = 'Duplicate key error.';
        break;
    }

    return data.message + ` Require unique value for field: ${index}`;
  }

  private static formatCastErrorMessage(err) {
    Object.keys(err).forEach(field => {
      console.log(field + " => " + err[field])
    });

    return `Field: ${err.path}'s value: ${err.value} is invalid! ${err.value} cann't be casted to ${err.kind}`;
  }

  private static formattedMessage(err) {
    var messages = {
      'required': "%s is required.",
      'min': "%s below minimum.",
      'max': "%s above maximum.",
      'enum': "%s not an allowed value.",
      'minlength': "%s value %s length is less than allowed value."
    };

    //A validationerror can contain more than one error.
    var errors = [];

    Object.keys(err).forEach(field => {
      console.log(field + " => " + err[field])
    })

    Object.keys(err.errors).forEach(field => {
      console.log(field + " ==> " + err.errors[field])
    })

    //Loop over the errors object of the Validation Error
    Object.keys(err.errors).forEach(function (field) {

      // Getting from .proprerties now.
      var eObj = err.errors[field].properties;

      Object.keys(eObj).forEach(key => {
        console.log(key + " ===> " + eObj[key]);
      })

      // If we have a message on the schema.
      //if (!eObj.hasOwnProperty("message")) errors.push(eObj.message);

      //If we don't have a message for `type`, just push the error through
      //else 
      //if (!messages.hasOwnProperty(eObj.kind)) errors.push(eObj.type);

      //Otherwise, use util.format to format the message, and passing the path
      //else 
      errors.push(messages[eObj.type], eObj.path, eObj.value);
    });

    console.log("Parsed: " + errors)
    return errors;
  }
}
