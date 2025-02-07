import { Button } from "@/components/ui";
import { apiStripepayment } from "./Services/WorkflowService";
import CheckoutForm from "./CheckoutForm";
import AuthorizeEmail from "../auth/Emails/AuthorizeEmail";
const DealerDashboard = () => {
  
  return (
    
    <div>
      DealerDashboard
      <div>
        <Button
          variant="solid"
          className="w-25 mt-4"
        >
          Download
        </Button>
      </div>
      {/* <CheckoutForm/> */}
      {/* <AuthorizeEmail/> */}
    </div>
  );
};

export default DealerDashboard;
