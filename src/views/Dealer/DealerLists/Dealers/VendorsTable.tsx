import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { HiDotsHorizontal, HiOutlinePlus } from 'react-icons/hi'; // Importing the plus icon from react-icons
import DataTable from '@/components/shared/DataTable';
import { getVendors, useAppDispatch, useAppSelector } from '../Store';
import { getAllVendors } from '../../DealerInventory/store';
import { Notification, toast } from '@/components/ui';
import { apiDeleteVendor } from '../Services/DealerInventoryServices';

// Define the proper structure for your columns based on ColumnDef
type ColumnDef<T> = {
    header: string;
    accessorKey: keyof T;
    sortable?: boolean;
};

// Define the type of data you will pass in
type VendorData = {
    id: string;
    vendorName: string;
    vendorUrl: string;
    vendorAccountNumber: number;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: number;
};

const VendorsTable = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.list.allVendors);
    const loading = useAppSelector((state) => state.list.loading);
    const filterData = useAppSelector((state) => state.list.filterData);
    const [showMenu, setShowMenu] = useState<{ [key: string]: boolean }>({});



    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.dealer.tableData
    );


    const fetchData = useCallback(() => {
        dispatch(getVendors({ pageIndex, pageSize, sort, query, filterData }))
    }, [pageIndex, pageSize, sort, query, filterData, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort, filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

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
            await apiDeleteVendor(id);
    
            // Show success notification
            toast.push(
              <Notification title="Success" type="success">
                Vendor Deleted Successfully
              </Notification>
            );
    
            // Refresh data after deletion
            fetchData();
          } catch (error) {
            console.error("Error deleting vendor:", error);
            toast.push(
              <Notification title="Error" type="danger">
                Failed to delete vehicle
              </Notification>
            );
          }
        }
    
        setShowMenu((prev) => ({
          ...prev,
          [id]: false,
        }));
      };

    const [savedTags] = useState<string[]>(['Permanent', 'VIP', 'New', 'Returning']); // List of saved tags
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search term for filtering tags
    const [selectedTags, setSelectedTags] = useState<Record<number, string[]>>({}); // Tags for each customer by index
    const columns: ColumnDef<VendorData>[] = useMemo(() => [
        { header: 'Name', accessorKey: 'vendorName', sortable: true },
        { header: 'URL', accessorKey: 'vendorUrl', sortable: true },
        { header: 'Account No.', accessorKey: 'vendorAccountNumber', sortable: true },
        { header: 'First Name', accessorKey: 'vendorContactPerson.firstName', sortable: true },
        { header: 'Last Name', accessorKey: 'vendorContactPerson.lastName', sortable: true },
        { header: 'Email', accessorKey: 'vendorContactPerson.email' },
        { header: 'Phone Number', accessorKey: 'vendorContactPerson.contactNumber' },
         {
                header: "",
                accessorKey: "actions",
                cell: ({ row }: { row: any }) => {
                    const id = row.original?._id;  // Get the correct _id
           
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
    ], [showMenu]);

    // Handler for adding a tag
    const handleAddTag = (rowIndex: number, tag: string) => {
        setSelectedTags(prevTags => {
            const newTags = prevTags[rowIndex] ? [...prevTags[rowIndex]] : [];
            if (!newTags.includes(tag)) {
                newTags.push(tag);
            }
            return { ...prevTags, [rowIndex]: newTags };
        });
    };

    // Handler for removing a tag
    const handleRemoveTag = (rowIndex: number, tag: string) => {
        setSelectedTags(prevTags => {
            const newTags = prevTags[rowIndex]?.filter(t => t !== tag) || [];
            return { ...prevTags, [rowIndex]: newTags };
        });
    };

    return (
        <DataTable
            columns={columns}
            data={data}
        />
    );
};

export default VendorsTable;
