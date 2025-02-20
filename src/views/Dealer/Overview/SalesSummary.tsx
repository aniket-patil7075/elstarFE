import React from 'react'
import SalesSummaryCards from './SalesSummary/SalesSummaryCards'
import RevenueCustomerTrends from './SalesSummary/RevenueCustomerTrends'
import RevenueBreakdown from './SalesSummary/RevenueBreakdown'
import { Button, Input } from '@/components/ui'
import { HiDownload, HiOutlineAdjustments, HiOutlineSearch } from 'react-icons/hi'

const SalesSummary = () => {
  return (
    <div>
      <div>
        <div className="mb-5 ms-2">
          <h3 className="mb-4 lg:mb-0 ">Sales Summary</h3>
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
        <SalesSummaryCards/>
        <RevenueCustomerTrends />
        <RevenueBreakdown />
      </div>
    </div>
  )
}

export default SalesSummary