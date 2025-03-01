import { Button } from "@/components/ui";
import Table from "@/components/ui/Table";
import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { HiDownload, HiPlus, HiTrash } from "react-icons/hi";
import { getAllEstimates } from "../Services/WorkflowService";
const { Tr, Th, Td, THead, TBody } = Table;
import { jsPDF } from "jspdf";
type Estimate = {
  _id: string;
  orderNo: number;
  orderName: string;
  customer: string;
  vehicle: string;
  grandTotal: string;
  dueDate: string;
  paymentTerms: string;
  paymentDueDate: string;
  paidStatus: string;
  workflowStatus: string;
  inspectionStatus: string;
  status: string;
  isAuthorized: string;
  paymentMethod: string;
  remainingAmount: string;
  paymentDate: string;
};

const Billing = () => {
  const [data, setData] = useState<Estimate[]>([]);

  const estimateData = async () => {
    try {
      const response = await getAllEstimates();
      if (response?.status === "success") {
        const filteredEstimates = response.allEstimates.filter(
          (est: any) => est.estimateFlag === 0
        );
        setData(filteredEstimates);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching estimates:", error);
    }
  };

  useEffect(() => {
    estimateData();
  }, []);

  const processedData = data.map((item:any) => {
    const total = item.grandTotal + item.remainingAmount;
    const status = total === item.grandTotal ? "Paid" : "Pending";
    const statusColor =
      status === "Paid" ? "text-green-500" : "text-yellow-500";
    return { ...item, total, status, statusColor };
  }).filter((item) => item.total !== 0);;

  const generatePDF = (item:any) => {
    const doc = new jsPDF();

    doc.setFillColor(59, 130, 246); 
    doc.rect(0, 0, 210, 30, "F"); 
    doc.setTextColor(255, 255, 255); 
    doc.setFontSize(18);
    doc.text("Billing Details", 105, 20, { align: "center" });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Date: ${item.paymentDate}`, 14, 40);
    doc.text(`Total: $${item.total}`, 14, 50);
    doc.text(`Credits: $${item.grandTotal}`, 14, 60);
    doc.text(`Due: $${item.remainingAmount}`, 14, 70);
    doc.text(`Status: ${item.status}`, 14, 80);
    
    doc.save(`Billing_${item._id}.pdf`);
  };

  return (
    <div>
      <div className="mb-5 ms-2">
        <h3 className="mb-4 lg:mb-0 ">Billing</h3>
        <p className="text-gray-700">
          Use Pricing Matrix to systematize your parts markup and stramline your
          profits.
        </p>
      </div>
      <div className="">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full lg:w-4/6  ">
            <div className="border bg-gray-100">
              <div className="mx-5 my-5">
                <h5 className="text-gray-700">Payment Method</h5>
              </div>
              <div className="my-5">
                <div className="md:flex items-center justify-between mx-5">
                  <p className="text-gray-700">Visa card ending in 8448</p>
                  <p className="text-blue-500 cursor-pointer">Change Payment</p>
                </div>
                <div className="mx-5">
                  <p>Valid through 7/29</p>
                </div>
              </div>
            </div>

            <div className="border mt-5 ">
              <div className="md:flex items-center justify-between mx-5 my-5">
                <div className="">
                  <h5 className="text-gray-700">Invoices</h5>
                </div>
                <div className="flex gap-2 items-center"></div>
              </div>
              <div>
              {processedData.length > 0 ? (
                <Table>
                  <THead>
                    <Tr className="!text-gray-700">
                      <Th className="!text-gray-700">DATE</Th>
                      <Th className="!text-gray-700">TOTAL</Th>
                      <Th className="!text-gray-700">CREDITS</Th>
                      <Th className="!text-gray-700">DUE</Th>
                      <Th className="!text-gray-700">STATUS</Th>
                      <Th className="!text-gray-700">PDF</Th>
                    </Tr>
                  </THead>
                  <TBody className="text-gray-500">
                    {processedData.map((item) => (
                      <Tr key={item._id}>
                        <Td>{item.paymentDate}</Td>
                        <Td>${item.total}</Td>
                        <Td>${item.grandTotal}</Td>
                        <Td>${item.remainingAmount}</Td>
                        <Td className={item.statusColor}>{item.status}</Td>
                        <Td>
                          <button
                            className="text-blue-500 underline"
                            onClick={() => generatePDF(item)}
                          >
                            Download
                          </button>
                        </Td>
                      </Tr>
                    ))}
                  </TBody>
                </Table>
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No invoices or bills available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
