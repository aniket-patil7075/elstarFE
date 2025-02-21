import Card from "@/components/ui/Card";

const SalesSummaryCards : React.FC<{ estimate: any[]; filters: any }> = ({ estimate, filters }) => {

    const now = new Date();

    const isWithinFilterRange = (orderDateString: string) => {
      if (!orderDateString) return false; 
      const orderDate = new Date(orderDateString);
  
      if (filters === "This Week") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); 
        return orderDate >= startOfWeek;
      } else if (filters === "This Month") {
        return (
          orderDate.getFullYear() === now.getFullYear() &&
          orderDate.getMonth() === now.getMonth()
        );
      } else if (filters === "This Year") {
        return orderDate.getFullYear() === now.getFullYear();
      }
      return true; 
    };
  

    const filteredPayments = estimate.filter((order) =>
      isWithinFilterRange(order.paymentDate)
    );
  

    const filteredOrders = estimate.filter((order) =>
      isWithinFilterRange(order.createdAt)
    );
  
    const invoiced = filteredPayments
      .filter((order) => order.status === "Dropped Off")
      .reduce((acc, order) => acc + (order.grandTotal || 0) + (order.remainingAmount || 0), 0);
  
    const totalPayments = filteredPayments.reduce(
      (acc, order) => acc + (order.grandTotal || 0),
      0
    );
  
    const payingCustomers = new Set(
      filteredPayments.map((order) => order.customer?._id)
    ).size;
  
    const lostSales = filteredPayments
      .filter((order) => order.status === "Cancelled")
      .reduce((acc, order) => acc + (order.grandTotal || 0), 0);
  
    const totalRepairOrders = filteredOrders.length; 
    const averageRepairOrder = (totalRepairOrders > 0 ? totalPayments / totalRepairOrders : 0).toFixed(2);
  
    const averagePartsMargin = 0;
    
  return (
    <div className="flex ">
      <div className="w-full md:w-full lg:w-2/3 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-2">
            <Card className="bg-gray-100">
              <div className="flex items-center md:gap-4 lg:gap-6">
                <div className="w-1/5 flex justify-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full"></div>
                </div>
                <div className="w-4/5 text-black">
                  <div className="font-semibold">$ {invoiced ?? 0}</div>
                  <div>Invoiced</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="p-2">
            <Card className="bg-gray-100">
              <div className="flex items-center md:gap-4 lg:gap-6">
                <div className="w-1/5 flex justify-center">
                  <div className="w-10 h-10 bg-red-500 rounded-full"></div>
                </div>
                <div className="w-4/5 text-black">
                  <div className="font-semibold">$ {totalPayments ?? 0}</div>
                  <div>Payments</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="p-2">
            <Card className="bg-gray-100">
              <div className="flex items-center md:gap-4 lg:gap-6">
                <div className="w-1/5 flex justify-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                </div>
                <div className="w-4/5 text-black">
                  <div className="font-semibold">{payingCustomers ?? 0}</div>
                  <div>Paying Customers</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="p-2">
            <Card className="bg-gray-100">
              <div className="flex items-center md:gap-4 lg:gap-6">
                <div className="w-1/5 flex justify-center">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>
                </div>
                <div className="w-4/5 text-black">
                  <div className="font-semibold">$ {lostSales ?? 0}</div>
                  <div>Lost Sales</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="p-2">
            <Card className="bg-gray-100">
              <div className="flex items-center md:gap-4 lg:gap-6">
                <div className="w-1/5 flex justify-center">
                  <div className="w-10 h-10 bg-pink-700 rounded-full"></div>
                </div>
                <div className="w-4/5 text-black">
                  <div className="font-semibold">$ {averageRepairOrder ?? 0}</div>
                  <div>Average Repair Order</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="p-2">
            <Card className="bg-gray-100">
              <div className="flex items-center md:gap-4 lg:gap-6">
                <div className="w-1/5 flex justify-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-full"></div>
                </div>
                <div className="w-4/5 text-black">
                  <div className="font-semibold">$ {averagePartsMargin ?? 0}</div>
                  <div>Average Parts Margin</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesSummaryCards;
