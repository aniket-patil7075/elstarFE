import React, { useEffect } from "react";
import Table from "@/components/ui/Table";
const { Tr, Th, Td, THead, TBody } = Table;

const PaymentTypesTable: React.FC<{ estimate: any[]; filters: string ;setPaymentData:any }> = ({
  estimate,
  filters,
  setPaymentData
}) => {
  const now = new Date();

  const isWithinFilterRange = (orderDateString: string) => {
    if (!orderDateString) return false;
    const orderDate = new Date(orderDateString);

    if (filters === "This Week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      return orderDate >= startOfWeek;
    } else if (filters === "This Month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return orderDate >= startOfMonth;
    } else if (filters === "This Year") {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      return orderDate >= startOfYear;
    }
    return true;
  };

  const filteredEstimate = estimate.filter(order => isWithinFilterRange(order.paymentDate));



  const getPaymentData = (type: any) => {
    const filteredPayments = filteredEstimate.filter(
      (item) =>
        item.paymentMethod &&
        item.paymentMethod.toLowerCase() === type.toLowerCase()
    );
    const totalAmount = filteredPayments.reduce(
      (sum, item) => sum + item.grandTotal,
      0
    );
    return { amount: totalAmount, count: filteredPayments.length };
  };

  const paymentTypes = ["Cash", "Card", "Check", "Other"];

  const cashCheckTotal =
    getPaymentData("cash").amount + getPaymentData("check").amount;
  const cashCheckCount =
    getPaymentData("cash").count + getPaymentData("check").count;

  const creditCardTotal =
    getPaymentData("card").amount +
    getPaymentData("visa").amount +
    getPaymentData("mastercard").amount +
    getPaymentData("other").amount;
  const creditCardCount =
    getPaymentData("card").count +
    getPaymentData("visa").count +
    getPaymentData("mastercard").count +
    getPaymentData("other").count;

  const grandTotal = filteredEstimate.reduce(
    (sum, item) => sum + (item.grandTotal || 0),
    0
  );
  const totalCount = cashCheckCount + creditCardCount;

  useEffect(() => {
    setPaymentData({
      paymentData: paymentTypes.map((type) => ({
        type,
        ...getPaymentData(type),
        percentage: grandTotal ? ((getPaymentData(type).amount / grandTotal) * 100).toFixed(2) : 0,
      })),
      summary: {
        cashCheckTotal,
        cashCheckCount,
        creditCardTotal,
        creditCardCount,
        grandTotal,
        totalCount
      }
    });
  }, [estimate, filters]);
  return (
    <div>
      <div className="flex flex-wrap justify-center my-3">
        <div className="w-full text-white p-3 rounded-lg">
          <div className="my-5">
            <Table>
              <THead>
                <Tr className="!text-black">
                  <Th className="!text-black">Payment Type</Th>
                  <Th className="!text-black">Amount</Th>
                  <Th className="!text-black">Count</Th>
                  <Th className="!text-black">Percentage</Th>
                </Tr>
              </THead>
              <TBody className="text-gray-500">
                {paymentTypes.map((type) => {
                  const { amount, count } = getPaymentData(type);
                  const percentage = grandTotal ? ((amount / grandTotal) * 100).toFixed(2) : 0;
                  return (
                    <tr key={type}>
                      <td>{type || "Payment Type"}</td>
                      <td>{amount ?? 0}</td>
                      <td>{count ?? 0}</td>
                      <td>{percentage}%</td>
                    </tr>
                  );
                })}
                <tr className="text-gray-700 font-semibold">
                  <td>Credit Card Total</td>
                  <td>{creditCardTotal ?? 0}</td>
                  <td>{creditCardCount ?? 0}</td>
                  <td>{grandTotal ? ((creditCardTotal / grandTotal) * 100).toFixed(2) : 0}%</td>
                </tr>
                <tr className="text-gray-700 font-semibold">
                  <td>Cash + Check Total</td>
                  <td>{cashCheckTotal ?? 0}</td>
                  <td>{cashCheckCount ?? 0}</td>
                  <td>{grandTotal ? ((cashCheckTotal / grandTotal) * 100).toFixed(2) : 0}%</td>
                </tr>
                <tr className="text-gray-700 font-bold bg-gray-100">
                  <td>TOTAL</td>
                  <td>{grandTotal ?? 0}</td>
                  <td>{totalCount ?? 0}</td>
                  <td>100%</td>
                </tr>
              </TBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PaymentTypesTable;