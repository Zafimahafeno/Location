import React from 'react'
import HeaderAdmin from './HeaderAdmin';
import SidebarAdmin from './SidebarAdmin';

const LayoutAdmin = ({
  search,
  setSearch,
  children
}) => {
  return (
    <div className='layout'>
      <div className="layout-header border ">
        <HeaderAdmin search={search} setSearch={setSearch} />
      </div>
      <div className="layout-sidebar">
        <SidebarAdmin />
      </div>
      <div className="layout-content">
        {children}
      </div>
    </div>
  )
}

export default LayoutAdmin
