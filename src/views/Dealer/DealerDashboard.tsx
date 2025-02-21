import { Button, Input } from "@/components/ui";
import { apiStripepayment, getAllEstimates } from "./Services/WorkflowService";
import CheckoutForm from "./CheckoutForm";
import AuthorizeEmail from "../auth/Emails/AuthorizeEmail";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  apiGetAllAppointment,
  getAllCustomers,
  getAllVehicles,
} from "./DealerLists/Services/DealerListServices";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import saveAs from "file-saver";
import {
  HiDownload,
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiTruck,
} from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getEstimatesByPage,
  getWorkflowTableCount,
  setTableData,
} from "./Workflow/store";
import { cloneDeep } from "lodash";
import { DataTable } from "@/components/shared";
import Table from "@/components/ui/Table/Table";
import THead from "@/components/ui/Table/THead";
import Tr from "@/components/ui/Table/Tr";
import Th from "@/components/ui/Table/Th";
import TBody from "@/components/ui/Table/TBody";
import Td from "@/components/ui/Table/Td";
import Tabs from "@/components/ui/Tabs";
import {
  startOfDay,
  addDays,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isWithinInterval,
  parseISO,
} from "date-fns";
import TabList from "@/components/ui/Tabs/TabList";
import TabNav from "@/components/ui/Tabs/TabNav";
import TabContent from "@/components/ui/Tabs/TabContent";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

type ColumnDef<T> = {
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
};

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
  remainingAmount: string;
};

interface Appointment {
  id: number;
  title: string;
  date: string;
  start: string;
  vehicleId: string;
  customerId: string;
}
const DealerDashboard = () => {
  // ------------------------------Unpaid Table ------------------------------------
  const [data, setData] = useState<Estimate[]>([]);

  const fetchAppointment = async () => {
    try {
      const response = await apiGetAllAppointment();
      const appointments = response.allAppointment;
      setAppointment(appointments);
    } catch (error) {
      console.log(error);
    }
  };

  const estimateData = async () => {
    try {
      const response = await getAllEstimates();
      if (response?.status === "success") {
        // Filter only the paid invoices
        const unpaidInvoices = response.allEstimates.filter(
          (estimate: Estimate) =>
            estimate.paymentMethod !== "cash" &&
            estimate.paymentMethod !== "card"
        );
        setData(unpaidInvoices);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching estimates:", error);
    }
  };

  useEffect(() => {
    estimateData();
    fetchAppointment();
  }, []);

  const dispatch = useAppDispatch();
  // const data = useAppSelector((state: any) => state.workflow.estimateList);
  const loading = useAppSelector((state: any) => state.workflow.loading);
  const filterData = useAppSelector((state: any) => state.workflow.filterData);
  const allCountAccToStatus: any = useAppSelector(
    (state) => state.workflow.workflowCountAccToStatus
  );

  const { pageIndex, pageSize, sort, query, total } = useAppSelector(
    (state: any) => state.workflow.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(
      getEstimatesByPage({ pageIndex, pageSize, sort, query, filterData })
    );
    dispatch(getWorkflowTableCount());
  }, [pageIndex, pageSize, sort, query, filterData, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, sort, filterData]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const onPaginationChange = (page: number) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    dispatch(setTableData(newTableData));
  };

  const onSelectChange = (value: number) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  const onSort = (sort: any) => {
    const newTableData = cloneDeep(tableData);
    newTableData.sort = sort;
    dispatch(setTableData(newTableData));
  };

  const columns: ColumnDef<Estimate>[] = useMemo(
    () => [
      { header: "Order Name", accessorKey: "orderName" },

      {
        header: "Total",
        accessorKey: "grandTotal",
        cell: ({ row }: { row: { original: Estimate } }) =>
          `$ ${row.original.grandTotal}`,
      },

      {
        header: "Paid",
        accessorKey: "grandTotal",
        cell: ({ row }: { row: { original: Estimate } }) =>
          `$ ${row.original.grandTotal}`,
      },
      {
        header: "Due",
        accessorKey: "remainingAmount",
        cell: ({ row }: { row: { original: Estimate } }) =>
          `$ ${row.original.remainingAmount}`,
      },
    ],
    []
  );

  // ----------------------------------------WORKFLOW STATUS-----------------------------------
  const statuses = ["Estimates", "Dropped Off", "In Progress", "Invoice"];

  const summary = statuses.map((status) => {
    const filteredOrders = data.filter((order) => order.status === status);
    const orderCount = filteredOrders.length;
    const grandTotal = filteredOrders.reduce(
      (sum: any, order) => sum + order.grandTotal,
      0
    );
    const unauthorizedCount = filteredOrders.filter(
      (order) => !order.isAuthorized
    ).length;

    

    return {
      status,
      orderCount,
      grandTotal,
      unauthorizedCount,
    };
  });

  // -------------------------------------------Appointment ---------------------------------------------
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [customer, setCustomer] = useState([]);
  const [vehicle, setVehicle] = useState([]);

  // console.log("Appointments : ", appointment);
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  const weekStart = dayjs().startOf("week").format("YYYY-MM-DD");
  const weekEnd = dayjs().endOf("week").format("YYYY-MM-DD");
  const nextWeekStart = dayjs()
    .add(1, "week")
    .startOf("week")
    .format("YYYY-MM-DD");
  const nextWeekEnd = dayjs().add(1, "week").endOf("week").format("YYYY-MM-DD");

  const todayAppointments = appointment.filter(
    (appt) => dayjs(appt.start).format("YYYY-MM-DD") === today
  );
  const tomorrowAppointments = appointment.filter(
    (appt) => dayjs(appt.start).format("YYYY-MM-DD") === tomorrow
  );
  const thisWeekAppointments = appointment.filter((appt) =>
    dayjs(appt.start).isBetween(weekStart, weekEnd, "day", "[]")
  );
  const nextWeekAppointments = appointment.filter((appt) =>
    dayjs(appt.start).isBetween(nextWeekStart, nextWeekEnd, "day", "[]")
  );

  const vehId = appointment.length > 0 ? appointment[0].vehicleId : null;
  const custId = appointment.length > 0 ? appointment[0].customerId : null;

  const fetchCustomer = async () => {
    try {
      const response = await getAllCustomers();

      if (
        response?.status === "success" &&
        Array.isArray(response.allCustomers)
      ) {
        setCustomer(response.allCustomers);
      } else {
        console.error("Invalid response structure:", response);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  const fetchVehicle = async () => {
    try {
      const response = await getAllVehicles();

      if (
        response?.status === "success" &&
        Array.isArray(response.allVehicles)
      ) {
        setVehicle(response.allVehicles);
      } else {
        console.error("Invalid response structure:", response);
      }
    } catch (error) {
      console.error("Error fetching vehicle:", error);
    }
  };
  useEffect(() => {
    fetchCustomer();
    fetchVehicle();
  }, []);

  return (
    <div>
      <div className="mb-5 ms-2">
        <div className="lg:flex items-center justify-between mb-5">
          <h3 className="mb-4 lg:mb-0 ">Dashboard</h3>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Input
              className="w-full sm:w-52 md:w-60"
              size="sm"
              placeholder="Search "
              prefix={<HiOutlineSearch className="text-lg" />}
            />

            <Button
              type="button"
              size="sm"
              className="font-medium flex items-center gap-1 px-3 py-1.5"
            >
              <HiDownload className="h-4 w-4" />
              Export
            </Button>

            <Button
              variant="solid"
              type="button"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium flex items-center gap-1 px-3 py-1.5"
            >
              <HiDownload className="h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row w-full">
        <div className="w-full p-4">
          <p className="mb-4 pb-4 ms-3 text-xl font-semibold text-gray-800">
            WORKFLOW STATUS
          </p>
          <Table>
            <THead>
              <Tr className="!text-black">
                <Th className="!text-gray-800">Status</Th>
                <Th className="!text-gray-800">Order Count</Th>
                <Th className="!text-gray-800">Grand Total</Th>
                <Th className="!text-gray-800">Unauthorized Orders</Th>
              </Tr>
            </THead>
            <TBody>
              {summary.map((row) => (
                <Tr key={row.status}>
                  <Td>{row.status}</Td>
                  <Td>{row.orderCount} Orders</Td>
                  <Td>$ {row.grandTotal.toFixed(2)}</Td>
                  <Td>{row.unauthorizedCount} Pending Authorization</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </div>

        <div className="w-full p-4">
          <p className="mb-4 pb-4 ms-3 text-xl font-semibold text-gray-800">
            UNPAID INVOICES
          </p>
          {data && columns ? (
            data.length > 0 ? (
              <DataTable
                columns={columns}
                data={data}
                loading={!data.length}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                pagingData={{
                  total: tableData.total,
                  pageIndex: tableData.pageIndex,
                  pageSize: tableData.pageSize,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
              />
            ) : (
              <div className="ms-3">No unpaid invoices</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>

      <div className="flex flex-col xl:flex-row w-full">
        <div className="w-full p-4">
          <p className="mb-4 pb-4 ms-3 text-xl font-semibold text-gray-800">
            UPCOMING APPOINTMENTS
          </p>

          <Tabs defaultValue="tab1">
            <TabList className="!text-gray-800">
              <TabNav value="tab1">Today ({todayAppointments.length})</TabNav>
              <TabNav value="tab2">
                Tomorrow ({tomorrowAppointments.length})
              </TabNav>
              <TabNav value="tab3">
                This Week ({thisWeekAppointments.length})
              </TabNav>
              <TabNav value="tab4">
                Next Week ({nextWeekAppointments.length})
              </TabNav>
            </TabList>
            <div className="p-4">
              {["tab1", "tab2", "tab3", "tab4"].map((tab, index) => {
                const appts = [
                  todayAppointments,
                  tomorrowAppointments,
                  thisWeekAppointments,
                  nextWeekAppointments,
                ][index];
                return (
                  <TabContent key={tab} value={tab}>
                    {appts.length > 0 ? (
                      appts.map((appt, idx) => {
                        const matchingCustomer = (customer as any[]).find(
                          (cust) => cust._id === appt.customerId
                        );
                        const matchingVehicle = (vehicle as any[]).find(
                          (veh) => veh._id === appt.vehicleId
                        );

                        return (
                          <div key={idx} className="flex border-b pb-2">
                            <div className="w-1/4 bg-gray-100 h-20 m-1 flex flex-col items-center justify-center">
                              <span>{dayjs(appt.start).format("DD MMM")}</span>
                              <span>{dayjs(appt.start).format("hh:mm A")}</span>
                            </div>

                            <div className="w-3/4 bg-gray-100 h-20 m-1 flex flex-col items-center justify-center">
                              <span>{appt.title}</span>
                              <span className="flex items-center gap-2">
                                <HiOutlineUserCircle className="text-xl" />{" "}
                                {matchingCustomer
                                  ? `${matchingCustomer.firstName} ${matchingCustomer.lastName}`
                                  : "Unknown Customer"}
                              </span>
                              <span className="flex items-center gap-2">
                                <HiTruck className="text-xl" />{" "}
                                {matchingVehicle
                                  ? `${matchingVehicle.year} ${matchingVehicle.make} ${matchingVehicle.model}`
                                  : "Unknown Vehicle"}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No Appointments</p>
                    )}
                  </TabContent>
                );
              })}
            </div>
          </Tabs>
        </div>

        <div className="w-full p-4"></div>
      </div>
    </div>
  );
};

export default DealerDashboard;
