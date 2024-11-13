/* eslint-disable react/prop-types */

function Select({ value, setterFn, children}) {
  return (
    <select name={value} id={value} value={value}
      className='w-[192px] h-[64px] pl-5 ml-5 border-[#E0E0D7] bg-white text-[#353A3E] text-[24px] rounded-lg'
      onChange={setterFn}
    >
      {children}
    </select>
  )
}

export default Select;