import Chart from "react-apexcharts";
import { COLORS } from "@/constants/chart.constant";

const CustomerPayments = () => {
  const data = [
    {
      name: "PRODUCT A",
      data: [44, 55, 41, 67, 22, 43],
    },
  ];
  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row my-4 gap-4">
        <div className="w-full  border">
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
                  toolbar: {
                    show: true,
                  },
                  zoom: {
                    enabled: true,
                  },
                },
                colors: COLORS,
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      legend: {
                        position: "bottom",
                        offsetX: -10,
                        offsetY: 0,
                      },
                    },
                  },
                ],
                plotOptions: {
                  bar: {
                    horizontal: false,
                  },
                },
                xaxis: {
                  type: "datetime",
                  categories: [
                    "01/01/2011 GMT",
                    "01/02/2011 GMT",
                    "01/03/2011 GMT",
                    "01/04/2011 GMT",
                    "01/05/2011 GMT",
                    "01/06/2011 GMT",
                  ],
                },
                legend: {
                  position: "right",
                  offsetY: 40,
                },
                fill: {
                  opacity: 1,
                },
              }}
              series={data}
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
