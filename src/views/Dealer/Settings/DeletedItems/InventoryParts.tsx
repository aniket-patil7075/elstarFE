import { DataTable } from "@/components/shared";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getParts, setPartsTableData } from "../../DealerInventory/store";
import { cloneDeep } from "lodash";
import { HiDotsHorizontal, HiOutlineSearch } from "react-icons/hi";
import {
  apiDeletePart,
  getAllDeletedParts,
} from "../../DealerLists/Services/DealerInventoryServices";
import {
  setDrawerOpen,
  setSelectedDealer,
  useAppDispatch,
} from "../../Workflow/store";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useAppSelector } from "@/store";
import { Button, Input } from "@/components/ui";

type PartData = {
  partName: string;
  brand: string;
  partSku: string;
  partSerialNo: number;
  category: string;
  dealer: string;
  cost: number;
  retail: number;
  available: number;
  reserved: number;
  onHand: number;
  minQuantity: number;
  maxQuantity: number;
};

const InventoryParts = () => {
  const [data, setData] = useState<PartData[]>([]);
  const dispatch = useAppDispatch();
  // const data = useAppSelector((state) => state.inventory.allParts);
  const loading = useAppSelector((state) => state.inventory.loading);
  const filterData = useAppSelector((state) => state.inventory.filterData);
  const [showMenu, setShowMenu] = useState<{ [key: string]: boolean }>({});
  const [showForm, setShowForm] = useState(false);
  const originalData = useAppSelector((state) => state.inventory.allParts);
  const [isUpdate, setIsUpdate] = useState(false);

  const { pageIndex, pageSize, sort, query, total } = useAppSelector(
    (state) => state.inventory.partsTableData
  );

  const fetchData = useCallback(() => {
    dispatch(getParts({ pageIndex, pageSize, sort, query, filterData }));
  }, [pageIndex, pageSize, sort, query, filterData, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, sort, filterData]);

  const partsTableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total, filterData }),
    [pageIndex, pageSize, sort, query, total]
  );

  const partData = async () => {
    try {
      const response = await getAllDeletedParts();
      if (response?.status === 200 && response?.data?.status === "success") {
        const parts = response.data.allParts.filter(
          (part) => part.deleteFlag === 1
        );
        setData(parts);
      } else {
        console.error("Unexpected response format:", response);
        return [];
      }
    } catch (error) {
      console.error("Error fetching deleted parts:", error);
      return [];
    }
  };

  useEffect(() => {
    partData();
  }, []);

  const columns: any[] = useMemo(
    () => [
      { header: "Name", accessorKey: "partName", sortable: true },
      { header: "Brand", accessorKey: "brand.label" },
      { header: "SKU", accessorKey: "partSku" },
      { header: "Part", accessorKey: "partSerialNo" },
      { header: "Category", accessorKey: "category.label" },
      { header: "Vendor", accessorKey: "vendor.label" },
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
    const newpartsTableData = cloneDeep(partsTableData);
    newpartsTableData.pageIndex = page;
    dispatch(setPartsTableData(newpartsTableData));
  };

  const onSelectChange = (value: number) => {
    const newpartsTableData = cloneDeep(partsTableData);
    newpartsTableData.pageSize = Number(value);
    newpartsTableData.pageIndex = 1;
    dispatch(setPartsTableData(newpartsTableData));
  };

  const onSort = (sort: any) => {
    const newpartsTableData = cloneDeep(partsTableData);
    newpartsTableData.sort = sort;
    dispatch(setPartsTableData(newpartsTableData));
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
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={loading}
            pagingData={{
              total: partsTableData.total as number,
              pageIndex: partsTableData.pageIndex as number,
              pageSize: partsTableData.pageSize as number,
            }}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
          />
        ) : (
          <div>No Any Deleted Parts</div>
        )}
      </div>
    </div>
  );
};

export default InventoryParts;
