import { Switcher } from '@/components/ui'
import React, { ChangeEvent } from 'react'

const EstimateLineItems = () => {
    const onSwitcherToggle = (val: boolean, e: ChangeEvent) => {
                    console.log(val, e);
                  };
  return (
    <div><h4 className="text-xl border-b-2 border-gray-300 pb-2">
    Estimate & Invoice Line Items
  </h4>
  <div className="flex flex-col xl:flex-row w-full my-3">
    <div className="w-full">
      <div className="my-5">
        <p className="  text-black font-semibold">
          Require a category for each line item before invoicing
        </p>
        <div className="my-2 w-100 flex justify-between">
          <p className="w-3/4">
            When converting to an invoice, you will be prompted to
            include any missing categories for line items that will be
            included on the final invoice.
          </p>
          <div>
            <Switcher defaultChecked onChange={onSwitcherToggle} />
          </div>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default EstimateLineItems