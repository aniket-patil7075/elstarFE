import { Button, Input } from '@/components/ui'
import React from 'react'
import { HiDownload, HiOutlineAdjustments, HiOutlineSearch } from 'react-icons/hi'

const EndOfDay = () => {

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
          <div className="flex gap-2 items-center mb-4">


            <Button block size="sm" icon={<HiDownload />}>
              Export
            </Button>
            <Button
              size="sm"
              className=" flex items-center gap-1"
            >
              <HiOutlineAdjustments className="text-lg" />
              Customize
            </Button>
            <Button

              className="mr-2 block lg:inline-block md:mb-0 mb-4"
              variant="solid"
              size="sm"
            >
              PDF
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap justify-center my-4">
          <div className="w-full sm:w-1/3 text-white p-3  rounded-lg">
            <h3 className="mb-4 lg:mb-0 text-lg ">Sales Summary</h3>
            <p className='text-gray-600'>How effectively is your team presenting , closing work?</p>
            <div className="border border-gray-300 my-3 bg-gray-100">
              <div className="flex flex-wrap">
                <div className="w-full md:w-2/3  text-black text-center ">
                  <div className="py-2 px-4 text-start">Total Estimates</div>
                  <div className="py-2 px-4 text-start">Total Invoices</div>
                  <div className="py-2 px-4 text-start">Total Orders</div>
                  <div className="py-2 px-4 text-start">Unpaid/Partial Invoices</div>
                  <div className="py-2 px-4 text-start">Fully Paid Invoices</div>
                  <div className="py-2 px-4 text-start">Estimated Hours</div>
                  <div className="py-2 px-4 text-start">Invoiced Hours</div>
                  <div className="py-2 px-4 text-start">Close Rate</div>
                </div>
                <div className="w-full md:w-1/3  text-black  text-center ">
                  <div className="py-2 px-4 text-end">0</div>
                  <div className="py-2 px-4 text-end">0</div>
                  <div className="py-2 px-4 text-end">0</div>
                  <div className="py-2 px-4 text-end">0</div>
                  <div className="py-2 px-4 text-end">0</div>
                  <div className="py-2 px-4 text-end">0</div>
                  <div className="py-2 px-4 text-end">0</div>
                  <div className="py-2 px-4 text-end">0</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/3  text-white p-3  rounded-lg">
            <h3 className="mb-4 lg:mb-0 text-lg ">Performance Summary</h3>
            <p className='text-gray-600'>How is your shop's overall performance?</p>
            <div className="border border-gray-300 my-3 bg-gray-100">
              <div className="flex flex-wrap">
                <div className="w-full md:w-2/3  text-black text-center ">
                  <div className="py-2 px-4 text-start">Avg. Sales</div>
                  <div className="py-2 px-4 text-start">Avg. Order Profit</div>
                  <div className="py-2 px-4 text-start">Avg. Order Profit Margin</div>
                  <div className="py-2 px-4 text-start">Gross Sales</div>
                  <div className="py-2 px-4 text-start">Gross Profit</div>
                  <div className="py-2 px-4 text-start">Total Labor Cost </div>
                  <div className="py-2 px-4 text-start">Effective Labor Rate</div>
  
                </div>
                <div className="w-full md:w-1/3  text-black  text-center ">
                  <div className="py-2 px-4 text-end">$ 0</div>
                  <div className="py-2 px-4 text-end">$ 0</div>
                  <div className="py-2 px-4 text-end">0 %</div>
                  <div className="py-2 px-4 text-end">$ 0</div>
                  <div className="py-2 px-4 text-end">$ 0/hr</div>
                  <div className="py-2 px-4 text-end">$ 0/hr</div>
                  <div className="py-2 px-4 text-end">$ 0</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/3  text-white p-3  rounded-lg">
            <h3 className="mb-4 lg:mb-0 text-lg ">Order Summary</h3>
            <p className='text-gray-600'>How much of your invoice totals will result in revenue?</p>
            <div className="border border-gray-300 my-3 bg-gray-100">
              <div className="flex flex-wrap">
                <div className="w-full md:w-2/3  text-black text-center ">
                  <div className="py-2 px-4 text-start">Line Item Total</div>
                  <div className="py-2 px-4 text-start">Fees</div>
                  <div className="py-2 px-4 text-start">Discounts</div>
                  <div className="py-2 px-4 text-start">EPA</div>
                  <div className="py-2 px-4 text-start">Shop Supplies</div>
                  <div className="py-2 px-4 text-start">Taxes</div>
                  <div className="py-2 px-4 text-start">TOTAL</div>
                </div>
                <div className="w-full md:w-1/3  text-black  text-center ">
                  <div className="py-2 px-4 text-end">$ 0</div>
                  <div className="py-2 px-4 text-end">$ 0</div>
                  <div className="py-2 px-4 text-end">$ 0</div>
                  <div className="py-2 px-4 text-end">$ 0</div>
                  <div className="py-2 px-4 text-end">$ 0</div>
                  <div className="py-2 px-4 text-end">$ 0</div>
                  <div className="py-2 px-4 text-end">$ 0.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndOfDay