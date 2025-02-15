import { Switcher } from '@/components/ui'
import React, { ChangeEvent, useState } from 'react'

const ESignature = ({ onSignatureChange }: { onSignatureChange: (data: any) => void }) => {
  const [signature, setSignature] = useState({
    signatureFirst: false,
    signatureSecond: false,

  });

  const handleToggle = (key) => {
    const updatedSignature = {
      ...signature,
      [key]: !signature[key],
    };
    setSignature(updatedSignature);
    onSignatureChange(updatedSignature);
    return (updatedSignature);
  };
  
  return (
    <div><h4 className="text-xl border-b-2 border-gray-300 pb-2">
      E-Signature Settings
    </h4>
      <div className="flex flex-col xl:flex-row w-full my-3">
        <div className="w-full">
          <div className="my-5">
            <p className="  text-black font-semibold">
              Request e-signature on first estimate authorization
            </p>
            <div className="my-2 w-100 flex justify-between">
              <p className="w-3/4">
                The first estimate authorization requested from a customer
                will have e-signature enabled by default.
              </p>
              <div>
                <Switcher onChange={() => handleToggle('signatureFirst')} />
              </div>
            </div>
          </div>

          <h4 className="text-xl border-b-2 border-gray-300 "></h4>

          <div className="my-5">
            <p className="  text-black font-semibold">
              Request e-signature on all estimate authorizations
            </p>
            <div className="my-2 w-100 flex justify-between">
              <p className="w-3/4">
                All subsequent estimate authorizations requested from a
                customer will have e-signature enabled by default
              </p>
              <div>
                <Switcher onChange={() => handleToggle('signatureSecond')} />
              </div>
            </div>
          </div>
        </div>
      </div></div>
  )
}

export default ESignature