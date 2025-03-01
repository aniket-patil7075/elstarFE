import { Button, Card } from "@/components/ui";
import Avatar from "@/components/ui/Avatar/Avatar";
import React, { useEffect, useState } from "react";
import {
    HiDownload,
  HiOutlineAdjustments,
  HiOutlineCube,
  HiOutlineCurrencyDollar,
  HiOutlineTag,
} from "react-icons/hi";
import Table from "@/components/ui/Table";
const { Tr, Th, Td, THead, TBody } = Table;
import { NumericFormat } from "react-number-format";
import { getEstimates } from "../Services/WorkflowService";

type Estimate = {
    orderNo: number;
    orderName: string;
    customer: string;
    vehicle: string;
    grandTotal: string;
    dueDate: string;
    paymentTerms: string;
    paymentDueDate: string;
    paidStatus: string;
    workflowStatus: string;
    inspectionStatus: string;
    status: string;
    isAuthorized: string;
    paymentMethod: string;
  };

type StatisticCardProps = {
  icon: React.ReactNode;
  avatarClass: string;
  label: string;
  value?: number;
};

const StatisticCard = (props: StatisticCardProps) => {
  const { icon, avatarClass, label, value } = props;

  return (
    <Card bordered className="w-52 p-1 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className={avatarClass} icon={icon} />
        <div>
          <span className="text-sm">{label}</span>
          <h3 className="text-lg font-semibold">
            <NumericFormat thousandSeparator displayType="text" value={value} />
          </h3>
        </div>
      </div>
    </Card>
  );
};
const SalesTax = () => {
  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const filters = ["This Week", "This Month", "This Year", "All Time"];
  const [estimate, setEstimate] = useState<Estimate[]>([]);

  const estimateData = async () => {
    try {
      const response = await getEstimates();
      if (response?.status === "success") {
        setEstimate(response.allEstimates);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching estimates:", error);
    }
  };

  useEffect(() => {
    estimateData();
  }, []);

    
//   const calculateTotal = (
//     category: any,
//     subtotalKey: any,
//     discountKey = null
//   ) => {
//     return estimate.reduce((estTotal, estimate) => {
//       return (
//         estTotal +
//         estimate.services.reduce((serviceTotal: any, service: any) => {
//           return (
//             serviceTotal +
//             (service[category]?.reduce((total: any, item: any) => {
//               if (discountKey) {
//                 return total + (item.discount?.[discountKey] ?? 0);
//               }
//               return total + (item[subtotalKey] ?? 0);
//             }, 0) ?? 0)
//           );
//         }, 0)
//       );
//     }, 0);
//   };

//   const calculateTotalWithFixed = (category: any, subtotalKey: any) => {
//     return calculateTotal(category, subtotalKey).toFixed(2);
//   };

//   const totalLaborSubtotal = calculateTotalWithFixed("labors", "subtotal");
//   const totalPartsSubtotal = calculateTotalWithFixed("parts", "partSubtotal");
//   const totalTiresSubtotal = calculateTotalWithFixed("tires", "tireSubtotal");
//   const totalSubcontractSubtotal = calculateTotalWithFixed(
//     "subcontract",
//     "subTotal"
//   );
//   const totalFeesSubtotal = calculateTotalWithFixed("fees", "subTotal");

//   const totalLaborDiscount = calculateTotal("labors", "subtotal", "value");
//   const totalPartsDiscount = calculateTotal("parts", "partSubtotal", "value");
//   const totalTiresDiscount = calculateTotal("tires", "tireSubtotal", "value");
//   const totalSubcontractDiscount = calculateTotal(
//     "subcontract",
//     "subTotal",
//     "value"
//   );
//   const totalFeesDiscount = calculateTotal("fees", "subTotal", "value");
//   const totalSubtotal = (
//     Number(totalLaborSubtotal) +
//     Number(totalPartsSubtotal) +
//     Number(totalTiresSubtotal) +
//     Number(totalSubcontractSubtotal) +
//     Number(totalFeesSubtotal)
//   ).toFixed(2);
  
//   const totalDiscount = (
//     Number(totalLaborDiscount) +
//     Number(totalPartsDiscount) +
//     Number(totalTiresDiscount) +
//     Number(totalSubcontractDiscount) +
//     Number(totalFeesDiscount)
//   );


const filterEstimates = () => {
    const now = new Date();
    return estimate.filter((item) => {
      const createdAt = new Date(item.createdAt);
      switch (selectedFilter) {
        case "This Week":
          const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
          return createdAt >= startOfWeek;
        case "This Month":
          return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
        case "This Year":
          return createdAt.getFullYear() === now.getFullYear();
        default:
          return true; // "All Time"
      }
    });
  };
  
  const filteredEstimates = filterEstimates();
  
  const calculateTotal = (category:any, subtotalKey:any, discountKey = null) => {
    return filteredEstimates.reduce((estTotal, estimate) => {
      return (
        estTotal +
        estimate.services.reduce((serviceTotal:any, service:any) => {
          return (
            serviceTotal +
            (service[category]?.reduce((total:any, item:any) => {
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
  
  const calculateTotalWithFixed = (category:any, subtotalKey:any) => {
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
  ).toFixed(2);

  return (
    <div>
      <div className="mb-5 ms-2">
        <h3 className="mb-4 lg:mb-0 ">Sales Tax</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 max-w-2xl">
        <StatisticCard
          icon={<HiOutlineCube />}
          avatarClass="!bg-indigo-500"
          label="Taxes Collected"
          value="25"
        />
        <StatisticCard
          icon={<HiOutlineCurrencyDollar />}
          avatarClass="!bg-blue-400"
          label="Taxes owed"
          value="50"
        />
      </div>
      <div className="md:flex items-center justify-between mt-5">
          <div className="md:flex items-center gap-4">
            <div className="relative w-full sm:w-52 md:w-60">
              <select
                className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filters.map((filter, index) => (
                  <option key={index} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 items-center mb-4 ">
            <Button
              block
              size="sm"
            //   onClick={generateExcel}
              icon={<HiDownload />}
            >
              Export
            </Button>
            <Button size="sm" className=" flex items-center gap-1">
              <HiOutlineAdjustments className="text-lg" />
              Customize
            </Button>
            <Button
              className=" flex items-center gap-1"
              variant="solid"
              size="sm"
            //   onClick={generatePDF}
            >
              <HiDownload className="h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      <div className="my-5">
        <Table>
          <THead>
            <Tr className="!text-black">
              {" "}
              <Th className="!text-black">Type </Th>
              <Th className="!text-black">Taxable</Th>
              <Th className="!text-black">Non-Taxable</Th>
              <Th className="!text-black">Tax-Exempt</Th>
              {/* <Th className="!text-black">SubTotal</Th> */}
              <Th className="!text-black">Discounts</Th>
              {/* <Th className="!text-black">Total Retail</Th>
              <Th className="!text-black">Total Cost</Th> */}
              <Th className="!text-black">Total Profit</Th>
            </Tr>
          </THead>
          <TBody className="text-gray-500">
            <Tr>
              <Td>Labor</Td>
              <Td>$ 0</Td>
              <Td>$ 0</Td>
              <Td>$ 0</Td>
              {/* <Td>$ {totalLaborSubtotal ?? 0}</Td> */}
              <Td>$ {totalLaborDiscount ?? 0}</Td>
              {/* <Td>$ 0</Td>
              <Td>$ 0</Td> */}
              <Td>$ 0</Td>
            </Tr>
            <Tr>
              <Td>Parts</Td>
              <Td>$ 0</Td>
              <Td>$ 0</Td>
              <Td>$ 0</Td>
              {/* <Td>$ {totalPartsSubtotal ?? 0}</Td> */}
              <Td>$ {totalPartsDiscount ?? 0}</Td>
              {/* <Td>$ 0</Td>
              <Td>$ 0</Td> */}
              <Td>$ 0</Td>
            </Tr>
            <Tr>
              <Td>Tires</Td>
              <Td>$ 0</Td>
              <Td>$ 0</Td>
              <Td>$ 0</Td>
              {/* <Td>$ {totalTiresSubtotal ?? 0}</Td> */}
              <Td>$ {totalTiresDiscount ?? 0}</Td>
              {/* <Td>$ 0</Td>
              <Td>$ 0</Td> */}
              <Td>$ 0</Td>
            </Tr>
            <Tr>
              <Td>SubContract</Td>
              <Td>$ 0</Td>
              <Td>$ 0</Td>
              <Td>$ 0</Td>
              {/* <Td>$ {totalSubcontractSubtotal ?? 0}</Td> */}
              <Td>$ {totalSubcontractDiscount ?? 0}</Td>
              {/* <Td>$ 0</Td>
              <Td>$ 0</Td> */}
              <Td>$ 0</Td>
            </Tr>
            <Tr>
              <Td>Fees</Td>
              <Td>$ 0</Td>
              <Td>$ 0</Td>
              <Td>$ 0</Td>
              {/* <Td>$ {totalFeesSubtotal ?? 0}</Td> */}
              <Td>$ {totalFeesDiscount ?? 0}</Td>
              {/* <Td>$ 0</Td>
              <Td>$ 0</Td> */}
              <Td>$ 0</Td>
            </Tr>
            <Tr className="text-gray-700 font-bold bg-gray-100">
              <Td>TOTAL</Td>
              <Td>$ 0</Td>
              <Td>$ 0</Td>
              <Td>$ 0</Td>
              {/* <Td>$ {totalSubtotal ?? 0}</Td> */}
              <Td>$ {totalDiscount ?? 0}</Td>
              {/* <Td>$ 0</Td>
              <Td>$ 0</Td> */}
              <Td>$ 0</Td>
            </Tr>
          </TBody>
        </Table>
      </div>
    </div>
  );
};

export default SalesTax;
