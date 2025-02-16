import { NextResponse } from "next/server";

const handleError = (error, message, statusCode = 500) => {
    console.error(message, error);
    return NextResponse.json(
      { success: false, message: message || "An unexpected error occurred." },
      { status: statusCode }
    );
  };
  
  // Utility function for success handling
  const handleSuccess = (data, message, statusCode = 200) => {
    return NextResponse.json(
      {
        success: true,
        message: message || "Request processed successfully.",
        data,
      },
      { status: statusCode }
    );
  };
  
  export { handleError, handleSuccess };
  