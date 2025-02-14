import { Switcher } from '@/components/ui'
import React, { ChangeEvent } from 'react'

const Mileage = () => {
    const onSwitcherToggle = (val: boolean, e: ChangeEvent) => {
                console.log(val, e);
              };
  return (
    <div><h4 className="text-xl border-b-2 border-gray-300 pb-2">
    Mileage & Engine Hour Requirements
  </h4>
  <div className="flex flex-col xl:flex-row w-full mt-3">
    <div className="w-full">
      <div className="my-2">
        <div className="my-2 w-100 flex justify-between">
          <p className="  text-black font-semibold">
            Require mileage or engine hours before invoicing
          </p>

          <div>
            <Switcher onChange={onSwitcherToggle} />
          </div>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default Mileage