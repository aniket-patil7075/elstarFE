import { Button } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { HiDownload, HiOutlineAdjustments } from "react-icons/hi";
import CustomerPayments from "./SummaryByCustomer/CustomerPayments";
import { getEstimates } from "../Services/WorkflowService";
import CustPaymentTable from "./SummaryByCustomer/CustPaymentTable";

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

const SummaryByCustomer = () => {
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
  return (
    <div>
      <div className="mx-3">
        <div className="mb-5 ms-2">
          <h3 className="mb-4 lg:mb-0 ">Summary By Customer</h3>
        </div>
        <div className="md:flex items-center justify-between">
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
            <Button block size="sm" icon={<HiDownload />}>
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
            >
              PDF
            </Button>
          </div>
        </div>
      </div>
      <div>
        <CustomerPayments estimate={data} filters={selectedFilter} />
        <CustPaymentTable estimate={data} filters={selectedFilter} />
      </div>
    </div>
  );
};

export default SummaryByCustomer;
