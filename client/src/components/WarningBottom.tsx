import { Link } from "react-router-dom";

export function WarningBottom({label, to, buttonText}: any) {
    return (
      <div className="text-sm mt-5 flex justify-center">
          <div>
            {label}
          </div>
          <Link to={to} className="pointer underline pl-2 cursor-pointer">
            {buttonText}
          </Link>
      </div>
    )
  }