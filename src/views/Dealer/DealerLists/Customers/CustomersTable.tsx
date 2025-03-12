import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HiDotsHorizontal, HiOutlinePlus } from "react-icons/hi"; // Importing the plus icon from react-icons
import DataTable from "@/components/shared/DataTable";
import {
  getCustomers,
  useAppDispatch,
  useAppSelector,
  setTableData,
  setCustomerTableData,
} from "../Store";
import { cloneDeep } from "lodash";
import { format } from "date-fns";
import { apiDeleteCustomer } from "../Services/DealerInventoryServices";
import { Notification, toast } from "@/components/ui";

// Define the proper structure for your columns based on ColumnDef
type ColumnDef<T> = {
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
};

// Define the type of data you will pass in
type CustomerData = {
  firstName: string;
  lastName: string;
  phone: Array<{
    type: string;
    number: number;
  }>;
  email: string[];
  zipCode: string;
  vehicles: number;
  orders: number;
  createdDate: string;
  tags?: string[]; // Adding tags to each customer
};

const CustomersTable = () => {
  const dispatch = useAppDispatch();
  const [showMenu, setShowMenu] = useState<{ [key: string]: boolean }>({});
  // Fetching data and loading state from Redux
  const data = useAppSelector((state) => state.list.allCustomers);
  const loading = useAppSelector((state) => state.list.loading);
  const filterData = useAppSelector((state) => state.list.customerFilterData);
  const { pageIndex, pageSize, sort, query, total } = useAppSelector(
    (state) => state.list.customerTableData
  );

  const fetchData = useCallback(() => {
    dispatch(getCustomers({ pageIndex, pageSize, sort, query, filterData }));
  }, [pageIndex, pageSize, sort, query, filterData, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, sort, filterData]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const toggleMenu = (id: string) => {
    setShowMenu((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAction = async (action: string, id: string) => {
    if (action === "edit") {
      console.log(`Edit action for ID: ${id}`);
      // Handle edit logic here
    } else if (action === "delete") {
      console.log(`Delete action for ID: ${id}`);

      try {
        // Call the delete API and wait for it to complete
        await apiDeleteCustomer(id);

        // Show success notification
        toast.push(
          <Notification title="Success" type="success">
            Customer Deleted Successfully
          </Notification>
        );

        // Refresh data after deletion
        fetchData();
      } catch (error) {
        console.error("Error deleting customer:", error);
        toast.push(
          <Notification title="Error" type="danger">
            Failed to delete customer
          </Notification>
        );
      }
    }

    setShowMenu((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const [savedTags] = useState<string[]>([
    "Permanent",
    "VIP",
    "New",
    "Returning",
  ]); // List of saved tags
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term for filtering tags
  const [selectedTags, setSelectedTags] = useState<Record<number, string[]>>(
    {}
  ); // Tags for each customer by index

  const columns: ColumnDef<CustomerData>[] = useMemo(
    () => [
      { header: "First Name", accessorKey: "firstName", sortable: true },
      { header: "Last Name", accessorKey: "lastName" },
      { header: "Phone", accessorKey: "phone" },
      { header: "Email", accessorKey: "email" },
      { header: "Zip Code", accessorKey: "zipCode" },
      { header: "Vehicles", accessorKey: "vehicles" },
      { header: "Orders", accessorKey: "orders" },
      {
        header: "",
        accessorKey: "actions",
        cell: ({ row }: { row: any }) => {
          const id = row.original.id;
          return (
            <div className="relative">
              <button
                onClick={() => toggleMenu(id)}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-200"
              >
                <HiDotsHorizontal />
              </button>
              {showMenu[id] && (
                <div className="z-10 absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md">
                  {/* <button
                    onClick={() => handleAction("edit", id)}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleAction("delete", id)}
                    className="block px-4 py-2 text-red-600 hover:bg-gray-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        },
      },
    ],
    [selectedTags, searchTerm, showMenu]
  );

  // Handler for adding a tag
  const handleAddTag = (rowIndex: number, tag: string) => {
    setSelectedTags((prevTags) => {
      const newTags = prevTags[rowIndex] ? [...prevTags[rowIndex]] : [];
      if (!newTags.includes(tag)) {
        newTags.push(tag);
      }
      return { ...prevTags, [rowIndex]: newTags };
    });
  };

  // Handler for removing a tag
  const handleRemoveTag = (rowIndex: number, tag: string) => {
    setSelectedTags((prevTags) => {
      const newTags = prevTags[rowIndex]?.filter((t) => t !== tag) || [];
      return { ...prevTags, [rowIndex]: newTags };
    });
  };

  const onPaginationChange = (page: number) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    dispatch(setCustomerTableData(newTableData));
  };

  const onSelectChange = (value: number) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    dispatch(setCustomerTableData(newTableData));
  };

  const onSort = (sort: any) => {
    const newTableData = cloneDeep(tableData);
    newTableData.sort = sort;
    dispatch(setCustomerTableData(newTableData));
  };

  return (
    <>
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
    </>
  );
};

export default CustomersTable;
