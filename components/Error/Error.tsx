import { ERROR_TYPES } from "@/constants/constants";

const Error = ({ type }: ErrorProps) => {
  return (
    <div className="flex items-center justify-center p-4 grow">
      <h1>
        {type === ERROR_TYPES.SERVER_ERROR
          ? "Server Error. Please try again later."
          : type === ERROR_TYPES.NOT_FOUND
            ? "404 Not Found."
            : "Bad Request. Redirecting..."}
      </h1>
    </div>
  );
};

export default Error;
