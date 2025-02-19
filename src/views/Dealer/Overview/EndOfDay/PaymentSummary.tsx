import Table from "@/components/ui/Table";

const { Tr, Th, Td, THead, TBody } = Table;

const PaymentSummary: React.FC<{ estimate: any[] }> = ({ estimate }) => {
  const paymentTypes = [
    "Cash",
    "Card",
    "Check",
    "Other",
    "Visa",
    "MasterCard",
    "Other Cards",
    "Refunds",
  ];

  const getPaymentData = (type: any) => {
    const filteredPayments = estimate.filter(
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

  const cashCheckTotal =
    getPaymentData("cash").amount + getPaymentData("check").amount;
  const cashCheckCount =
    getPaymentData("cash").count + getPaymentData("check").count;

  const creditCardTotal =
  getPaymentData("card").amount +
    getPaymentData("visa").amount +
    getPaymentData("mastercard").amount +
    getPaymentData("other cards").amount;
  const creditCardCount =
  getPaymentData("card").count +
    getPaymentData("visa").count +
    getPaymentData("mastercard").count +
    getPaymentData("other cards").count;

  const grandTotal = estimate.reduce(
    (sum, item) => sum + (item.grandTotal || 0),
    0
  );
  const totalCount =
    cashCheckCount + creditCardCount ;

  return (
    <div>
      <div className="flex flex-wrap justify-center my-3">
        <div className="w-full  text-white p-3  rounded-lg">
          <h3 className="mb-4 lg:mb-0 text-lg ">Payment Summary</h3>
          <p className="text-gray-600">
            What payment should you be expecting in the bank?
          </p>
          <div className="my-5">
            <Table>
              <THead>
                <Tr className="!text-black">
                  {" "}
                  <Th className="!text-black">Payment Type</Th>
                  <Th className="!text-black">Amount</Th>
                  <Th className="!text-black">Count</Th>
                </Tr>
              </THead>
              <TBody className="text-gray-500">
                {paymentTypes.map((type) => {
                  const { amount, count } = getPaymentData(type);
                  return (
                    <tr key={type} className=" ">
                      <td className=" ">{type}</td>
                      <td className=" ">{amount}</td>
                      <td className=" ">{count}</td>
                    </tr>
                  );
                })}
                <tr className="text-gray-700 font-semibold ">
                  <td className="">Credit Card Total</td>
                  <td className="">{creditCardTotal}</td>
                  <td className="">{creditCardCount}</td>
                </tr>
                <tr className="text-gray-700 font-semibold ">
                  <td className="">Cash + Check Total</td>
                  <td className="">{cashCheckTotal}</td>
                  <td className="">{cashCheckCount}</td>
                </tr>
                <tr className="text-gray-700 font-bold ">
                  <td className="">TOTAL</td>
                  <td className="">{grandTotal}</td>
                  <td className="">{totalCount}</td>
                </tr>
              </TBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
