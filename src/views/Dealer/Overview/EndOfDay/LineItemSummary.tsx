import Table from "@/components/ui/Table";

const { Tr, Th, Td, THead, TBody } = Table;

const LineItemSummary = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center my-3">
        <div className="w-full  text-white p-3  rounded-lg">
          <h3 className="mb-4 lg:mb-0 text-lg ">Line Item Summary</h3>
          <p className="text-gray-600">
            How profitable are your individual line items?
          </p>
          <div className="my-5">
            <Table>
              <THead>
                <Tr className="!text-black">
                  {" "}
                  <Th className="!text-black"> </Th>
                  <Th className="!text-black">Taxable</Th>
                  <Th className="!text-black">Non-Taxable</Th>
                  <Th className="!text-black">Tax-Exempt</Th>
                  <Th className="!text-black">SubTotal</Th>
                  <Th className="!text-black">Discounts</Th>
                  <Th className="!text-black">Total Retail</Th>
                  <Th className="!text-black">Total Cost</Th>
                  <Th className="!text-black">Total Profit</Th>
                </Tr>
              </THead>
              <TBody className="text-gray-500">
                <Tr>
                  <Td>Labor</Td>
                </Tr>
                <Tr>
                  <Td>Parts</Td>
                </Tr>
                <Tr>
                  <Td>Tires</Td>
                </Tr>
                <Tr>
                  <Td>Subcontract</Td>
                </Tr>
                <Tr>
                  <Td>Fees</Td>
                </Tr>
                <Tr className="text-gray-700 font-bold">
                  <Td>TOTAL</Td>
                </Tr>
              </TBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineItemSummary;
