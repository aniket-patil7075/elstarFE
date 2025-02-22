import { Button } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { HiDownload, HiOutlineAdjustments } from "react-icons/hi";
import CustomerPayments from "./SummaryByCustomer/CustomerPayments";
import { getEstimates } from "../Services/WorkflowService";
import AllPaymentsTable from "./AllPayments/AllPaymentsTable";

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

const AllPayments = () => {
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
          <h3 className="mb-4 lg:mb-0 ">All Payments</h3>
        </div>
        
      </div>
      <div>
        <AllPaymentsTable estimate={data} filters={selectedFilter} />
      </div>
    </div>
  );
};

export default AllPayments