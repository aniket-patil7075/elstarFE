import React from "react";
import Table from "@/components/ui/Table";
const { Tr, Th, Td, THead, TBody } = Table;

const CustPaymentTable: React.FC<{ estimate: any[]; filters: any }> = ({
  estimate,
  filters,
}) => {
  console.log("Estimate in customer payment:", estimate);
  console.log("Filters:", filters);
  const filteredData = estimate.filter((item) => {
    if (!item.paymentDate) return false;
    const paymentDate = new Date(item.paymentDate);
    const now = new Date();

    if (filters === "This Month") {
      return (
        paymentDate.getMonth() === now.getMonth() &&
        paymentDate.getFullYear() === now.getFullYear()
      );
    }
    if (filters === "This Week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return paymentDate >= weekAgo;
    }
    if (filters === "This Year") {
      return paymentDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  const customerPayments: Record<
    string,
    { firstName: string; lastName: string; company: string; totalPayment: number }
  > = {};

  filteredData.forEach((item) => {
    if (item.customer) {
      const { firstName, lastName, company } = item.customer;
      const key = `${firstName} ${lastName}`;

      if (!customerPayments[key]) {
        customerPayments[key] = { firstName, lastName, company, totalPayment: 0 };
      }

      customerPayments[key].totalPayment += item.grandTotal;
    }
  });

  const customerList = Object.values(customerPayments);
  const totalPaymentsSum = customerList.reduce((sum, customer) => sum + customer.totalPayment, 0);

  return (
    <div>
      <div className="flex flex-wrap justify-center my-3">
        <div className="w-full text-white p-3 rounded-lg">
          <div className="my-5">
            <Table>
              <THead>
                <Tr className="!text-black">
                  <Th className="!text-black">First Name</Th>
                  <Th className="!text-black">Last Name</Th>
                  <Th className="!text-black">Company</Th>
                  <Th className="!text-black">Total Payments</Th>
                  <Th className="!text-black">Profitability</Th>
                </Tr>
              </THead>
              <TBody className="text-gray-500">
                {customerList.map((customer, index) => (
                  <Tr key={index}>
                    <Td>{customer.firstName}</Td>
                    <Td>{customer.lastName}</Td>
                    <Td>{customer.company || "N/A"}</Td>
                    <Td>{customer.totalPayment.toFixed(2)}</Td>
                     <Td>{totalPaymentsSum ? ((customer.totalPayment / totalPaymentsSum) * 100).toFixed(2) : 0}%</Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustPaymentTable;
