import { Button } from "@/components/ui";
import React, { useCallback, useEffect, useMemo } from "react";
import { HiDownload, HiPlusCircle } from "react-icons/hi";
import {
  getEstimatesByPage,
  getWorkflowTableCount,
  useAppDispatch,
} from "./store";
import { useAppSelector } from "./NewEstimate/store";
import { DataTable } from "@/components/shared";
import { cloneDeep } from "lodash";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: any) => state.workflow.estimateList);
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
    //   dispatch(getWorkflowTableCount());
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
    // dispatch(setTableData(newTableData));
  };

  const onSelectChange = (value: number) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    // dispatch(setTableData(newTableData));
  };

  const onSort = (sort: any) => {
    const newTableData = cloneDeep(tableData);
    newTableData.sort = sort;
    // dispatch(setTableData(newTableData));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("All Orders Report", 14, 15);

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
        `${row.customer.firstName} ${row.customer.lastName}`,
        `$${row.total}`,
        row.dueDate,
        row.paymentTerms,
        row.paidStatus,
        row.workflow,
        row.workflow,
      ]),
      theme: "striped",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] }, // Blue header
    });

    doc.save("Unpaid_Invoice_Report.pdf");
  };

  const columns: ColumnDef<Estimate>[] = useMemo(
    () => [
      { header: "Order No", accessorKey: "orderNo", sortable: true },
      { header: "Order Name", accessorKey: "orderName" },
      {
        header: "Customer",
        accessorFn: (row: any) =>
          `${row.customer.firstName} ${row.customer.lastName}`,
      },
      {
        header: "Grand Total",
        accessorFn: (row:any) => `$${ row.total}`,
      }
      ,
      { header: "Due Date", accessorKey: "dueDate" },
      { header: "Payment Terms", accessorKey: "paymentTerms" },
      { header: "payment Due Date", accessorKey: "paymentDueDate" },
      { header: "Paid Status", accessorKey: "paidStatus" },
      { header: "Workflow Status", accessorKey: "workflow" },
      { header: "Inspection Status", accessorKey: "inspectionStatus" },
      { header: "Order Status", accessorKey: "workflow" },
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
  return (
    <div>
      <div className="mb-5 ms-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Unpaid Invoices</h2>
          <Button
            variant="solid"
            type="button"
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium flex items-center gap-1 px-3 py-1.5"
            onClick={generatePDF}
          >
            <HiDownload className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      <div className="mt-5">
        {data && columns ? (
          <DataTable
            columns={columns}
            data={data}
            loading={loading}
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
