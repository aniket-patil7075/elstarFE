import { DataTable } from "@/components/shared";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HiDotsHorizontal, HiOutlineSearch } from "react-icons/hi";
import { getFees, useAppDispatch } from "../../DealerInventory/store";
import { useAppSelector } from "@/store";
import { getAllDeletedFees } from "../../DealerLists/Services/DealerInventoryServices";
import { Button, Input } from "@/components/ui";

type ColumnDef<T> = {
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
  cell?: (info: any) => JSX.Element; // Add custom rendering for specific cells
};

type FeeData = {
  feeName: string;
  feeType: string;
  feeValue: number;
  feePercent: number;
  category: string;
};

const InventoryFees = () => {
  const [data, setData] = useState<FeeData[]>([]);
  const dispatch = useAppDispatch();
  const originalData = useAppSelector((state) => state.inventory.allFees);
  const loading = useAppSelector((state) => state.inventory.loading);
  const filterData = useAppSelector((state) => state.inventory.filterData);
  const [isUpdate, setIsUpdate] = useState(false); // Add this line

  const { pageIndex, pageSize, sort, query, total } = useAppSelector(
    (state) => state.inventory.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(getFees({ pageIndex, pageSize, sort, query, filterData }));
  }, [pageIndex, pageSize, sort, query, filterData, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, sort, filterData]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total, filterData }),
    [pageIndex, pageSize, sort, query, total]
  );

  const [showMenu, setShowMenu] = useState<{ [key: string]: boolean }>({});

  const feeData = async () => {
    try {
      const response = await getAllDeletedFees();
      if (response?.data?.status === "success") {
        const filteredFees = response.data.allFees.filter(
          (fee) => fee.deleteFlag === 1
        );
        setData(filteredFees);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching deleted fees:", error);
    }
  };

  useEffect(() => {
    feeData();
  }, []);

  console.log("Delete fee : ", data);

  const columns: ColumnDef<FeeData>[] = useMemo(
    () => [
      { header: "Name", accessorKey: "feeName" },
      { header: "Type", accessorKey: "feeType" },
      { header: "Value", accessorKey: "feeValue" },
      { header: "Percent", accessorKey: "feePercent" },
      { header: "Category", accessorKey: "category.label" },
      {
        header: "Date Created",
        accessorKey: "createdAt",
        cell: ({ row }) =>
          new Date(row.original.createdAt).toISOString().split("T")[0],
      },
      {
        header: "Deleted",
        accessorKey: "updatedAt",
        cell: ({ row }) =>
          new Date(row.original.updatedAt).toISOString().split("T")[0],
      },
    ],
    [showMenu]
  );

  return (
    <div>
      <div className="md:flex items-center justify-between">
        <div className="md:flex items-center gap-4">
          <Input
            className="w-full sm:w-52 md:w-60"
            size="sm"
            placeholder="Search "
            prefix={<HiOutlineSearch className="text-lg" />}
          />
        </div>
        <div className="flex gap-2 items-center mb-4 ">
          <Button
            className=" flex items-center gap-1"
            variant="solid"
            size="sm"
          >
            Add Filter
          </Button>
        </div>
      </div>
      <div className="mt-5">
        {data && data.length > 0 ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <div>No Any Deleted Fees</div>
        )}
      </div>
    </div>
  );
};

export default InventoryFees;
