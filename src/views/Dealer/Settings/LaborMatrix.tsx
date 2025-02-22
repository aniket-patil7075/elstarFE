import React from 'react'
import Matrices from './PricingMatrix/Matrices'
import ExampleMatrix from './PricingMatrix/ExampleMatrix'

const LaborMatrix = () => {
  return (
    <div>
        <div className="mb-5 ms-2">
          <h3 className="mb-4 lg:mb-0 ">Labor Matrix</h3>
          <p className='text-gray-700'>Use Pricing Matrix to systematize your parts markup and stramline your profits.</p>
        </div>
        <div className=" mx-auto py-4 px-2">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/6 ">
            <Matrices />
          </div>
          <div className="w-full md:w-4/6 ">
            <ExampleMatrix />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LaborMatrix