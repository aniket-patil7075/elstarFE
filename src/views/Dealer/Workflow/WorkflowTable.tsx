import { useEffect, useCallback, useMemo, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/shared/DataTable";
import {
  getEstimatesByPage,
  setTableData,
  setSelectedDealer,
  setDrawerOpen,
  Estimate,
  useAppSelector,
  useAppDispatch,
  getWorkflowTableCount,
} from "./store/index";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import type { OnSortParam, ColumnDef } from "@/components/shared/DataTable";
import Tabs from "@/components/ui/Tabs";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import {
  HiDownload,
  HiOutlineInboxIn,
  HiOutlinePlus,
  HiPlusCircle,
} from "react-icons/hi";
import { Dropdown, Notification, toast } from "@/components/ui";
import {
  apiDeleteEstimate,
  apiUpdateEstimateStatus,
  getAllEstimates,
} from "../Services/WorkflowService";
import WorkflowTableSearch from "./WorkflowTableSearch";
import WorkflowFilter from "./WorkflowFilter";

const { TabNav, TabList, TabContent } = Tabs;

const statusColor: Record<string, string> = {
  active: "bg-emerald-500",
  blocked: "bg-red-500",
};

const ActionColumn = ({ row }: { row: Estimate }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(setDrawerOpen());
    dispatch(setSelectedDealer(row));
  };

  return (
    <div
      className={`${textTheme} cursor-pointer select-none font-semibold`}
      onClick={onEdit}
    >
      Edit
    </div>
  );
};

const DeleteAction = ({ row }: { row: Estimate }) => {
  const navigate = useNavigate();

  const handleDeleteFunction = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this estimate?"
    );
    if (!isConfirmed) return;
    try {
      const estimateId = (row as any).id;
      await apiDeleteEstimate(estimateId);

      navigate("/dealer/workflow");
      toast.push(
        <Notification title="Success" type="success">
          Estimate Deleted Successfully
        </Notification>
      );
    } catch (error) {
      console.error("Error deleting estimate:", error);
    }
  };

  return (
    <div
      className={` cursor-pointer select-none font-semibold`}
      onClick={handleDeleteFunction}
    >
      Delete
    </div>
  );
};

const OrderNumberColumn = ({ row }: { row: Estimate }) => {
  const { textTheme } = useThemeClass();

  return (
    <div className="flex items-center">
      {/* <Avatar size={28} shape="circle" src={row.img} /> */}
      <Link
        className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
        to={`/app/crm/dealer-details?id=${row._id}`}
      >
        {row.orderNo}
      </Link>
    </div>
  );
};

const OrderNameColumn = ({ row }: { row: Estimate }) => {
  const { textTheme } = useThemeClass();

  return (
    <div className="flex items-center">
      {/* <Avatar size={28} shape="circle" src={row.img} /> */}
      <Link
        className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
        to={`/app/crm/dealer-details?id=${row._id}`}
      >
        {row.orderName}
      </Link>
    </div>
  );
};

const WorkflowTable = () => {
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

  const estimateOptions = [
    { key: "Estimates", name: "Estimates" },
    { key: "Dropped Off", name: "Dropped Off" },
    { key: "In Progress", name: "In Progress" },
    { key: "Invoices", name: "Invoices" },
  ];
  const navigate = useNavigate();

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

  const columns: ColumnDef<Estimate>[] = useMemo(
    () => [
      {
        header: "Order #",
        accessorKey: "orderNo",
        cell: (props) => {
          const row = props.row.original;
          return <OrderNumberColumn row={row} />;
        },
      },
      {
        header: "Order Name",
        accessorKey: "orderName",
        cell: (props) => {
          const row = props.row.original;
          return <OrderNameColumn row={row} />;
        },
      },
      {
        header: "Customer",
        accessorKey: "customer.firstName",
      },
      {
        header: "Total",
        accessorKey: "total",
      },
      {
        header: "Due Date",
        accessorKey: "dueDate",
      },
      {
        header: "Payment Terms",
        accessorKey: "paymentTerms",
      },
      {
        header: "Payment Due Date",
        accessorKey: "paymentDueDate",
      },
      {
        header: "Paid Status",
        accessorKey: "paidStatus",
      },
      {
        header: "Workflow",
        accessorKey: "workflow",
        cell: ({ row }) => {
          const { id, workflow }: any = row.original; // Destructure only the needed values
          const dispatch = useAppDispatch(); // Reuse dispatch for re-fetching data

          const updateEstimateStatus = async (newStatus: string) => {
            try {
              await apiUpdateEstimateStatus(id, newStatus); // API call
              dispatch(
                getEstimatesByPage({
                  pageIndex,
                  pageSize,
                  sort,
                  query,
                  filterData,
                })
              ); // Re-fetch data
            } catch (error) {
              console.error("Failed to update estimate workflow", error);
            }
          };

          return (
            <Dropdown
              className="z-50 absolute"
              renderTitle={
                <p className="text-indigo-600 cursor-pointer">{workflow}</p>
              }
            >
              {estimateOptions.map((item) => (
                <Dropdown.Item
                  key={item.key}
                  onSelect={() => updateEstimateStatus(item.name)} // Pass new status
                >
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown>
          );
        },
      },
      {
        header: "Inspection Status",
        accessorKey: "inspectionStatus",
      },
      {
        header: "Order Status",
        accessorKey: "orderStatus",
      },
      {
        header: "Auth",
        accessorKey: "auth",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row.isAuthorized ? "Authorized" : "Unauthorized"}</div>;
        },
      },
      {
        header: "Appointment",
        accessorKey: "appointment",
      },
      {
        header: "Technician",
        accessorKey: "technician",
      },
      {
        header: "Created Date",
        accessorKey: "createdDate",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {dayjs.unix(row.createdDate).format("MM/DD/YYYY")}
            </div>
          );
        },
      },
      {
        header: "Authorized Date",
        accessorKey: "authorizedDate",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {dayjs.unix(row.authorizedDate).format("MM/DD/YYYY")}
            </div>
          );
        },
      },
      {
        header: "Invoice Date",
        accessorKey: "invoiceDate",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {dayjs.unix(row.invoiceDate).format("MM/DD/YYYY")}
            </div>
          );
        },
      },
      {
        header: "Fully Paid Date",
        accessorKey: "fullyPaidDate",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {dayjs.unix(row.fullyPaidDate).format("MM/DD/YYYY")}
            </div>
          );
        },
      },
      {
        header: "Workflow Date",
        accessorKey: "workflowDate",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {dayjs.unix(row.workflowDate).format("MM/DD/YYYY")}
            </div>
          );
        },
      },
      {
        header: "Tags",
        accessorKey: "tags",
        cell: (props) => {
          const row = props.row.original;
          return <div className="flex items-center">{row.tags}</div>;
        },
      },
      {
        header: "Edit ",
        id: "action",
        cell: (props) => <ActionColumn row={props.row.original} />,
      },
      {
        header: "Delete ",
        id: "action",
        cell: (props) => <DeleteAction row={props.row.original} />,
      },
    ],
    []
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

  const filteredDataByWorkflow = (data: any, keyword: any) => {
    return data.filter((row: any) => row.workflow.includes(keyword));
  };

  const countDataByWorkflow = (data: any, keyword: any) => {
    return data.filter((row: any) => row.workflow.includes(keyword)).length;
  };

  const [btnLoading, setbtnLoading] = useState(false);

  const onClick = () => {
    setbtnLoading(true);

    setTimeout(() => {
      setbtnLoading(false);
    }, 3000);
  };
  const getFilteredPagingData = (keyword: string) => {
    const filteredData = filteredDataByWorkflow(data, keyword);

    return {
      total: filteredData.length, // Ensure total is updated based on filtered data
      pageIndex: tableData.pageIndex as number,
      pageSize: tableData.pageSize as number,
    };
  };

  const [searchParams] = useSearchParams();
  const status = searchParams.get("status"); // Get status from URL

  console.log("Status : ", status)

  const statusTabMapping = {
    Estimates: `tab${allCountAccToStatus?.estimates?.id}`,
    "Dropped Off": `tab${allCountAccToStatus?.droppedOff?.id}`,
    "In Progress": `tab${allCountAccToStatus?.inProgress?.id}`,
    Invoices: `tab${allCountAccToStatus?.invoices?.id}`,
  };

  const defaultTab = statusTabMapping[status] || "tab1";


  console.log("defaultTab:", defaultTab);
  console.log("All Tab Value:", `tab${allCountAccToStatus?.all?.id}`);
  

  return (
    <>
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">All Estimates</h3>
        <div className="flex flex-col lg:flex-row lg:items-center ms-3">
          <WorkflowTableSearch />
          <Link
            download
            className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
            to="/data/product-list.csv"
            target="_blank"
          >
            <Button block size="sm" icon={<HiDownload />}>
              Export
            </Button>
          </Link>

          <Button
            onClick={onClick}
            className="mr-2 block lg:inline-block md:mb-0 mb-4"
            variant="solid"
            loading={loading}
            size="sm"
          >
            PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue={defaultTab || "tab1"} className="mt-5">
        <TabList>
          <TabNav value={`tab${allCountAccToStatus?.all?.id}`}>
            All
            <div className="ml-2 rtl:ml-2">
              {allCountAccToStatus?.all?.statusCount != 0 && (
                <Tag className="text-white bg-indigo-600 border-0">
                  {data.length}
                </Tag>
              )}
            </div>
          </TabNav>
          <TabNav value={`tab${allCountAccToStatus?.estimates?.id}`}>
            Estimates
            <div className="ml-2 rtl:ml-2">
              {countDataByWorkflow(data, "Estimates") != 0 && (
                <Tag className="text-white bg-indigo-600 border-0">
                  {countDataByWorkflow(data, "Estimates")}
                </Tag>
              )}
            </div>
          </TabNav>
          <TabNav value={`tab${allCountAccToStatus?.droppedOff?.id}`}>
            Dropped Off
            <div className="ml-2 rtl:ml-2">
              {countDataByWorkflow(data, "Dropped Off") != 0 && (
                <Tag className="text-white bg-indigo-600 border-0">
                  {countDataByWorkflow(data, "Dropped Off")}
                </Tag>
              )}
            </div>
          </TabNav>
          <TabNav value={`tab${allCountAccToStatus?.inProgress?.id}`}>
            In Progress
            <div className="ml-2 rtl:ml-2">
              {countDataByWorkflow(data, "In Progress") != 0 && (
                <Tag className="text-white bg-indigo-600 border-0">
                  {countDataByWorkflow(data, "In Progress")}
                </Tag>
              )}
            </div>
          </TabNav>
          <TabNav value={`tab${allCountAccToStatus?.invoices?.id}`}>
            Invoices
            <div className="ml-2 rtl:ml-2">
              {countDataByWorkflow(data, "Invoices") != 0 && (
                <Tag className="text-white bg-indigo-600 border-0">
                  {countDataByWorkflow(data, "Invoices")}
                </Tag>
              )}
            </div>
          </TabNav>
        </TabList>
        <div className="p-4">
          <TabContent value="tab1">
            <DataTable
              columns={columns}
              data={data}
              onRowClick={(row: any) =>
                navigate(
                  `/dealer/workflow/order/${row.original.id}-${row.original.orderNo}`
                )
              }
              skeletonAvatarColumns={[0]}
              skeletonAvatarProps={{ width: 28, height: 28 }}
              loading={loading}
              pagingData={{
                total: tableData.total as number,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
              }}
              onPaginationChange={onPaginationChange}
              onSelectChange={onSelectChange}
              onSort={onSort}
            />
          </TabContent>
          <TabContent value="tab2">
            <DataTable
              columns={columns}
              data={filteredDataByWorkflow(data, "Estimates")}
              onRowClick={(row: any) =>
                navigate(
                  `/dealer/workflow/order/${row.original.id}-${row.original.orderNo}`
                )
              }
              skeletonAvatarColumns={[0]}
              skeletonAvatarProps={{ width: 28, height: 28 }}
              loading={loading}
              pagingData={getFilteredPagingData("Estimates")}
              onPaginationChange={onPaginationChange}
              onSelectChange={onSelectChange}
              onSort={onSort}
            />
          </TabContent>
          <TabContent value="tab3">
            <DataTable
              columns={columns}
              data={filteredDataByWorkflow(data, "Dropped Off")}
              onRowClick={(row: any) =>
                navigate(
                  `/dealer/workflow/order/${row.original.id}-${row.original.orderNo}`
                )
              }
              skeletonAvatarColumns={[0]}
              skeletonAvatarProps={{ width: 28, height: 28 }}
              loading={loading}
              pagingData={getFilteredPagingData("Dropped Off")}
              onPaginationChange={onPaginationChange}
              onSelectChange={onSelectChange}
              onSort={onSort}
            />
          </TabContent>
          <TabContent value="tab4">
            <DataTable
              columns={columns}
              data={filteredDataByWorkflow(data, "In Progress")}
              onRowClick={(row: any) =>
                navigate(
                  `/dealer/workflow/order/${row.original.id}-${row.original.orderNo}`
                )
              }
              skeletonAvatarColumns={[0]}
              skeletonAvatarProps={{ width: 28, height: 28 }}
              loading={loading}
              pagingData={getFilteredPagingData("In Progress")}
              onPaginationChange={onPaginationChange}
              onSelectChange={onSelectChange}
              onSort={onSort}
            />
          </TabContent>
          <TabContent value="tab5">
            <DataTable
              columns={columns}
              data={filteredDataByWorkflow(data, "Invoices")}
              skeletonAvatarColumns={[0]}
              skeletonAvatarProps={{ width: 28, height: 28 }}
              loading={loading}
              pagingData={getFilteredPagingData("Invoices")}
              onPaginationChange={onPaginationChange}
              onSelectChange={onSelectChange}
              onSort={onSort}
            />
          </TabContent>
        </div>
      </Tabs>
    </>
  );
};

export default WorkflowTable;
