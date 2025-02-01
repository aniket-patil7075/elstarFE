import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { apiStripepayment } from "./Services/WorkflowService";

const stripePromise = loadStripe("pk_test_51QcTfE2LkEUwrBDRFeBHaARCv8plgu5zSL1hldQZbLx6Z525g1xlrrFyzazZ6UJucbspdN0BZiXDJIyX7uT3CORt00nTlihDpS");

const CheckoutForm = () => {
    const fetchClientSecret = useCallback(() => {
        return fetch("/elstar-local/create-checkout-session", {
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => data.clientSecret);
      }, []);
      const options = {fetchClientSecret};
    
      return (
        <div id="checkout">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={options}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      )
}

export default CheckoutForm