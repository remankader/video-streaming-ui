import axios from "axios";

// requests
export default function request(
  endpoint: string,
  method: string,
  payloadType?: "params" | "data",
  payload?: any,
  onUploadProgress?: (progressEvent: any) => void
): any {
  const req: any = {
    method,
    url: `${process.env.NEXT_PUBLIC_API_PATH}/${endpoint}`,
  };

  if (payloadType && payload) {
    if (payloadType === "params") {
      req.params = payload;
    } else {
      req.data = payload;
    }
  }

  if (onUploadProgress) {
    req.onUploadProgress = onUploadProgress;
  }

  return axios
    .request(req)
    .then((response: any) => {
      return filterSuccessResponse(response);
    })
    .catch((error) => {
      return filterErrorResponse(error.response);
    });
}

function messageFormatter(responseData: any) {
  /*
  api response message formats:
  1: message: "message string",
  2: message: {msg: "message string"},
  3: messages: [{ msg: "message string", optional_data }]
  */
  let messages = [];
  if (responseData?.messages) {
    messages = responseData.messages;
  } else if (responseData?.message) {
    if (
      typeof responseData.message === "object" &&
      !Array.isArray(responseData.message) &&
      responseData.message !== null
    ) {
      messages = [responseData.message];
    } else {
      messages = [{ msg: responseData.message }];
    }
  }

  if (!responseData?.success && !messages.length) {
    messages = [{ msg: "Something went wrong" }];
  }

  return messages;
}

// filter success response
function filterSuccessResponse(response: any) {
  const success = response.data?.success || true;
  const status = response.status || 200;
  const messages = messageFormatter(response.data);
  const data = response.data?.data || {};

  return { success, status, messages, data };
}

// filter error response
function filterErrorResponse(response: any) {
  const success = response?.data?.success || false;
  const status = response?.status || 400;
  const messages = messageFormatter(response?.data);
  const data = response?.data?.data || {};

  return { success, status, messages, data };
}
