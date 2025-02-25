import { Button, Input } from '@/components/ui'
import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

const InventoryLabors = () => {
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
                {/* {data && data.length > 0 ? (
                    <DataTable
                        columns={columns}
                        data={data}
                        loading={!data.length}
                    />
                ) : (
                    <div>No Any Deleted Orders</div>
                )} */}
            </div>
        </div>
  )
}

export default InventoryLabors