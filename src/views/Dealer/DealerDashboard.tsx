import { Button } from "@/components/ui";
import { apiStripepayment } from "./Services/WorkflowService";
import CheckoutForm from "./CheckoutForm";

const handleStripePayment = async () => {
    let stripe = await apiStripepayment();
};

const DealerDashboard = () => {
  return (
    <div>
      DealerDashboard
      <div>
        <Button
          variant="solid"
          className="w-25 mt-4"
          onClick={handleStripePayment}
        >
          Stripe
        </Button>
      </div>
      {/* <CheckoutForm/> */}
    </div>
  );
};

export default DealerDashboard;
