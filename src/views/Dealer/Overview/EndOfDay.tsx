import { Button, Input } from "@/components/ui";
import React, { useEffect, useState } from "react";
import {
  HiDownload,
  HiOutlineAdjustments,
  HiOutlineSearch,
} from "react-icons/hi";
import SalesPerformanceOrder from "./EndOfDay/SalesPerformanceOrder";
import LineItemSummary from "./EndOfDay/LineItemSummary";
import PaymentSummary from "./EndOfDay/PaymentSummary";
import { getAllEstimates, getEstimates } from "../Services/WorkflowService";

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

const EndOfDay = () => {
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
      <div>
        <div className="mb-5 ms-2">
          <h3 className="mb-4 lg:mb-0 ">End of Day</h3>
        </div>
        <div className="md:flex items-center justify-between">
          <div className="md:flex items-center gap-4">
            <Input
              className="w-full sm:w-52 md:w-60"
              size="sm"
              placeholder="Search "
              prefix={<HiOutlineSearch className="text-lg" />}
            />
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
        <SalesPerformanceOrder estimate={data} />
        <LineItemSummary estimate={data} />
        <PaymentSummary estimate={data} />
      </div>
    </div>
  );
};

export default EndOfDay;
