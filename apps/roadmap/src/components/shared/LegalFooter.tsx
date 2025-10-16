import { Link } from "react-router-dom";

function LegalFooter() {
  return (
    <div className="text-sm flex flex-col sm:flex-row gap-2 sm:gap-6 text-gray-500">
      <div>© Replyke {new Date().getFullYear()}</div>
      <Link
        to="/privacy-policy"
        target="_blank"
        className="hover:underline cursor-pointer"
      >
        Privacy Policy
      </Link>
      <Link
        to="/terms-and-conditions"
        target="_blank"
        className="hover:underline cursor-pointer"
      >
        Terms and Conditions
      </Link>
      <Link
        to="/refund-policy"
        target="_blank"
        className="hover:underline cursor-pointer"
      >
        Refund Policy
      </Link>
    </div>
  );
}

export default LegalFooter;
