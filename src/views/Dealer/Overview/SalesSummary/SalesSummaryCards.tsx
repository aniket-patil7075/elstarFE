import Card from "@/components/ui/Card";

const SalesSummaryCards = () => {
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
                  <div className="font-semibold">$ 0</div>
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
                  <div className="font-semibold">$ 0</div>
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
                  <div className="font-semibold">$ 0</div>
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
                  <div className="font-semibold">$ 0</div>
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
                  <div className="font-semibold">$ 0</div>
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
                  <div className="font-semibold">$ 0</div>
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
