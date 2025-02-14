import { Button, Switcher } from '@/components/ui'
import React, { ChangeEvent } from 'react'
import { HiClock, HiCube, HiUser } from 'react-icons/hi'

const WorkAssignments = () => {
      const onSwitcherToggle = (val: boolean, e: ChangeEvent) => {
        console.log(val, e);
      };
  return (
    <div><h4 className="text-xl border-b-2 border-gray-300 pb-2">
    Work Assignments
  </h4>
  <div className="flex flex-col xl:flex-row w-full my-3">
    <div className="w-full">
      <div className="my-5">
        <p className="  text-black font-semibold">Assignment Display</p>
        <div className="my-2 w-3/4">
          <p>
            Choose the types of assignments to display when you choose
            Assignments in the right panel of an order or when prompted
            for missing assignments before invoicing (see below). If you
            want to ensure the Service Writer and all labor items have
            been assigned, choose both Service Writer and Labor for
            Techs.
          </p>
          <div className="mt-4 inline-flex flex-wrap xl:flex gap-3">
            <Button className="flex">
              <HiUser className="text-xl me-2" />
              Service Writer
            </Button>
            <Button className="flex">
              {" "}
              <HiClock className="text-xl me-2" /> Labor for Techs
            </Button>
            <Button className="flex">
              {" "}
              <HiCube className="text-xl me-2" /> Parts for Techs
            </Button>
          </div>
        </div>
      </div>
      <h4 className="text-xl border-b-2 border-gray-300 py-4"></h4>
      <div className="my-5">
        <p className="  text-black font-semibold">
          Prompt for missing assignments before invoicing
        </p>
        <div className="my-2 w-100 flex justify-between">
          <p className="w-3/4">
            If any item is not assigned, prompt when converting an order
            to an invoice. This will happen on an order and in Workflow.
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

export default WorkAssignments