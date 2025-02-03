import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { apiStripepayment } from "./Services/WorkflowService";


const stripePromise = loadStripe("pk_test_51QcTfE2LkEUwrBDRFeBHaARCv8plgu5zSL1hldQZbLx6Z525g1xlrrFyzazZ6UJucbspdN0BZiXDJIyX7uT3CORt00nTlihDpS");

const CheckoutForm = ({ amount, orderNo }: { amount: number, orderNo: number }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null); 


  const handleStripePayment = async () => {
    try {
      const response = await apiStripepayment({ amount, orderNo }); 
      if (response && response.clientSecret) {
        setClientSecret(response.clientSecret); 
      } else {
        console.error("Failed to retrieve client secret");
      }
    } catch (error) {
      console.error("Error during Stripe payment:", error);
    }
  };

  
  useEffect(() => {
    handleStripePayment();
  }, [amount, orderNo]);

  const options = { clientSecret };

  return (
    <div id="checkout">
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : (
        <div>Loading...</div> 
      )}
    </div>
  );
};

export default CheckoutForm;
