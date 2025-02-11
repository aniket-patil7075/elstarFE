import { Button, Input } from "@/components/ui";
import { apiStripepayment, getAllEstimates } from "./Services/WorkflowService";
import CheckoutForm from "./CheckoutForm";
import AuthorizeEmail from "../auth/Emails/AuthorizeEmail";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  apiGetAllAppointment,
  getAllCustomers,
} from "./DealerLists/Services/DealerListServices";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import saveAs from "file-saver";
import { HiDownload, HiOutlineSearch } from "react-icons/hi";
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

import TabList from "@/components/ui/Tabs/TabList";
import TabNav from "@/components/ui/Tabs/TabNav";
import TabContent from "@/components/ui/Tabs/TabContent";

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

const DealerDashboard = () => {
  // ------------------------------Unpaid Table ------------------------------------
  const [data, setData] = useState<Estimate[]>([]);
  const [appointment, setAppointment] = useState({});
  const [filteredAppointments, setFilteredAppointments] = useState({
    today: [],
    tomorrow: [],
    thisWeek: [],
    nextWeek: [],
  });

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
//   useEffect(() => {
//     const today = startOfDay(new Date());
//     const tomorrow = startOfDay(addDays(new Date(), 1));
//     const weekStart = startOfWeek(new Date());
//     const weekEnd = endOfWeek(new Date());
//     const nextWeekStart = startOfWeek(addDays(new Date(), 7));
//     const nextWeekEnd = endOfWeek(addDays(new Date(), 7));

//     const filteredData = {
//       today: appointment.filter((appt) =>
//         isSameDay(parseISO(appt.date), today)
//       ),
//       tomorrow: appointment.filter((appt) =>
//         isSameDay(parseISO(appt.date), tomorrow)
//       ),
//       thisWeek: appointment.filter((appt) =>
//         isWithinInterval(parseISO(appt.date), { start: weekStart, end: weekEnd })
//       ),
//       nextWeek: appointment.filter((appt) =>
//         isWithinInterval(parseISO(appt.date), { start: nextWeekStart, end: nextWeekEnd })
//       ),
//     };

//     setFilteredAppointments(filteredData);
// }, [appointment]);

  return (
    <div>
      <div className="mb-5 ms-2">
        <div className="lg:flex items-center justify-between mb-5">
          <h3 className="mb-4 lg:mb-0 text-xl font-semibold">Dashboard</h3>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Input
              className="w-full sm:w-52 md:w-60"
              size="sm"
              placeholder="Search product"
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
          <p className="mb-4 pb-4 ms-3 text-xl font-semibold">
            WORKFLOW STATUS
          </p>
          <Table>
            <THead>
              <Tr>
                <Th>Status</Th>
                <Th>Order Count</Th>
                <Th>Grand Total</Th>
                <Th>Unauthorized Orders</Th>
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
          <p className="mb-4 pb-4 ms-3 text-xl font-semibold">
            UNPAID INVOICES
          </p>
          {data && columns ? (
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
            <div>Loading...</div>
          )}
        </div>
      </div>

      {/* <div>
        <Tabs defaultValue="today" variant="pill">
          <TabList>
            <TabNav value="today">
              Today ({filteredAppointments.today.length})
            </TabNav>
            <TabNav value="tomorrow">
              Tomorrow ({filteredAppointments.tomorrow.length})
            </TabNav>
            <TabNav value="thisWeek">
              This Week ({filteredAppointments.thisWeek.length})
            </TabNav>
            <TabNav value="nextWeek">
              Next Week ({filteredAppointments.nextWeek.length})
            </TabNav>
          </TabList>
          <div className="p-4">
            <TabContent value="today">
              {filteredAppointments.today.length > 0 ? (
                filteredAppointments.today.map((appt) => (
                  <p key={appt.id}>
                    {appt.name} - {moment(appt.date).format("DD MMM YYYY")}
                  </p>
                ))
              ) : (
                <p>No appointments today</p>
              )}
            </TabContent>
            <TabContent value="tomorrow">
              {filteredAppointments.tomorrow.length > 0 ? (
                filteredAppointments.tomorrow.map((appt) => (
                  <p key={appt.id}>
                    {appt.name} - {moment(appt.date).format("DD MMM YYYY")}
                  </p>
                ))
              ) : (
                <p>No appointments tomorrow</p>
              )}
            </TabContent>
            <TabContent value="thisWeek">
              {filteredAppointments.thisWeek.length > 0 ? (
                filteredAppointments.thisWeek.map((appt) => (
                  <p key={appt.id}>
                    {appt.name} - {moment(appt.date).format("DD MMM YYYY")}
                  </p>
                ))
              ) : (
                <p>No appointments this week</p>
              )}
            </TabContent>
            <TabContent value="nextWeek">
              {filteredAppointments.nextWeek.length > 0 ? (
                filteredAppointments.nextWeek.map((appt) => (
                  <p key={appt.id}>
                    {appt.name} - {moment(appt.date).format("DD MMM YYYY")}
                  </p>
                ))
              ) : (
                <p>No appointments next week</p>
              )}
            </TabContent>
          </div>
        </Tabs>
      </div> */}
    </div>
  );
};

export default DealerDashboard;
