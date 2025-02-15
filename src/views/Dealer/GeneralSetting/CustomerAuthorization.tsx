import { Switcher } from '@/components/ui'
import React, { ChangeEvent, useState } from 'react'

const CustomerAuthorization = ({onAuthorizationChange}:{onAuthorizationChange:(data:any)=>void}) => {
    const [authorization, setAuthorization] = useState({
        inspectionAuthorizationFrist: false,
        inspectionAuthorizationSecond: false,
        inspectionAuthorizationThird: false,
      });

      const handleToggle = (key) => {
        const updatedAuthorization = {
          ...authorization,
          [key]: !authorization[key],
        };
        setAuthorization(updatedAuthorization);
        onAuthorizationChange(updatedAuthorization);
        return(updatedAuthorization);
      };

  return (
    <div><h4 className="text-xl border-b-2 border-gray-300 pb-2">
    Customer Authorization
  </h4>
  <div className="flex flex-col xl:flex-row w-full my-3">
    <div className="w-full">
      <div className="my-5">
        <p className="  text-black font-semibold">
          show Inspection Authorization Actions
        </p>
        <div className="my-2 w-100 flex justify-between">
          <p className="w-3/4">
            Show authorize and decline actions per inspection item that
            needs attention. This is visible to you and to your
            customers.
          </p>
          <div>
            <Switcher onChange={() => handleToggle('inspectionAuthorizationFrist')} />
          </div>
        </div>
      </div>

      <h4 className="text-xl border-b-2 border-gray-300"></h4>

      <div className="my-5">
        <div className="my-2 w-100 flex justify-between">
          <p className="  text-black font-semibold">
            show Inspection Authorization Actions
          </p>

          <div>
            <Switcher onChange={() => handleToggle('inspectionAuthorizationSecond')} />
          </div>
        </div>
      </div>

      <h4 className="text-xl border-b-2 border-gray-300 "></h4>

      <div className="my-5">
        <p className="  text-black font-semibold">
          show Inspection Authorization Actions
        </p>
        <div className="my-2 w-100 flex justify-between">
          <p className="w-3/4">
            Show authorize and decline actions per inspection item that
            needs attention. This is visible to you and to your
            customers.
          </p>
          <div>
            <Switcher onChange={() => handleToggle('inspectionAuthorizationThird')} />
          </div>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default CustomerAuthorization