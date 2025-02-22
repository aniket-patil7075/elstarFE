import Chart from "react-apexcharts";
import { COLORS } from "@/constants/chart.constant";

const CustomerPayments: React.FC<{ estimate: any[]; filters: any }> = ({
  estimate,
  filters,
}) => {
  console.log("Estimate in customer payment:", estimate);
  console.log("Filters:", filters);

  const filteredData = estimate.filter((item) => {
    if (!item.paymentDate) return false; 
    const paymentDate = new Date(item.paymentDate);
    const now = new Date();

    if (filters === "This Month") {
      return (
        paymentDate.getMonth() === now.getMonth() &&
        paymentDate.getFullYear() === now.getFullYear()
      );
    }
    if (filters === "This Week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return paymentDate >= weekAgo;
    }
    if (filters === "This Year") {
      return paymentDate.getFullYear() === now.getFullYear();
    }
    return true; 
  });

  const customerPayments: Record<
    string,
    { firstName: string; lastName: string; totalPayment: number }
  > = {};

  filteredData.forEach((item) => {
    if (item.customer) {
      const { firstName, lastName } = item.customer;
      const key = `${firstName} ${lastName}`;

      if (!customerPayments[key]) {
        customerPayments[key] = { firstName, lastName, totalPayment: 0 };
      }

      customerPayments[key].totalPayment += item.grandTotal;
    }
  });

  const customerList = Object.values(customerPayments);

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row my-4 gap-4">
        <div className="w-full border">
          <div className="bg-gray-100">
            <h3 className="text-lg font-semibold py-3 px-4 text-center lg:text-left">
              CUSTOMER PAYMENTS
            </h3>
          </div>
          <div className="mt-4 p-4">
            <Chart
              options={{
                chart: {
                  stacked: true,
                  toolbar: { show: true },
                  zoom: { enabled: true },
                },
                colors: COLORS,
                xaxis: {
                  type: "category",
                  categories: customerList.map(
                    (customer) => `${customer.firstName} ${customer.lastName}`
                  ),
                },
                yaxis: {
                  labels: {
                    formatter: (value) => `${value}`, 
                  },
                },
                tooltip: {
                  y: {
                    formatter: (value) => `$${value}`, 
                  },
                },
                legend: { position: "right", offsetY: 40 },
                fill: { opacity: 1 },
              }}
              series={[
                {
                  name: "Total Payment",
                  data: customerList.map((customer) => customer.totalPayment),
                },
              ]}
              type="bar"
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPayments;
