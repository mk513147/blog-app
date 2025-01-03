import React,{useId} from 'react'

function Select({
    options=[],
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
  return (
    <div className='w-full'>
      {label && <label htmlFor={id}>{label}</label>}
      <select
      {...props}
      id={id}
      className={`${className} px-3 py-2 rounded-lg bg-white text-black outlline-none focus-bg-gray-50
      duratio-200 bordr border-gray-200 w-full`}
        ref={ref}
      >
    {options?.map((option)=>(
        <option key={option} value={option}>{option}</option>
    ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)
