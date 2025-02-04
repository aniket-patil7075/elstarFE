import { Button, Card, Input, Radio } from "@/components/ui";
import React, { useEffect, useState } from "react";
import {
  apiRecordPayment,
  getEstimateById,
  updateCustomerRemainingAmount,
} from "../Services/WorkflowService";
import { toast } from "@/components/ui/toast";
import Notification from "@/components/ui/Notification";
import AddNewCardPaymentModal from "./AddNewCardPaymentModal";
import { getAllCustomers } from "../DealerLists/Services/DealerListServices";

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  customerAddress: object; // Adjust as needed based on the structure
  email: string[];
  phoneNumber: object[];
  remainingAmount: number;
  updatedAt: string;
  createdAt: string;
  fleet: object[];
  referralSource: object[];
  vehicle: object[];
  __v: number;
}

const PaymentModel = ({
  handleClosePaymentModel,
  estimateData,
  estimateGrandTotal,
  setPaymentSuccess,
}: any) => {
  const [value, setValue] = useState("");
  const [remainingGrandTotal, setRemainingGrandTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customerRemaining , setCustomerRemaining] = useState(0)

  const customerId = estimateData.customer._id;
  console.log(customerId);

  const estimateId = estimateData._id;
  const orderNo = estimateData.orderNo;

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const [paymentDetails, setPaymentDetails] = useState<any>({
    estimateId: estimateData._id,
    totalDue: estimateGrandTotal,
    amount: estimateData.grandTotal,
    date: new Date().toISOString().slice(0, 10),
    remainingAmount: 0,
    enteredAmount: 0,
    note: "",
    paidAmount: 0,
    paymentMethod: "",
  });

  const onChange = (val: string) => {
    setValue(val);
    setPaymentDetails({
      ...paymentDetails,
      paymentMethod: val,
    });
  };

  useEffect(() => {
    const formattedDate = new Date().toISOString().slice(0, 10);
    setPaymentDetails({
      ...paymentDetails,
      estimateId: estimateData._id,
      totalDue: estimateGrandTotal || 500,
      date: formattedDate,
    });
  }, [estimateData, estimateGrandTotal]);

  const handleAddNote = (event: any) => {
    setPaymentDetails({ ...paymentDetails, note: event.target.value });
  };

  const handleAmountChange = (event: any) => {
    const enteredAmount = parseFloat(event.target.value);
    setPaymentDetails({
      ...paymentDetails,
      enteredAmount: enteredAmount,
      paidAmount: isNaN(enteredAmount) ? 0 : enteredAmount,
    });
  };

  // Recalculate the remainingAmount based on the totalDue and paidAmount
  const maintotaldue = Number(
    (Number(paymentDetails.totalDue) + remainingGrandTotal).toFixed(2)
  );
  const remainingAmount = maintotaldue - paymentDetails.paidAmount;

  const handleUpdateRemainingAmount = async () => {
    try {
      const response = await updateCustomerRemainingAmount(
        customerId,
        formattedRemaining
      );
      if (response && response.success) {
        console.log("Customer remaining amount updated successfully");
      } else {
        console.error("Failed to update customer remaining amount");
      }
    } catch (error) {
      console.error("Error while updating customer remaining amount:", error);
    }
  };

  const recordPayment = async () => {
    try {
      const paymentData = {
        ...paymentDetails,
        remainingAmount: remainingAmount,
      };

      const response = await apiRecordPayment(paymentData);
      console.log("Data saved in backend: ", response);

      await handleUpdateRemainingAmount();

      toast.push(
        <Notification title="Success" type="success">
          Record Saved Successfully
        </Notification>
      );
      setPaymentSuccess(true);
      handleClosePaymentModel(false);
    } catch (error) {
      console.log("Error saving payment: ", error);
    }
  };

  const fetchCustomers = async () => {
    let customers = await getAllCustomers();
    const customer = customers.allCustomers.find(
      (cust: Customer) => cust._id === customerId
    );

    if (customer) {
      const customerRemainingAmount = customer.remainingAmount;
      setCustomerRemaining(customerRemainingAmount);
      console.log("Remaining Amount:", customerRemainingAmount);
    } else {
      console.log("Customer not found");
    }
  };
  useEffect(() => {
    const fetchEstimate = async () => {
      try {
        if (!estimateId) throw new Error("Order ID not found in the URL.");
        const response = await getEstimateById(estimateId);

        if (response?.status === "success" && response?.estimate?.grandTotal) {
          setRemainingGrandTotal(response.estimate.grandTotal);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEstimate();
    fetchCustomers();
  }, []);




const totalDue = (Number(paymentDetails.totalDue) + customerRemaining);
const remaining = totalDue - Number(paymentDetails.enteredAmount);
const formattedRemaining = parseFloat(remaining.toFixed(2));




  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[650px] h-[500px] rounded-lg shadow-lg relative border border-gray-200">
        <div className="flex justify-between items-center p-3 border-b">
          <h3 className="text-base font-semibold">Receive Payment</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => handleClosePaymentModel(false)}
          >
            ✕
          </button>
        </div>
        <div className="overflow p-4 flex h-6/6">
          <div className="w-7/12 mr-2">
            <Card>
              <div className="flex">
                <h5 className="m-2">$</h5>
                <Input
                  type="text"
                  pattern="^[+]?\d+(\.\d+)?$"
                  placeholder="Enter Amount"
                  onChange={handleAmountChange}
                />
              </div>
            </Card>
            <br />
            <div>
              <label className="font-black">Date</label>
              <Input value={paymentDetails.date} disabled />
            </div>
            <div className="mt-5">
              <label className="font-black">Payment Option</label>
              <Radio.Group value={value} onChange={onChange}>
                <Radio value={"cash"}>Cash Payment</Radio>
                <Radio value={"card"}>Card Payment</Radio>
                <Radio value={"mobile"}>Mobile Payment</Radio>
              </Radio.Group>
            </div>
            <br />
            <label className="font-black">Note</label>
            <Input
              onChange={handleAddNote}
              value={paymentDetails.note || ""}
              placeholder="eg. Payment for entire order"
            />
            <br />
            <Button
              variant="solid"
              className="w-full mt-4"
              onClick={() => {
                if (value === "cash") {
                  recordPayment(); // Call recordPayment if cash is selected
                } else if (value === "card") {
                  setIsModalVisible(true); // Show modal if card is selected
                }
              }}
            >
              Record $
              {paymentDetails.paidAmount &&
                paymentDetails.paidAmount.toFixed(2)}
            </Button>
          </div>
          <div className="h-full border-l mr-2"></div>
          <div className="w-6/12">
            <h5>Invoice #{estimateData.orderNo}</h5>
            <div className="flex items-center justify-between mb-1 mt-4">
              <p>Not yet Authorized</p>
              <p>$0.00</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p>Authorized</p>
              <p>{paymentDetails.totalDue.toFixed(2)}</p>
            </div>
            <div className="w-full border-t"></div>
            <div className="flex items-center justify-between mt-3 mb-2">
              <p className="font-extrabold">Total Due</p>
              <p className="font-extrabold">
                {" "}
                {totalDue}
              </p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p>Paid To Date</p>
              <p>{paymentDetails.paidAmount.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p>Amount</p>
              <p>{paymentDetails.totalDue.toFixed(2)}</p>
            </div>
            <div className="w-full border-t"></div>
            <div className="flex text-emerald-400 font-extrabold items-center justify-between mt-3 mb-2">
              <p>Remaining</p>
              <p>{formattedRemaining}</p>
            </div>
            <div className="flex items-center justify-between mt-5 mb-2">
              <p className="font-semibold">PAYMENTS</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p>No transactions yet</p>
            </div>
          </div>
        </div>
      </div>
      {isModalVisible ? (
        <AddNewCardPaymentModal
          amount={paymentDetails.paidAmount}
          orderNo={orderNo}
          formattedRemaining={formattedRemaining}
          closeModal={handleCloseModal}
        />
      ) : null}
    </div>
  );
};

export default PaymentModel;
