export const formatPaginationResponse = (
  data,
  lastEvaluatedKey,
  route,
  message,
  error
) => {
  try {
    const response = {
      data: [],
      error: false,
      lastEvaluatedKey: null,
      message: "",
      route: "",
    };
    return {
      ...response,
      data,
      lastEvaluatedKey,
      route,
      message: message || "",
      error: error || false,
    };
  } catch (error) {
    console.log("this is error in format response handler %j", error);
    return { ...error, error: true, message: error, route };
  }
};

export const formatResponse = (data, route, message, error) => {
  try {
    const response = {
      data: [],
      error: false,
      message: "",
      route: "",
    };
    return {
      ...response,
      data,
      route,
      message: message || "",
      error: error || false,
    };
  } catch (error) {
    console.log("this is error in format response handler %j", error);
    return { ...error, error: true, message: error, route };
  }
};
