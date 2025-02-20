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

const RevenueBreakdown = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row my-5 gap-4">
        <div className="w-full lg:w-2/3 border">
          <div className="bg-gray-200 ">
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
                            {["Labor", "Parts", "Tires", "SubContracts", "Shop Supplies", "EPA", "Fees","SubTotal","Discounts"].map((item) => (
                              <Tr key={item}>
                                <Td>{item}</Td>
                                <Td>0 %</Td>
                                <Td>$ 0</Td>
                              </Tr>
                            ))}
                            {[
                                
                              { label: "Post-Discount SubTotal", bold: true },
                              { label: "Taxes", bold: true },
                              { label: "TOTAL", bold: true, bg: "bg-gray-100" },
                            ].map(({ label, bold, bg }) => (
                              <Tr key={label} className={`${bold ? "text-gray-700 font-semibold" : ""} ${bg || ""}`}>
                                <Td>{label}</Td>
                                <Td></Td>
                                <Td>$ 0</Td>
                              </Tr>
                            ))}
                          </TBody>
                        </Table>
                      </div>
                      <div className="w-full md:w-1/3 flex justify-center items-center">
                        <Chart
                          options={{
                            colors: COLORS,
                            labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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
                          series={[44, 55, 13, 43, 99]}
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

