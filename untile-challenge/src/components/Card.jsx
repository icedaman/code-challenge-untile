/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function Card({ results }) {

  const { base, target, market, last, last_traded_at, volume, trade_url } = results;
  
  return (
    <div className='w-[870px] mx-auto p-5 mb-5 flex justify-between items-center rounded-lg border-1 text-[#454B51] border-[#454B51] shadow-lg shadow-[#b8c0c6]  bg-white'
      key={base + target + market}
    >
      <div className='text-left ml-5'>
        <h1 className='font-bold text-[32px]'>{base + '/' + target}</h1>
        <p className='font-semibold py-2'>Last value: <span className='font-normal'> {last} </span> </p>
        <p className='font-semibold'>Last trade: <span className='font-normal'> {new Date(last_traded_at).toLocaleString()} </span> </p>
      </div>
      <div className='text-right mr-5'>
        <Link to={trade_url}  className='font-semibold text-[#21639C] border-b-2 border-[#21639C]'>View more</Link>
        <p className='font-semibold pb-2 pt-5'>Market: <span className='font-normal'> {market.name} </span> </p>
        <p className='font-semibold'>Market Volume: <span className='font-normal'> {volume} </span> </p>
      </div>
    </div>
  )
}

export default Card;