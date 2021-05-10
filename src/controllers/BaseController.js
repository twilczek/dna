exports.BaseController = class BaseController {
  errorResponse(message) {
    return {
      success: false,
      message,
    };
  }
};
