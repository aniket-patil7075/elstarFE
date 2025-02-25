import { useAppDispatch, useAppSelector } from "@/store";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getTires, setTiresTableData } from "../../DealerInventory/store";
import {
  apiDeleteTire,
  getAllDeletedTires,
} from "../../DealerLists/Services/DealerInventoryServices";
import { HiDotsHorizontal, HiOutlineSearch } from "react-icons/hi";
import { DataTable } from "@/components/shared";
import { Button, Input } from "@/components/ui";
type TireData = {
  brand: string;
  model: string;
  size: string;
  note: string;
  url: string;
  tireSku: string;
  category: string;
  vendor: string;
  bin: string;
  cost: number;
  retail: number;
  available: number;
  reserved: number;
  onHand: number;
};
type ColumnDef<T> = {
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
  cell?: (info: any) => JSX.Element;
};

const InventoryTires = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<TireData[]>([]);

  const loading = useAppSelector((state) => state.inventory.loading);
  const filterData = useAppSelector((state) => state.inventory.filterData);
  const { pageIndex, pageSize, sort, query, total } = useAppSelector(
    (state) => state.inventory.tiresTableData
  );

  const originalData = useAppSelector((state) => state.inventory.allTires);
  const fetchData = useCallback(() => {
    dispatch(getTires({ pageIndex, pageSize, sort, query, filterData }));
  }, [pageIndex, pageSize, sort, query, filterData, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, sort, filterData]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const [showMenu, setShowMenu] = useState<{ [key: string]: boolean }>({});

  const tireData = async () => {
    try {
      const response = await getAllDeletedTires();
      if (response?.data?.status === "success") {
        const filteredTires = response.data.allTires.filter(
          (tire) => tire.deleteFlag === 1
        );
        setData(filteredTires);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching deleted tires:", error);
    }
  };

  useEffect(() => {
    tireData();
  }, []);

  console.log("Deleted tire : ", data);

  const columns: ColumnDef<TireData>[] = useMemo(
    () => [
      { header: "Brand", accessorKey: "brand" },
      { header: "Model", accessorKey: "model" },
      { header: "Size", accessorKey: "size" },
      { header: "URL", accessorKey: "url" },
      { header: "SKU", accessorKey: "tireSku" },
      { header: "Category", accessorKey: "category" },
      { header: "Vendor", accessorKey: "vendor" },
      { header: "Bin", accessorKey: "bin" },
      { header: "Cost", accessorKey: "cost" },
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

  const onPaginationChange = (page: number) => {
    const newTableData = { ...tableData, pageIndex: page };
    dispatch(setTiresTableData(newTableData));
  };

  const onSelectChange = (value: number) => {
    const newTableData = {
      ...tableData,
      pageSize: Number(value),
      pageIndex: 1,
    };
    dispatch(setTiresTableData(newTableData));
  };

  const onSort = (sort: any) => {
    const newTableData = { ...tableData, sort };
    dispatch(setTiresTableData(newTableData));
  };

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
          <div>No Any Deleted Tires</div>
        )}
      </div>
    </div>
  );
};

export default InventoryTires;
