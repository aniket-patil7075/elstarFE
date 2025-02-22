import { Button } from "@/components/ui";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HiDownload, HiPlusCircle } from "react-icons/hi";
import { DataTable } from "@/components/shared";
import { cloneDeep } from "lodash";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import saveAs from "file-saver";
import { generatePDF } from "../../DealerLists/Services/DealerListServices";
import { getAllEstimates } from "../../Services/WorkflowService";
import { useAppDispatch, useAppSelector } from "@/store";
import { getEstimatesByPage } from "../../Workflow/store";

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
};

const AllPaymentsTable: React.FC<{ estimate: any[]; filters: any }> = ({}) => {
  const [data, setData] = useState<Estimate[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const filters = [
    "Today",
    "This Week",
    "This Month",
    "This Year",
    "Last Year",
    "All Time",
  ];

  const dispatch = useAppDispatch();
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
  }, [pageIndex, pageSize, sort, query, filterData, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, sort, filterData]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const estimateData = async () => {
    try {
      const response = await getAllEstimates();
      if (response?.status === "success") {
        setData(response.allEstimates);
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

  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      const paymentDate = new Date(item.paymentDate);
      const today = new Date();

      switch (selectedFilter) {
        case "Today":
          return paymentDate.toDateString() === today.toDateString();
        case "This Week":
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          return paymentDate >= startOfWeek;
        case "This Month":
          return (
            paymentDate.getMonth() === today.getMonth() &&
            paymentDate.getFullYear() === today.getFullYear()
          );
        case "This Year":
          return paymentDate.getFullYear() === today.getFullYear();
        case "Last Year":
          return paymentDate.getFullYear() === today.getFullYear() - 1;
        default:
          return true;
      }
    });
  }, [data, selectedFilter]);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text("All Estimate Report", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [
        [
          "First Name",
          "Last Name",
          "Order No",
          "Order Name",
          "Payment Date",
          "Note",
          "Payment Type",
          "Total Order Amount",
          "Payment Amount",
          "Remaining Amount",
        ],
      ],
      body: data.map((row: any) => [
        row.customer?.firstName || "N/A",
        row.customer?.lastName || "N/A",
        row.orderNo,
        row.orderName,
        row.paymentDate,
        row.paymentNote || "N/A",
        row.paymentMethod,
        row.grandTotal + (row.remainingAmount || 0),
        row.grandTotal,
        row.remainingAmount || 0,
      ]),
      theme: "striped",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] },
    });

    doc.save("All_Payment_Report.pdf");
  };

  const handleGenerateExcel = async () => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }

    try {
      // Define the columns to be exported based on useMemo columns
      const selectedFields = [
        "customer.firstName",
        "customer.lastName",
        "orderNo",
        "orderName",
        "paymentDate",
        "paymentNote",
        "paymentMethod",
        "totalOrderAmount",
        "grandTotal",
        "remainingAmount",
      ];

      const filteredData = data.map((item: any) => {
        return {
          "First Name": item.customer?.firstName || "N/A",
          "Last Name": item.customer?.lastName || "N/A",
          "Order No": item.orderNo,
          "Order Name": item.orderName,
          "Payment Date": item.paymentDate,
          Note: item.paymentNote || "N/A",
          "Payment Type": item.paymentMethod,
          "Total Order Amount": item.grandTotal + (item.remainingAmount || 0),
          "Payment Amount": item.grandTotal,
          "Remaining Amount": item.remainingAmount || 0,
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

      XLSX.writeFile(workbook, "All_Payment_Report.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Failed to generate Excel.");
    }
  };

  const columns: ColumnDef<Estimate>[] = useMemo(
    () => [
      {
        header: "First Name",
        accessorKey: "customer.firstName",
      },
      {
        header: "Last Name",
        accessorKey: "customer.lastName",
      },
      { header: "Order No", accessorKey: "orderNo", sortable: true },
      { header: "Order Name", accessorKey: "orderName" },
      { header: "Payment Date", accessorKey: "paymentDate" },
      { header: "Note", accessorKey: "paymentNote" },
      {
        header: "Payment Type",
        accessorKey: "paymentMethod",
      },
      {
        header: "Total Order Amount",
        accessorKey: "totalOrderAmount",
        cell: ({
          row,
        }: {
          row: { original: { grandTotal: number; remainingAmount: number } };
        }) => row.original.grandTotal + row.original.remainingAmount,
      },
      { header: "Payment Amount", accessorKey: "grandTotal" },
      { header: "Remaining Amount", accessorKey: "remainingAmount" },
    ],
    []
  );

  return (
    <div>
      <div className="mb-5 ms-2">
        <div className="lg:flex items-center justify-between mb-5">
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
          <div className="flex flex-col lg:flex-row lg:items-center ms-3">
            <Button
              type="button"
              size="sm"
              className=" font-medium flex items-center gap-1 px-3 py-1.5 md:mx-3"
              onClick={handleGenerateExcel}
            >
              <HiDownload className="h-4 w-4" />
              Export
            </Button>

            <Button
              variant="solid"
              type="button"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium flex items-center gap-1 px-3 py-1.5"
              // onClick={generatePDF}
              onClick={handleGeneratePDF}
            >
              <HiDownload className="h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        {filteredData && filteredData.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredData}
            loading={!data.length}
          />
        ) : (
          <div>No Any Payments</div>
        )}
      </div>
    </div>
  );
};

export default AllPaymentsTable;
