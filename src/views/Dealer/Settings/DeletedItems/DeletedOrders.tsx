import { Button, Input } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/store';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { getEstimatesByPage } from '../../Workflow/store';
import { getAllEstimates } from '../../Services/WorkflowService';
import { DataTable } from '@/components/shared';

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

const DeletedOrders = () => {
    const [data, setData] = useState<Estimate[]>([]);

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
                const filteredEstimates = response.allEstimates.filter(estimate => estimate.estimateFlag === 1);
                setData(filteredEstimates);
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

    console.log("Deleted orders : ", data)


    const columns: ColumnDef<Estimate>[] = useMemo(
        () => [
            { header: "Order No", accessorKey: "orderNo", sortable: true },
            { header: "Order Name", accessorKey: "orderName" },
            {
                header: "Customer",
                accessorKey: "customer",
                cell: ({ row }) => {
                    const { firstName, lastName } = row.original.customer;
                    return firstName && lastName
                        ? `${firstName} ${lastName}`
                        : firstName || lastName || "N/A";
                },
            },
            {
                header: "Vehicle",
                accessorKey: "vehicle",
                cell: ({ row }) => {
                    const { make, model, year } = row.original.vehicle;
                    return make && model && year
                        ? `${make} ${model} ${year}`
                        : make || model || year || "N/A";
                },
            },
            {
                header: "Total",
                accessorKey: "totalOrderAmount",
                cell: ({
                    row,
                }: {
                    row: { original: { grandTotal: number; remainingAmount: number } };
                }) => row.original.grandTotal + row.original.remainingAmount,
            },
            {
                header: "Date Created",
                accessorKey: "createdAt",
                cell: ({ row }) => new Date(row.original.createdAt).toISOString().split("T")[0]
            },
            {
                header: "Deleted",
                accessorKey: "updatedAt",
                cell: ({ row }) => new Date(row.original.updatedAt).toISOString().split("T")[0]
            },
            { header: "", accessorKey: "orderNo" },
        ],
        []
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
                    <DataTable
                        columns={columns}
                        data={data}
                        loading={!data.length}
                    />
                ) : (
                    <div>No Any Deleted Orders</div>
                )}
            </div>
        </div>
    )
}

export default DeletedOrders