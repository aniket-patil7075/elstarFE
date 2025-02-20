import Table from "@/components/ui/Table";

const { Tr, Th, Td, THead, TBody } = Table;

const LineItemSummary: React.FC<{ estimate: any[] }> = ({ estimate }) => {


  // const calculateTotal = (category:any, subtotalKey:any, discountKey = null) => {
  //   return estimate.reduce((estTotal, estimate) => {
  //     return estTotal + estimate.services.reduce((serviceTotal:any, service:any) => {
  //       return serviceTotal + (service[category]?.reduce((total:any, item:any) => {
  //         if (discountKey) {
  //           return total + ((item.discount?.[discountKey] ?? 0)); 
  //         }
  //         return total + (item[subtotalKey] ?? 0);
  //       }, 0) ?? 0);
  //     }, 0);
  //   }, 0);
  // };
  

  // const calculateTotalWithFixed = (category:any, subtotalKey:any) => {
  //   return calculateTotal(category, subtotalKey).toFixed(2);
  // };

  // const totalLaborSubtotal = calculateTotalWithFixed("labors", "subtotal");
  // const totalPartsSubtotal = calculateTotalWithFixed("parts", "partSubtotal");
  // const totalTiresSubtotal = calculateTotalWithFixed("tires", "tireSubtotal");
  // const totalSubcontractSubtotal = calculateTotalWithFixed("subcontract", "subTotal");
  // const totalFeesSubtotal = calculateTotalWithFixed("fees", "subTotal");
  
  // const totalLaborDiscount = calculateTotal("labors", "subtotal", "value");
  // const totalPartsDiscount = calculateTotal("parts", "partSubtotal", "value");
  // const totalTiresDiscount = calculateTotal("tires", "tireSubtotal", "value");
  // const totalSubcontractDiscount = calculateTotal("subcontract", "subTotal", "value");
  // const totalFeesDiscount = calculateTotal("fees", "subTotal", "value");

  const today = new Date().toISOString().split("T")[0]; 

const filteredEstimates = estimate.filter((order) => {
  const createdDate = order.createdAt.split("T")[0];
  const updatedDate = order.updatedAt.split("T")[0];
  return createdDate === today || updatedDate === today;
});

const calculateTotal = (category: any, subtotalKey: any, discountKey = null) => {
  return filteredEstimates.reduce((estTotal, estimate) => {
    return estTotal + estimate.services.reduce((serviceTotal: any, service: any) => {
      return serviceTotal + (service[category]?.reduce((total: any, item: any) => {
        if (discountKey) {
          return total + ((item.discount?.[discountKey] ?? 0));
        }
        return total + (item[subtotalKey] ?? 0);
      }, 0) ?? 0);
    }, 0);
  }, 0);
};

const calculateTotalWithFixed = (category: any, subtotalKey: any) => {
  return calculateTotal(category, subtotalKey).toFixed(2);
};

const totalLaborSubtotal = calculateTotalWithFixed("labors", "subtotal");
const totalPartsSubtotal = calculateTotalWithFixed("parts", "partSubtotal");
const totalTiresSubtotal = calculateTotalWithFixed("tires", "tireSubtotal");
const totalSubcontractSubtotal = calculateTotalWithFixed("subcontract", "subTotal");
const totalFeesSubtotal = calculateTotalWithFixed("fees", "subTotal");

const totalLaborDiscount = calculateTotal("labors", "subtotal", "value");
const totalPartsDiscount = calculateTotal("parts", "partSubtotal", "value");
const totalTiresDiscount = calculateTotal("tires", "tireSubtotal", "value");
const totalSubcontractDiscount = calculateTotal("subcontract", "subTotal", "value");
const totalFeesDiscount = calculateTotal("fees", "subTotal", "value");

const totalSubtotal = (
  Number(totalLaborSubtotal) +
  Number(totalPartsSubtotal) +
  Number(totalTiresSubtotal) +
  Number(totalSubcontractSubtotal) +
  Number(totalFeesSubtotal)
).toFixed(2);

const totalDiscount = (
  Number(totalLaborDiscount) +
  Number(totalPartsDiscount) +
  Number(totalTiresDiscount) +
  Number(totalSubcontractDiscount) +
  Number(totalFeesDiscount)
);


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
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ {totalLaborSubtotal ?? 0}</Td> 
                  <Td>$ {totalLaborDiscount ?? 0}</Td> 
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                </Tr>
                <Tr>
                  <Td>Parts</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ {totalPartsSubtotal ?? 0}</Td> 
                  <Td>$ {totalPartsDiscount ?? 0}</Td> 
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                </Tr>
                <Tr>
                  <Td>Tires</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ {totalTiresSubtotal ?? 0}</Td> 
                  <Td>$ {totalTiresDiscount ?? 0}</Td> 
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                </Tr>
                <Tr>
                  <Td>SubContract</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ {totalSubcontractSubtotal ?? 0}</Td> 
                  <Td>$ {totalSubcontractDiscount ?? 0}</Td> 
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                </Tr>
                <Tr>
                  <Td>Fees</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ {totalFeesSubtotal ?? 0}</Td> 
                  <Td>$ {totalFeesDiscount ?? 0}</Td> 
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                </Tr>
                <Tr className="text-gray-700 font-bold bg-gray-100">
                  <Td>TOTAL</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ {totalSubtotal ?? 0 }</Td> 
                  <Td>$ {totalDiscount ?? 0 }</Td> 
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
                  <Td>$ 0</Td>
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
