import React, { useEffect, useState } from "react";
import PaymentTypesTable from "./PaymentTypes/PaymentTypesTable";
import { getEstimates } from "../Services/WorkflowService";
import { Button } from "@/components/ui";
import { HiDownload, HiOutlineAdjustments } from "react-icons/hi";
import { cloneDeep } from "lodash";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import saveAs from "file-saver";
import "jspdf-autotable";

type Estimate = {
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
};
const PaymentTypes = () => {
  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const filters = ["This Week", "This Month", "This Year", "All Time"];
  const [data, setData] = useState<Estimate[]>([]);

  const estimateData = async () => {
    try {
      const response = await getEstimates();
      if (response?.status === "success") {
        setData(response.allEstimates);
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

  const [paymentData, setPaymentData] = useState(null);

  const generatePDF = () => {
    if (!paymentData) return;

    const doc = new jsPDF();
    doc.text("Payment Summary", 14, 10);

    doc.autoTable({
      startY: 20,
      head: [["Payment Type", "Amount", "Count", "Percentage"]],
      body: [
        ...paymentData.paymentData.map((row) => [
          row.type,
          `$${row.amount}`,
          row.count,
          `${row.percentage}%`,
        ]),
        [
          "Credit Card Total",
          `$${paymentData.summary.creditCardTotal}`,
          paymentData.summary.creditCardCount,
          `${((paymentData.summary.creditCardTotal / paymentData.summary.grandTotal) * 100).toFixed(2)}%`,
        ],
        [
          "Cash + Check Total",
          `$${paymentData.summary.cashCheckTotal}`,
          paymentData.summary.cashCheckCount,
          `${((paymentData.summary.cashCheckTotal / paymentData.summary.grandTotal) * 100).toFixed(2)}%`,
        ],
        [
          "TOTAL",
          `$${paymentData.summary.grandTotal}`,
          paymentData.summary.totalCount,
          "100%",
        ],
      ],
      didParseCell: function (data) {
        if (data.section === "head") {
          data.cell.styles.fillColor = [79, 70, 229]; // #4F46E5 color
          data.cell.styles.textColor = [255, 255, 255]; // White text
          data.cell.styles.fontStyle = "bold"; // Bold text
        }
      },
    });

    doc.save("Payment_Types_Report.pdf");
  };

  const generateExcel = () => {
    if (!paymentData) return;
  
    const header = ["Payment Type", "Amount", "Count", "Percentage"];
    const body = paymentData.paymentData.map((row) => [
      row.type,
      `$${row.amount}`,
      row.count,
      `${row.percentage}%`,
    ]);
  
    const summary = [
      ["Credit Card Total", `$${paymentData.summary.creditCardTotal}`, paymentData.summary.creditCardCount, `${((paymentData.summary.creditCardTotal / paymentData.summary.grandTotal) * 100).toFixed(2)}%`],
      ["Cash + Check Total", `$${paymentData.summary.cashCheckTotal}`, paymentData.summary.cashCheckCount, `${((paymentData.summary.cashCheckTotal / paymentData.summary.grandTotal) * 100).toFixed(2)}%`],
      ["TOTAL", `$${paymentData.summary.grandTotal}`, paymentData.summary.totalCount, "100%"],
    ];
  
    const worksheet = XLSX.utils.aoa_to_sheet([header, ...body, ...summary]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payment Summary");
  
    XLSX.writeFile(workbook, "Payment_Types_Report.xlsx");
  };

  return (
    <div>
      <div>
        <div className="mb-5 ms-3">
          <h3 className="mb-4 lg:mb-0 ">Payment Types</h3>
        </div>
        <div className="md:flex items-center justify-between ms-3">
          <div className="md:flex items-center gap-4">
            <div className="relative w-full sm:w-52 md:w-60">
              <select
                className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filters.map((filter, index) => (
                  <option key={index} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 items-center mb-4 ">
            <Button
              block
              size="sm"
              onClick={generateExcel}
              icon={<HiDownload />}
            >
              Export
            </Button>
            <Button size="sm" className=" flex items-center gap-1">
              <HiOutlineAdjustments className="text-lg" />
              Customize
            </Button>
            <Button
              className=" flex items-center gap-1"
              variant="solid"
              size="sm"
              onClick={generatePDF}
            >
              <HiDownload className="h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </div>
      <div>
        <PaymentTypesTable
          estimate={data}
          filters={selectedFilter}
          setPaymentData={setPaymentData}
        />
      </div>
    </div>
  );
};

export default PaymentTypes;
