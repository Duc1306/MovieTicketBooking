import React, { useEffect } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSiderbar from '../../components/admin/AdminSiderbar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext'
import Loading from '../../components/Loading'

const Layout = () => {
  const { isAdmin, adminLoading, fetchIsAdmin } = useAppContext()

  useEffect(() => {
    // Chỉ gọi khi chưa kiểm tra
    if (isAdmin === null) fetchIsAdmin()
  }, [isAdmin, fetchIsAdmin])

  if (adminLoading || isAdmin === null) return <Loading/>
  if (!isAdmin) return <Navigate to="/" replace />

  return  (
    <>
        <AdminNavbar />
        <div className='flex'>
            <AdminSiderbar />
            <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
                <Outlet />
            </div>
        </div>
    </>
  ) 
}

export default Layout