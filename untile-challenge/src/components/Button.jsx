/* eslint-disable react/prop-types */

function Button({ handleClick, text }) {
  return (
    <button
      onClick={handleClick}
      className='w-[192px] h-[64px] ml-5 border-[#10345C] bg-gradient-to-r from-[#1C4E86] to-[#194475]
      text-[#FFF] text-[24px] rounded-lg hover:scale-95 duration-300 ease-in-out'
    >
      {text}
    </button>
  )
}

export default Button;