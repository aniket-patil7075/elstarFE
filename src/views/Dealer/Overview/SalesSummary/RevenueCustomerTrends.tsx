import Chart from "react-apexcharts";
import { COLOR_2 } from "@/constants/chart.constant";

const RevenueCustomerTrends = () => {
  const data = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];
  return (
    <div>
      <div className="flex my-4">
        <div className="w-2/3 border">
          <div className="bg-gray-100">
            <h3 className="mb-4 lg:mb-0 text-lg py-3 px-4">REVENUE & CUSTOMER TRENDS</h3>
          </div>
          <div className="mt-4">
          <Chart
            options={{
              chart: {
                type: "line",
                zoom: {
                  enabled: false,
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              colors: [COLOR_2],
              xaxis: {
                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                ],
              },
            }}
            series={data}
            height={300}
          />
          </div>
        </div>
        <div className="w-1/3 p-2"></div>
      </div>
    </div>
  );
};

export default RevenueCustomerTrends;
