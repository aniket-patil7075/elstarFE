import React, { useMemo, useState } from 'react';
import { HiDotsHorizontal, HiOutlinePlus } from 'react-icons/hi'; // Importing the plus icon from react-icons
import DataTable from '@/components/shared/DataTable';
import { Notification, toast } from '@/components/ui';

// Define the proper structure for your columns based on ColumnDef
type ColumnDef<T> = {
    header: string;
    accessorKey: keyof T;
    sortable?: boolean;
};

// Define the type of data you will pass in
type CustomerData = {
    company: string;
    phone: number;
    email: string;
    zip: number;
    vehicles : number
    orders:number
    createdDate: string;
    tags?: string[]; // Adding tags to each customer
};

const FleetsTable = () => {
    const [data, setData] = useState<CustomerData[]>([
        { company: 'Roberts',phone: 8753827838,email:'abc@gmail.com',zip:465669,vehicles:12,  orders: 4, createdDate: "10/06/2002", tags: [] },{ company: 'Stalworth',phone: 8753827838,email:'connectstalworth@gmail.com',zip:462008,vehicles:12,  orders: 4, createdDate: "10/06/2002", tags: []}
    ]);

    const [savedTags] = useState<string[]>(['Permanent', 'VIP', 'New', 'Returning']); // List of saved tags
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search term for filtering tags
    const [selectedTags, setSelectedTags] = useState<Record<number, string[]>>({}); // Tags for each customer by index
    const [showMenu, setShowMenu] = useState<{ [key: string]: boolean }>({});

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
            // await apiDeleteVehicle(id);
    
            // Show success notification
            toast.push(
              <Notification title="Success" type="success">
                Vehicle Deleted Successfully
              </Notification>
            );
    
            
          } catch (error) {
            console.error("Error deleting vehicle:", error);
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

    const columns: ColumnDef<CustomerData>[] = useMemo(() => [
        { header: 'Company Name', accessorKey: 'company', sortable: true },
        { header: 'Phone', accessorKey: 'phone' },
        { header: 'Email', accessorKey: 'email' },
        { header: 'Zip Code', accessorKey: 'zip' },
        { header: 'Vehicles', accessorKey: 'vehicles' },
        { header: 'Orders', accessorKey: 'orders' },
        { header: 'Created Date', accessorKey: 'createdDate' },
        {
            header: 'Tags',
            accessorKey: 'tags',
            // Custom cell renderer to include tag selection
            sortable: false,
            cell: (rowIndex: number) => (
                <div className="relative">
                    {selectedTags[rowIndex]?.map((tag, idx) => (
                        <span key={idx} style={{ marginRight: '8px' }}>
                            {tag} <button onClick={() => handleRemoveTag(rowIndex, tag)} className="ml-1 text-red-500">x</button>
                        </span>
                    ))}
                    {/* Updated Button with Styles */}
                    <button
                        style={{
                            backgroundColor: '#f0f0f0', // light grey background
                            width: '20px', // square shape
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '3px', // square with slightly rounded corners
                            border: '1px solid #fff', // optional border
                            cursor: 'pointer',
                        }}
                        // onClick={() => document.getElementById(`tagDropdown-${rowIndex}`)?.classList.toggle('hidden')}
                    >
                        <HiOutlinePlus size={24} color="#3457D5" /> {/* Blue color and size of the icon */}
                    </button>
                    
                    {/* Compact Dropdown for Tag Selection */}
                    <div
                        id={`tagDropdown-${rowIndex}`}
                        className="hidden absolute z-10 bg-white border border-gray-300 p-2 rounded shadow-md mt-2 w-48"
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-2 p-1 w-full border border-gray-300 rounded text-sm"
                        />
                        <ul className="max-h-32 overflow-y-auto text-sm">
                            {savedTags.filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())).map((tag, idx) => (
                                <li key={idx} className="flex items-center mb-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedTags[rowIndex]?.includes(tag) || false}
                                        onChange={() => handleAddTag(rowIndex, tag)}
                                        className="mr-2"
                                    />
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ),
        },
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
    ], [selectedTags, searchTerm , showMenu]);

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

export default FleetsTable;
