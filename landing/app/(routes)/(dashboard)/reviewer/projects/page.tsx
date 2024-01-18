import { Input, Textarea } from '@nextui-org/react'
import React from 'react'

const ClientProjectPage = () => {
  return (
    <div className="m-12">
      <h1 className='text-2xl fw-bold mb-5'>New Project</h1>
      <form action="">
        <label htmlFor="">Title</label>
        <Input type="text" name='' label="Project's Name" className="mb-4" />

        <label htmlFor="">Description</label>
        <Textarea type="text" label="Description" className="mb-4" />

        <label htmlFor="">Project URL</label>
        <Input type="text" label="Project URL" className="mb-4" />

        <label htmlFor="">Project File</label>
        <Input type="file" label="" className="mb-4" />

        <a href="" type="submit" className='z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium [&>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover'>Submit</a>
      </form>
    </div>
  )
}

export default ClientProjectPage