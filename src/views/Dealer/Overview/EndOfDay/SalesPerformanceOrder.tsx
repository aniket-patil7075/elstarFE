import React from 'react'

const SalesPerformanceOrder = () => {
  return (
    <div>
        <div className="flex flex-wrap justify-center my-4">
          <div className="w-full sm:w-1/3 text-white p-3  rounded-lg">
            <h3 className="mb-4 lg:mb-0 text-lg ">Sales Summary</h3>
            <p className="text-gray-600">
              How effectively is your team presenting , closing work?
            </p>
            <div className="border border-gray-300 my-3 bg-gray-100">
              <div className="flex flex-col w-full text-black">
                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Total Estimates</span>
                  <span className="text-end">0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Total Invoices</span>
                  <span className="text-end">0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Total Orders</span>
                  <span className="text-end">0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Unpaid/Partial Invoices</span>
                  <span className="text-end">0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Fully Paid Invoices</span>
                  <span className="text-end">0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Estimated Hours</span>
                  <span className="text-end">0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Invoiced Hours</span>
                  <span className="text-end">0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Close Rate</span>
                  <span className="text-end">0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/3  text-white p-3  rounded-lg">
            <h3 className="mb-4 lg:mb-0 text-lg ">Performance Summary</h3>
            <p className="text-gray-600">
              How is your shop's overall performance?
            </p>
            <div className="border border-gray-300 my-3 bg-gray-100">
              <div className="flex flex-col w-full text-black">
                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Avg. Sales</span>
                  <span className="text-end">$ 0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Avg. Order Profit</span>
                  <span className="text-end">$ 0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Avg. Order Profit Margin</span>
                  <span className="text-end">0 %</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Gross Sales</span>
                  <span className="text-end">$ 0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Gross Profit</span>
                  <span className="text-end">$ 0/hr</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Total Labor Cost</span>
                  <span className="text-end">$ 0/hr</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Effective Labor Rate</span>
                  <span className="text-end">$ 0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/3  text-white p-3  rounded-lg">
            <h3 className="mb-4 lg:mb-0 text-lg ">Order Summary</h3>
            <p className="text-gray-600">
              How much of your invoice totals will result in revenue?
            </p>
            <div className="border border-gray-300 my-3 bg-gray-100">
              <div className="flex flex-col w-full text-black">
                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Line Item Total</span>
                  <span className="text-end">$ 0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Fees</span>
                  <span className="text-end">$ 0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Discounts</span>
                  <span className="text-end">$ 0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">EPA</span>
                  <span className="text-end">$ 0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Shop Supplies</span>
                  <span className="text-end">$ 0</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Taxes</span>
                  <span className="text-end">$ 0</span>
                </div>

                <div className="flex justify-between py-2 px-4 font-bold">
                  <span className="text-start">TOTAL</span>
                  <span className="text-end">$ 0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SalesPerformanceOrder