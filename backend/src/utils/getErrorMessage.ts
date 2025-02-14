export const getErrorMessage = (err: unknown): string => {
  if (typeof err === "string") {
    return err;
  }

  if (err instanceof Error && err.message.includes("prisma")) {
    return "An error occurred while processing your request.";
  }

  if (err instanceof Error) {
    return err.message;
  }

  if (err && typeof err === "object" && "message" in err) {
    return String(err.message);
  }

  return "An unknown error occurred.";
};
