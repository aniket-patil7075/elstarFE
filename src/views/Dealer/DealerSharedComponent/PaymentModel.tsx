import { Button, Card, Input, Radio } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { apiRecordPayment, getEstimateById } from "../Services/WorkflowService";
import { toast } from "@/components/ui/toast";
import Notification from "@/components/ui/Notification";
import AddNewCardPaymentModal from "./AddNewCardPaymentModal";

const PaymentModel = ({
  handleClosePaymentModel,
  estimateData,
  estimateGrandTotal,
  setPaymentSuccess,
}: any) => {
  const [value, setValue] = useState("");
  const [remainingGrandTotal, setRemainingGrandTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const estimateId = estimateData._id;
  const orderNo = estimateData.orderNo;

  console.log(orderNo)
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const [paymentDetails, setPaymentDetails] = useState<any>({
    estimateId: estimateData._id,
    totalDue: estimateGrandTotal,
    amount: estimateData.grandTotal,
    date: new Date().toISOString().slice(0, 10),
    remainingAmount: 0,
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
    if (val === "card") {
      setIsModalVisible(true);
    }
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
      paidAmount: isNaN(enteredAmount) ? 0 : enteredAmount,
    });
  };

  // Recalculate the remainingAmount based on the totalDue and paidAmount
  const maintotaldue = Number(
    (Number(paymentDetails.totalDue) + remainingGrandTotal).toFixed(2)
  );
  const remainingAmount = maintotaldue - paymentDetails.paidAmount;

  // Ensure the remainingAmount is correctly calculated before sending
  const recordPayment = async () => {
    try {
      const paymentData = {
        ...paymentDetails,
        remainingAmount: remainingAmount, // Use the calculated remainingAmount here
      };


      const response = await apiRecordPayment(paymentData);
      console.log("Data saved in backend: ", response);

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
  }, []);

  console.log("Updated remainingGrandTotal:", remainingGrandTotal);

  

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
              onClick={recordPayment}
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
                {(
                  Number(paymentDetails.totalDue) + remainingGrandTotal
                ).toFixed(2)}
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
              <p>{remainingAmount.toFixed(2)}</p>
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
      {isModalVisible ? <AddNewCardPaymentModal amount={paymentDetails.paidAmount} orderNo={orderNo}  closeModal={handleCloseModal} /> : null}
    </div>
  );
};

export default PaymentModel;
