import { Button } from "@/components/ui";
import React, { useState } from "react";
import { HiDownload, HiOutlineAdjustments } from "react-icons/hi";
import CustomerPayments from "./SummaryByCustomer/CustomerPayments";

const SummaryByCustomer = () => {
  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const filters = ["This Week", "This Month", "This Year", "All Time"];
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
        <CustomerPayments />
        {/* <SalesSummaryCards estimate={data} filters={selectedFilter} />
      <RevenueCustomerTrends estimate={data} filters={selectedFilter} />
      <RevenueBreakdown estimate={data}  filters={selectedFilter} /> */}
      </div>
    </div>
  );
};

export default SummaryByCustomer;
