import { NavLink } from 'react-router-dom';

function Navbar() {
  const tabs = [
    { path: "/", title: "crypto calculator"},
    { path: "/tickers", title: "tickers"}
  ];

  return (
    <div className="w-full pt-5 mx-auto border-b-2 bg-[#F4F4F1] border-[#E0E0D7] flex justify-center items-end mb-5">
      {tabs.map(tab => (
        <NavLink to={tab.path} key={tab.title}
          className={({ isActive }) => isActive ?
            "uppercase mr-10 text-[#1E5891] border-b-2 border-[#1E5891]" 
            : "uppercase mr-10 text-[#8A8A86]"}
        >
          {tab.title}
        </NavLink>
      ))}
    </div>
  )
}

export default Navbar;