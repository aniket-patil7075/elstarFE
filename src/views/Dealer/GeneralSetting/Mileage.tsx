import { Switcher } from '@/components/ui'
import React, { ChangeEvent, useState } from 'react'

const Mileage = ({onMileageChange}:{onMileageChange:(data:any)=>void}) => {
    const [mileage, setMileage] = useState({
        mileage: false,
      });
    
      const handleToggle = (key) => {
        const updatedMileage = {
          ...mileage,
          [key]: !mileage[key],
        };
        setMileage(updatedMileage);
        onMileageChange(updatedMileage);
        return (updatedMileage);
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
            <Switcher onChange={() => handleToggle('mileage')} />
          </div>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default Mileage