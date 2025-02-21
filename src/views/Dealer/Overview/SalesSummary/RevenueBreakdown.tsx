// import Tabs from "@/components/ui/Tabs";
// import Table from "@/components/ui/Table";
// import Chart from "react-apexcharts";
// import { COLORS } from "@/constants/chart.constant";
// const { Tr, Th, Td, THead, TBody } = Table;
// const { TabNav, TabList, TabContent } = Tabs;

// const RevenueBreakdown = () => {
//   return (
//     <div className="p-4">
//       <div className="flex flex-col lg:flex-row my-5 gap-4">
//         <div className="w-full lg:w-2/3 border ">
//           <div className="bg-gray-200 rounded-t-lg">
//             <h3 className="text-lg font-semibold py-3 px-4 text-center lg:text-left">
//               REVENUE BREAKDOWN
//             </h3>
//           </div>
//           <div className=" p-4">
//             <div>
//               <Tabs defaultValue="tab1">
//                 <TabList>
//                   <TabNav value="tab1">All Invoices</TabNav>
//                   <TabNav value="tab2">Paid Invoices</TabNav>
//                 </TabList>
//                 <div className="p-4">
//                   <TabContent value="tab1">
//                     <div className="flex">
//                       <div className="w-2/3 p-2">
//                         <div className="">
//                           <Table>
//                             <TBody>
//                               <Tr>
//                                 <Td>Labor</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr>
//                                 <Td>Parts</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr>
//                                 <Td>Tires</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr>
//                                 <Td>SubContracts</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr>
//                                 <Td>Shop Supplies</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr>
//                                 <Td>EPA</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr>
//                                 <Td>Fees</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr className="text-gray-700 font-semibold ">
//                                 <Td>SubTotal</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr className="text-gray-700 font-semibold ">
//                                 <Td>Discounts</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr className="text-gray-700 font-semibold ">
//                                 <Td>Post-Discount SubTotal</Td>
//                                 <Td></Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr className="text-gray-700 font-semibold ">
//                                 <Td>Taxes</Td>
//                                 <Td></Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr className="text-gray-700 font-bold bg-gray-100">
//                                 <Td>TOTAL</Td>
//                                 <Td></Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                             </TBody>
//                           </Table>
//                         </div>
//                       </div>
//                       <div className="w-1/3  flex justify-center item-center">
//                         <div className="my-auto">
//                           <Chart
//                             options={{
//                               colors: COLORS,
//                               labels: [
//                                 "Team A",
//                                 "Team B",
//                                 "Team C",
//                                 "Team D",
//                                 "Team E",
//                               ],
//                               legend: {
//                                 show: false,
//                               },
//                               responsive: [
//                                 {
//                                   breakpoint: 480,
//                                   options: {
//                                     chart: {
//                                       width: 200,
//                                     },
//                                     legend: {
//                                       position: "bottom",
//                                     },
//                                   },
//                                 },
//                               ],
//                             }}
//                             series={[44, 55, 13, 43, 99]}
//                             height={300}
//                             type="pie"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </TabContent>
//                   <TabContent value="tab2">
//                     <div className="flex">
//                       <div className="w-2/3 p-2">
//                         <div className="">
//                           <Table>
//                             <TBody>
//                               <Tr>
//                                 <Td>Labor</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr>
//                                 <Td>Parts</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr>
//                                 <Td>Tires</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr>
//                                 <Td>SubContracts</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr>
//                                 <Td>Shop Supplies</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr>
//                                 <Td>EPA</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr>
//                                 <Td>Fees</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr className="text-gray-700 font-semibold ">
//                                 <Td>SubTotal</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr className="text-gray-700 font-semibold ">
//                                 <Td>Discounts</Td>
//                                 <Td>0 %</Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr className="text-gray-700 font-semibold ">
//                                 <Td>Post-Discount SubTotal</Td>
//                                 <Td></Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr className="text-gray-700 font-semibold ">
//                                 <Td>Taxes</Td>
//                                 <Td></Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                               <Tr className="text-gray-700 font-bold bg-gray-100">
//                                 <Td>TOTAL</Td>
//                                 <Td></Td>
//                                 <Td>$ 0</Td>
//                               </Tr>
//                             </TBody>
//                           </Table>
//                         </div>
//                       </div>
//                       <div className="w-1/3  flex justify-center item-center">
//                         <div className="my-auto">
//                           <Chart
//                             options={{
//                               colors: COLORS,
//                               labels: [
//                                 "Team A",
//                                 "Team B",
//                                 "Team C",
//                                 "Team D",
//                                 "Team E",
//                               ],
//                               legend: {
//                                 show: false,
//                               },
//                               responsive: [
//                                 {
//                                   breakpoint: 480,
//                                   options: {
//                                     chart: {
//                                       width: 200,
//                                     },
//                                     legend: {
//                                       position: "bottom",
//                                     },
//                                   },
//                                 },
//                               ],
//                             }}
//                             series={[44, 55, 13, 43, 99]}
//                             height={300}
//                             type="pie"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </TabContent>
//                 </div>
//               </Tabs>
//             </div>
//           </div>
//         </div>
//         <div className="w-full lg:w-1/3 p-2"></div>
//       </div>
//     </div>
//   );
// };

// export default RevenueBreakdown;

import Tabs from "@/components/ui/Tabs";
import Table from "@/components/ui/Table";
import Chart from "react-apexcharts";
import { COLORS } from "@/constants/chart.constant";

const { Tr, Th, Td, THead, TBody } = Table;
const { TabNav, TabList, TabContent } = Tabs;

const RevenueBreakdown: React.FC<{ estimate: any[]; filters: any }> = ({
  estimate,
  filters,
}) => {
  console.log("Estimate in pie : ", estimate);
  console.log("Filters in pie : ", filters);
  const today = new Date();

  const getStartDate = (filter: any) => {
    const startDate = new Date();
    switch (filter) {
      case "This Week":
        startDate.setDate(today.getDate() - today.getDay());
        break;
      case "This Month":
        startDate.setDate(1);
        break;
      case "This Year":
        startDate.setMonth(0, 1);
        break;
      case "All Time":
        return null;
      default:
        return today;
    }
    return startDate;
  };

  const startDate = getStartDate(filters);

  const filteredEstimates = estimate.filter((order) => {
    const createdDate = new Date(order.createdAt);
    const updatedDate = new Date(order.updatedAt);

    if (!startDate) return true;
    return createdDate >= startDate || updatedDate >= startDate;
  });

  const calculateTotal = (
    category: any,
    subtotalKey: any,
    discountKey = null
  ) => {
    return filteredEstimates.reduce((estTotal, estimate) => {
      return (
        estTotal +
        estimate.services.reduce((serviceTotal: any, service: any) => {
          return (
            serviceTotal +
            (service[category]?.reduce((total: any, item: any) => {
              if (discountKey) {
                return total + (item.discount?.[discountKey] ?? 0);
              }
              return total + (item[subtotalKey] ?? 0);
            }, 0) ?? 0)
          );
        }, 0)
      );
    }, 0);
  };

  const calculateTotalWithFixed = (category: any, subtotalKey: any) => {
    return calculateTotal(category, subtotalKey).toFixed(2);
  };

  const totalLaborSubtotal = parseFloat(
    calculateTotalWithFixed("labors", "subtotal")
  );
  const totalPartsSubtotal = parseFloat(
    calculateTotalWithFixed("parts", "partSubtotal")
  );
  const totalTiresSubtotal = parseFloat(
    calculateTotalWithFixed("tires", "tireSubtotal")
  );
  const totalSubcontractSubtotal = parseFloat(
    calculateTotalWithFixed("subcontract", "subTotal")
  );
  const totalShopSuppliesSubtotal = parseFloat(
    calculateTotalWithFixed("shopsupplies", "subTotal")
  );
  const totalEPASubtotal = parseFloat(
    calculateTotalWithFixed("epa", "subTotal")
  );
  const totalFeesSubtotal = parseFloat(
    calculateTotalWithFixed("fees", "subTotal")
  );

  const totalSubtotal = (
    totalLaborSubtotal +
    totalPartsSubtotal +
    totalTiresSubtotal +
    totalSubcontractSubtotal +
    totalFeesSubtotal
  ).toFixed(2);

  const getPercentage = (subtotal: any) => {
    return totalSubtotal !== "0.00"
      ? ((subtotal / parseFloat(totalSubtotal)) * 100).toFixed(2)
      : "0.00";
  };

  const labelColors : Record<string, string> = {
    Labor: COLORS[0],
    Parts: COLORS[1],
    Tires: COLORS[2],
    SubContracts: COLORS[3],
    ShopSupplies : COLORS[4],
    EPA : COLORS[5],
    Fees: COLORS[6],
  };
  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row my-5 gap-4">
        <div className="w-full lg:w-2/3 border">
          <div className="bg-gray-200">
            <h3 className="text-lg font-semibold py-3 px-4 text-center lg:text-left">
              REVENUE BREAKDOWN
            </h3>
          </div>
          <div className="p-4">
            <Tabs defaultValue="tab1">
              <TabList>
                <TabNav value="tab1">All Invoices</TabNav>
                <TabNav value="tab2">Paid Invoices</TabNav>
              </TabList>
              <div className="p-4">
                {["tab1", "tab2"].map((tab) => (
                  <TabContent key={tab} value={tab}>
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-2/3 p-2">
                        <Table>
                          <TBody>
                            {[
                              { label: "Labor", value: totalLaborSubtotal },
                              { label: "Parts", value: totalPartsSubtotal },
                              { label: "Tires", value: totalTiresSubtotal },
                              {
                                label: "SubContracts",
                                value: totalSubcontractSubtotal,
                              },
                              { label: "Shop Supplies", value: totalFeesSubtotal },
                              { label: "EPA", value: totalFeesSubtotal },
                              { label: "Fees", value: totalFeesSubtotal },

                            ].map(({ label, value }) => (
                              <Tr key={label}>
                                <Td>
                                  <span
                                    className="px-2 me-2"
                                    style={{ backgroundColor: labelColors[label] || "gray" }}
                                  ></span>
                                  {label}
                                </Td>
                                <Td>{getPercentage(value)} %</Td>
                                <Td>$ {value}</Td>
                              </Tr>
                            ))}
                            {[
                              { label: "SubTotal", value: totalSubtotal },
                              { label: "Discounts", value: "0.00" },
                              { label: "Post-Discount SubTotal", bold: true },
                              { label: "Taxes", bold: true },
                              { label: "TOTAL", bold: true, bg: "bg-gray-100" },
                            ].map(({ label, value, bold, bg }) => (
                              <Tr
                                key={label}
                                className={`${bold ? "text-gray-700 font-semibold" : ""} ${bg || ""}`}
                              >
                                <Td>{label}</Td>
                                <Td></Td>
                                <Td>$ {value}</Td>
                              </Tr>
                            ))}
                          </TBody>
                        </Table>
                      </div>
                      <div className="w-full md:w-1/3 flex justify-center items-center">
                        <Chart
                          options={{
                            colors: COLORS,
                            labels: [
                              "Labor",
                              "Parts",
                              "Tires",
                              "SubContracts",
                              "Fees",
                            ],
                            legend: { show: false },
                            responsive: [
                              {
                                breakpoint: 480,
                                options: {
                                  chart: { width: 200 },
                                  legend: { position: "bottom" },
                                },
                              },
                            ],
                          }}
                          series={[
                            totalLaborSubtotal,
                            totalPartsSubtotal,
                            totalTiresSubtotal,
                            totalSubcontractSubtotal,
                            totalFeesSubtotal,
                          ]}
                          height={300}
                          type="pie"
                        />
                      </div>
                    </div>
                  </TabContent>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
        <div className="w-full lg:w-1/3 p-2"></div>
      </div>
    </div>
  );
};

export default RevenueBreakdown;
