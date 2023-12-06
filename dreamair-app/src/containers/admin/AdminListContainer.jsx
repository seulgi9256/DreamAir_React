import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as admin from '../../apis/admin'
import AdminList from '../../components/admin/AdminList';
import Header from '../../components/fragment/Header'
import Adminfooter from '../../components/fragment/Adminfooter'
import Adminsidebar from '../../components/fragment/Adminsidebar'


const AdminListContainer = () => {

  const navigate = useNavigate()

  const {adminNo} = useParams();
  const [adminList, setAdminList] = useState([]);

  const getAdminList = async () => {
    const response = await admin.admin_list(); 
    const data = await response.data;
    console.log(data);
    setAdminList(data);
  };

  const onDelete = async (adminNo) => {
    const response = await admin.admin_delete(adminNo);
    console.log(response.data);
    alert('삭제 완료')

    // navigate('/admin')
    getAdminList();
  }

  useEffect(() => {
    getAdminList();
}, [])

  return ( 
    <>
    <Header/>
    <div className='d-flex'>
        <Adminsidebar/>
        <AdminList adminList={adminList} adminNo={adminNo} onDelete={onDelete}/>
    </div>
    <Adminfooter/>  
    </>
  )
}

export default AdminListContainer