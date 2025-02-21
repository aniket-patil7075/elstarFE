// import Chart from "react-apexcharts";
// import { COLORS } from "@/constants/chart.constant";

// const RevenueCustomerTrends: React.FC<{ estimate: any[]; filters: any }> = ({ estimate, filters }) => {
//   const now = new Date();
//   let startDate;
//   let dateFormat;
//   let labels = [];
//   let dataMap = new Map();

//   if (filters === "This Week") {
//     startDate = new Date(now);
//     startDate.setDate(now.getDate() - 6);
//     dateFormat = { weekday: "short" };
//     for (let i = 6; i >= 0; i--) {
//       let date = new Date(now);
//       date.setDate(now.getDate() - i);
//       let label = date.toLocaleDateString("default", dateFormat);
//       labels.push(label);
//       dataMap.set(label, { invoiced: 0, payments: 0, payingCustomers: new Set(), lostSales: 0 });
//     }
//   } else if (filters === "This Month") {
//     startDate = new Date(now);
//     startDate.setMonth(now.getMonth() - 1);
//     dateFormat = { day: "numeric", month: "short" };
//     for (let i = 29; i >= 0; i--) {
//       let date = new Date(now);
//       date.setDate(now.getDate() - i);
//       let label = date.toLocaleDateString("default", dateFormat);
//       labels.push(label);
//       dataMap.set(label, { invoiced: 0, payments: 0, payingCustomers: new Set(), lostSales: 0 });
//     }
//   } else if (filters === "This Year") {
//     startDate = new Date(now);
//     startDate.setFullYear(now.getFullYear() - 1);
//     dateFormat = { month: "short", year: "numeric" };
//     for (let i = 11; i >= 0; i--) {
//       let date = new Date(now);
//       date.setMonth(now.getMonth() - i);
//       let label = date.toLocaleDateString("default", dateFormat);
//       labels.push(label);
//       dataMap.set(label, { invoiced: 0, payments: 0, payingCustomers: new Set(), lostSales: 0 });
//     }
//   }

//   estimate.forEach(order => {
//     const createdAt = new Date(order.createdAt);
//     if (createdAt >= startDate) {
//       const label = createdAt.toLocaleDateString("default", dateFormat);
//       if (dataMap.has(label)) {
//         const monthData = dataMap.get(label);
//         if (order.status === "Dropped Off") {
//           monthData.invoiced += (order.grandTotal || 0) + (order.remainingAmount || 0);
//         }
//         monthData.payments += order.grandTotal || 0;
//         if (order.customer?._id) {
//           monthData.payingCustomers.add(order.customer._id);
//         }
//         if (order.status === "Cancelled") {
//           monthData.lostSales += order.grandTotal || 0;
//         }
//       }
//     }
//   });

//   const finalData = Array.from(dataMap.values()).map(data => ({
//     ...data,
//     payingCustomers: data.payingCustomers.size
//   }));

//   const data = [
//     { name: "Invoiced", data: finalData.map(d => d.invoiced) },
//     { name: "Payments", data: finalData.map(d => d.payments) },
//     { name: "Paying Customers", data: finalData.map(d => d.payingCustomers) },
//     { name: "Lost Sales", data: finalData.map(d => d.lostSales) },
//   ];

//   return (
//     <div className="p-4">
//       <div className="flex flex-col lg:flex-row my-4 gap-4">
//         <div className="w-full lg:w-2/3 border">
//           <div className="bg-gray-100">
//             <h3 className="text-lg font-semibold py-3 px-4 text-center lg:text-left">
//               REVENUE & CUSTOMER TRENDS
//             </h3>
//           </div>
//           <div className="mt-4 p-4">
//             <Chart
//               options={{
//                 chart: { height: 350, type: "line", zoom: { enabled: false } },
//                 colors: [...COLORS],
//                 dataLabels: { enabled: false },
//                 stroke: { width: [3, 5, 3, 4], curve: "smooth", dashArray: [0, 8, 5, 3] },
//                 legend: {
//                   tooltipHoverFormatter: function (val, opts) {
//                     return `${val} - ${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]}`;
//                   },
//                 },
//                 markers: { size: 0, hover: { sizeOffset: 6 } },
//                 xaxis: { categories: labels },
//                 tooltip: {
//                   y: [
//                     { title: { formatter: (val) => `${val} (USD)` } },
//                     { title: { formatter: (val) => `${val} per session` } },
//                     { title: { formatter: (val) => val } },
//                   ],
//                 },
//                 grid: { borderColor: "#f1f1f1" },
//               }}
//               series={data}
//               height={300}
//             />
//           </div>
//         </div>
//         <div className="w-full lg:w-1/3 p-2"></div>
//       </div>
//     </div>
//   );
// };

// export default RevenueCustomerTrends;

import Chart from "react-apexcharts";
import { COLORS } from "@/constants/chart.constant";

const RevenueCustomerTrends: React.FC<{ estimate: any[]; filters: any }> = ({ estimate, filters }) => {
  const now = new Date();

  const isWithinFilterRange = (orderDateString: string) => {
    if (!orderDateString) return false;
    const orderDate = new Date(orderDateString);

    if (filters === "This Week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday to today
      return orderDate >= startOfWeek;
    } else if (filters === "This Month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // 1st of the month to today
      return orderDate >= startOfMonth;
    } else if (filters === "This Year") {
      const startOfYear = new Date(now.getFullYear(), 0, 1); // January to today
      return orderDate >= startOfYear;
    }
    return true;
  };

  // Generate labels for the selected filter range
  let labels = [];
  let dataMap = new Map();

  if (filters === "This Week") {
    for (let i = 0; i <= now.getDay(); i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - now.getDay() + i);
      const label = date.toLocaleDateString("default", { weekday: "short" });
      labels.push(label);
      dataMap.set(label, { invoiced: 0, payments: 0, payingCustomers: new Set(), lostSales: 0 });
    }
  } else if (filters === "This Month") {
    for (let i = 1; i <= now.getDate(); i++) {
      const label = `${i}`;
      labels.push(label);
      dataMap.set(label, { invoiced: 0, payments: 0, payingCustomers: new Set(), lostSales: 0 });
    }
  } else if (filters === "This Year") {
    for (let i = 0; i <= now.getMonth(); i++) {
      const date = new Date(now.getFullYear(), i, 1);
      const label = date.toLocaleString("default", { month: "short" });
      labels.push(label);
      dataMap.set(label, { invoiced: 0, payments: 0, payingCustomers: new Set(), lostSales: 0 });
    }
  }

  // Process order data and assign it to the corresponding period
  estimate.forEach(order => {
    const createdAt = new Date(order.createdAt);
    let label = "";

    if (filters === "This Week") {
      label = createdAt.toLocaleDateString("default", { weekday: "short" });
    } else if (filters === "This Month") {
      label = `${createdAt.getDate()}`;
    } else if (filters === "This Year") {
      label = createdAt.toLocaleString("default", { month: "short" });
    }

    if (dataMap.has(label) && isWithinFilterRange(order.paymentDate)) {
      const data = dataMap.get(label);
      if (order.status === "Dropped Off") {
        data.invoiced += (order.grandTotal || 0) + (order.remainingAmount || 0);
      }
      data.payments += order.grandTotal || 0;
      if (order.customer?._id) {
        data.payingCustomers.add(order.customer._id);
      }
      if (order.status === "Cancelled") {
        data.lostSales += order.grandTotal || 0;
      }
    }
  });

  // Convert Set to number and structure data
  const finalData = Array.from(dataMap.values()).map(data => ({
    ...data,
    payingCustomers: data.payingCustomers.size
  }));

  const data = [
    { name: "Invoiced", data: finalData.map(d => d.invoiced) },
    { name: "Payments", data: finalData.map(d => d.payments) },
    { name: "Paying Customers", data: finalData.map(d => d.payingCustomers) },
    { name: "Lost Sales", data: finalData.map(d => d.lostSales) },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row my-4 gap-4">
        <div className="w-full lg:w-2/3 border">
          <div className="bg-gray-100">
            <h3 className="text-lg font-semibold py-3 px-4 text-center lg:text-left">
              REVENUE & CUSTOMER TRENDS
            </h3>
          </div>
          <div className="mt-4 p-4">
            <Chart
              options={{
                chart: { height: 350, type: "line", zoom: { enabled: false } },
                colors: [...COLORS],
                dataLabels: { enabled: false },
                stroke: { width: [3, 5, 3, 4], curve: "smooth", dashArray: [0, 8, 5, 3] },
                legend: {
                  tooltipHoverFormatter: function (val, opts) {
                    return `${val} - ${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]}`;
                  },
                },
                markers: { size: 0, hover: { sizeOffset: 6 } },
                xaxis: { categories: labels },
                tooltip: {
                  y: [
                    { title: { formatter: val => `${val} ` } },
                    { title: { formatter: val => `${val} ` } },
                    { title: { formatter: val => val } },
                  ],
                },
                grid: { borderColor: "#f1f1f1" },
              }}
              series={data}
              height={300}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/3 p-2"></div>
      </div>
    </div>
  );
};

export default RevenueCustomerTrends;
