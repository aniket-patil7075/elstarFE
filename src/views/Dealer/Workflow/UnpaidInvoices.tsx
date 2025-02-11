import { Button } from "@/components/ui";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HiDownload, HiPlusCircle } from "react-icons/hi";
import {
  getEstimatesByPage,
  getWorkflowTableCount,
  setTableData,
  useAppDispatch,
} from "./store";
import { useAppSelector } from "./NewEstimate/store";
import { DataTable } from "@/components/shared";
import { cloneDeep } from "lodash";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getAllEstimates } from "../Services/WorkflowService";
import * as XLSX from "xlsx";

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
  paymentMethod : string;
  // appointment: string;
  // technician: string;
  // createdDate: number;
  // authorizedDate: number;
  // invoiceDate: number;
  // fullyPaidDate: number;
  // workflowDate: number;
  // messagedDate: number;
  // tags: [];
};

const UnpaidInvoices = () => {

  const [data, setData] = useState<Estimate[]>([]);

  const estimateData = async () => {
    try {
      const response = await getAllEstimates();
      if (response?.status === "success") {
        // Filter only the paid invoices
        const unpaidInvoices = response.allEstimates.filter(
          (estimate: Estimate) => 
            estimate.paymentMethod !== "cash" && estimate.paymentMethod !== "card"
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

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Unpaid Invoices Report", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [
        [
          "Order No",
          "Order Name",
          "Customer",
          "Grand Total",
          "Due Date",
          "Payment Terms",
          "Paid Status",
          "Workflow Status",
          "Order Status"
        ],
      ],
      body: data.map((row: any) => [
        row.orderNo,
        row.orderName,
        row.firstName,
        `$${row.grandTotal}`,
        row.dueDate,
        row.paymentNote,
        row.paymentMethod === "cash" || row.paymentMethod === "card" || row.paidStatus === "Paid"
        ? "Paid"
        : "Unpaid",
        row.status,
        row.status,
      ]),
      theme: "striped",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] }, 
    });

    doc.save("Unpaid_Invoices_Report.pdf");
  };

    const handleGenerateExcel = async () => {
      if (!data || data.length === 0) {
        alert("No data available to export.");
        return;
      }
  
      try {
        // Define the fields to include in Excel
        const selectedFields = [
          "orderNo",
          "orderName",
          "customer",
          "grandTotal",
          "dueDate",
          "paymentNote",
          "paymentMethod",
          "status",
          "isAuthorized",
          "paymentDate",
        ];
  
        const filteredData = data.map((item: any) => {
          let formattedItem: any = {};
    
          selectedFields.forEach((key) => {
            if (key === "customer") {
              formattedItem["customer"] = item.firstName || (item.customer?.firstName || "N/A");
            } else if (key === "paymentMethod") {
              formattedItem["Payment Status"] =
                item.paymentMethod === "card" || item.paymentMethod === "cash"
                  ? "Paid"
                  : "Unpaid";
            } else if (key === "isAuthorized") {
              formattedItem["Authorized Status"] =
                item.isAuthorized === true ? "Authorize" : "Unauthorize";
            } else if (key === "paymentNote") {
              formattedItem["Payment Terms"] = item.paymentNote || "N/A";
            } else {
              formattedItem[key] = item[key];
            }
          });
    
          return formattedItem;
        });
  
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  
        XLSX.writeFile(workbook, "Unpaid_Invoices_Report.xlsx");
      } catch (error) {
        console.error("Error exporting to Excel:", error);
        alert("Failed to generate Excel.");
      }
    };

  const columns: ColumnDef<Estimate>[] = useMemo(
    () => [
      { header: "Order No", accessorKey: "orderNo", sortable: true },
      { header: "Order Name", accessorKey: "orderName" },
      {
        header: "Customer",
        accessorKey: "customer.firstName",
      },
      { header: "Grand Total", accessorKey: "grandTotal" },
      
      { header: "Due Date", accessorKey: "dueDate" },
      { header: "Payment Terms", accessorKey: "paymentNote" },
      { header: "payment Due Date", accessorKey: "dueDate" },
      {
        header: "Paid Status",
        accessorKey: "paymentMethod",
        cell: (props:any) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {row.paymentMethod === "cash" || row.paymentMethod === "card" ? "Paid" : "Unpaid"}
            </div>
          );
        },
      },
      { header: "Workflow Status", accessorKey: "status" },
      { header: "Inspection Status", accessorKey: "inspectionStatus" },
      { header: "Order Status", accessorKey: "status" },
      {
        header: "Authorized Status",
        accessorKey: "auth",
        cell: (props:any) => {
          const row = props.row.original;
          return <div>{row.isAuthorized ? "Authorized" : "Unauthorized"}</div>;
        },
      },
      
    ],
    []
  );
  console.log(data);

  return (
    <div>
      <div className="mb-5 ms-2">
        <div className="lg:flex items-center justify-between mb-5">
                  <h3 className="mb-4 lg:mb-0">Unpaid Invoices</h3>
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
                      onClick={generatePDF}
                    >
                      <HiDownload className="h-4 w-4" />
                      PDF
                    </Button>
                  </div>
                </div>
      </div>
      <div className="mt-5">
        {data && columns ? (
          <DataTable
          columns={columns}
          data={data}  
          loading={!data.length}
          skeletonAvatarColumns={[0]}
          skeletonAvatarProps={{ width: 28, height: 28 }}
          pagingData={{
            total: tableData.total as number,
            pageIndex: tableData.pageIndex as number,
            pageSize: tableData.pageSize as number,
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
  );
};

export default UnpaidInvoices;
