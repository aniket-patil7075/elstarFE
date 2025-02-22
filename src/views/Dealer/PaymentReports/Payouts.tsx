import { Button } from '@/components/ui';
import React, { useState } from 'react'
import { HiDownload, HiOutlineAdjustments } from 'react-icons/hi';

const Payouts = () => {
    const [selectedFilter, setSelectedFilter] = useState("This Month");
    const filters = ["This Week", "This Month", "This Year", "All Time"];
  return (
    <div>
      <div>
        <div className="mb-5 ms-3">
          <h3 className="mb-4 lg:mb-0 ">Payouts</h3>
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
              // onClick={generateExcel}
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
              // onClick={generatePDF}
            >
              <HiDownload className="h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </div>
      <div>
        {/* <PaymentTypesTable
          estimate={data}
          filters={selectedFilter}
          setPaymentData={setPaymentData}
        /> */}
      </div>
    </div>
  )
}

export default Payouts