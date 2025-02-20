import React from 'react'

const SalesPerformanceOrder : React.FC<{ estimate: any[] }> = ({ estimate }) => {

  // const totalEstimates = estimate.filter((order) => order.estimateFlag === 1).length;
  // const totalInvoices = estimate.filter((order) => order.estimateFlag === 0).length;
  // const totalOrders = estimate.length;
  // const unpaidPartialInvoices = estimate.filter((order) => order.remainingAmount > 0).length;
  // const fullyPaidInvoices = estimate.filter(
  //   (order) => order.isPaymentReceived === true && order.remainingAmount === 0
  // ).length;

  // const estimateHours = estimate.reduce((estTotal, order) => {
  //   return (
  //     estTotal +
  //     order.services.reduce((serviceTotal, service) => {
  //       return (
  //         serviceTotal +
  //         service.labors.reduce((laborTotal, labor) => {
  //           return laborTotal + (parseFloat(labor.hours) || 0);
  //         }, 0)
  //       );
  //     }, 0)
  //   );
  // }, 0);

  // const invoicedHours = estimateHours;

  // const closeRate = totalOrders > 0 ? ((fullyPaidInvoices / totalOrders) * 100).toFixed(2) : 0;

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

const filteredEstimates = estimate.filter((order) => {
  const createdDate = order.createdAt.split("T")[0];
  const updatedDate = order.updatedAt.split("T")[0];
  return createdDate === today || updatedDate === today;
});

const totalEstimates = filteredEstimates.filter((order) => order.estimateFlag === 1).length;
const totalInvoices = filteredEstimates.filter((order) => order.estimateFlag === 0).length;
const totalOrders = filteredEstimates.length;
const unpaidPartialInvoices = filteredEstimates.filter((order) => order.remainingAmount > 0).length;
const fullyPaidInvoices = filteredEstimates.filter(
  (order) => order.isPaymentReceived === true && order.remainingAmount === 0
).length;

const estimateHours = filteredEstimates.reduce((estTotal, order) => {
  return (
    estTotal +
    order.services.reduce((serviceTotal:any, service:any) => {
      return (
        serviceTotal +
        service.labors.reduce((laborTotal:any, labor:any) => {
          return laborTotal + (parseFloat(labor.hours) || 0);
        }, 0)
      );
    }, 0)
  );
}, 0);

const invoicedHours = estimateHours;
const closeRate = totalOrders > 0 ? ((fullyPaidInvoices / totalOrders) * 100).toFixed(2) : 0;



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
                  <span className="text-end">{totalEstimates}</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Total Invoices</span>
                  <span className="text-end">{totalInvoices}</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Total Orders</span>
                  <span className="text-end">{totalOrders}</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Unpaid/Partial Invoices</span>
                  <span className="text-end">{unpaidPartialInvoices}</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Fully Paid Invoices</span>
                  <span className="text-end">{fullyPaidInvoices}</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Estimated Hours</span>
                  <span className="text-end">{estimateHours}</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Invoiced Hours</span>
                  <span className="text-end">{invoicedHours}</span>
                </div>

                <div className="flex justify-between py-2 px-4">
                  <span className="text-start">Close Rate</span>
                  <span className="text-end">{closeRate}</span>
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