import Card from "@/components/ui/Card";

const SalesSummaryCards = () => {
  return (
    <div className="flex">
      <div className="w-2/3 p-2">
        <div className="flex gap-3">
          <div className="w-1/2 p-2">
            <Card className=" bg-gray-100">
              <div className="flex">
                <div className="w-1/5">
                  <div className="w-10 h-10 bg-green-500 rounded-full"></div>
                </div>
                <div className="w-4/5 text-black">
                  <div>$ 0</div>
                  <div>Invoices</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="w-1/2 p-2">
            <Card className=" bg-gray-100">
              <div className="flex">
                <div className="w-1/5">
                  <div className="w-10 h-10 bg-red-500 rounded-full"></div>
                </div>
                <div className="w-4/5 text-black">
                  <div>$ 0</div>
                  <div>Invoices</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-1/2 p-2">
            <Card className=" bg-gray-100">
              <div className="flex">
                <div className="w-1/5">
                  <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                </div>
                <div className="w-4/5 text-black">
                  <div>$ 0</div>
                  <div>Invoices</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="w-1/2 p-2">
            <Card className=" bg-gray-100">
              <div className="flex">
                <div className="w-1/5">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>
                </div>
                <div className="w-4/5 text-black">
                  <div>$ 0</div>
                  <div>Invoices</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-1/2 p-2">
            <Card className=" bg-gray-100">
              <div className="flex">
                <div className="w-1/5">
                  <div className="w-10 h-10 bg-red-500 rounded-full"></div>
                </div>
                <div className="w-4/5 text-black">
                  <div>$ 0</div>
                  <div>Invoices</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="w-1/2 p-2">
            <Card className=" bg-gray-100">
              <div className="flex">
                <div className="w-1/5">
                  <div className="w-10 h-10 bg-red-500 rounded-full"></div>
                </div>
                <div className="w-4/5 text-black">
                  <div>$ 0</div>
                  <div>Invoices</div>
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
