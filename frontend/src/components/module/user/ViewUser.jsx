import { Button, Col, Divider, Popconfirm, Row, Spin, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {PlusOutlined} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { USER } from '../../Comman/api';
import useApiRequest from '../../Comman/useApiRequest';
import { useSelector } from 'react-redux';

const ViewUser = () => {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const role = useSelector(state => state.auth?.user?.role);
    const user = useSelector(state => state.auth?.user);
    const {deleteApi, getApi} = useApiRequest();
    const columns = [
        {
            title : "#",
            key : "1",
            render : (item,record, index)=>  index+1,
        },
        {
            title :"Name",
            key :"2",
            render : (item)=> item?.name,
        },
        {
            title : "Email",
            key : 3,
            render : (item)=> item?.email,
        },
        {
            title : "Role",
            key : 4,
            render : (item)=> item?.role,
        },
        {
            title : "Date Of Birth",
            key : 4,
            render : (item)=> formatDate(item?.dateOfBirth),
        },
        {
            title : "Status",
            key : 5,
            render : (item)=> item?.isProfileComplete ? "Complete profile" : "Incomplete Profile",
        },
        {
            title : "Action",
            key : 6,
            render : (item,record) => <>
         <a disabled={role==="user" && user?.id !== record?._id}
         onClick={() => editObject(record)}> Edit</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Are you sure to delete this?"
                        onConfirm={() => deleteObject(record)}
                        okText="Yes"
                        cancelText="No">
                        <a disabled={role==="user"}
                        //  disabled={!allowedPermission?.includes("delete")}
                         >Delete</a>
                    </Popconfirm>
            </>
        }
    ]
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); 
      };
    useEffect(()=>{
        loadUserData();
    },[])
    const loadUserData = () => {
        setLoading(true);
        const successFn = (data) => {
            setLoading(false);
            setTableData(data);
        }
        const errorFn = (error) => {
            setLoading(false);
            console.log(error);
        }
        getApi(USER,{},successFn,errorFn);
    }
    const editObject = (record) => {
    console.log(record)
    navigate("/user-management/add-user",{
        state : {data : record}
    })
    }
    const deleteObject = (record) => {
        setLoading(true);
        console.log(record)
        const successFn = (data) => {
            setLoading(false);
            console.log(data);
            loadUserData();
        };
        const errorFn = (error) => {
            setLoading(false);
            console.log(error);
        }
        deleteApi(USER,record?._id,successFn,errorFn);
        // deleteUser(record.id,successFn,errorFn);
        
    }
  return (
    <div>
      <Row gutter={[12,12]} style={{display:"flex",justifyContent:"space-between", margin:"10px" }}>
            <Col >
            <Typography.Text style={{fontSize:"16px", fontWeight:"600"}}> View All User</Typography.Text>
            </Col>
            <Col>
        <Button icon={<PlusOutlined />} disabled={role==="user"} onClick={()=> navigate("/user-management/add-user")} style={{backgroundColor:"#1677ff", color:"white"}}>
            Add User
        </Button>
            </Col>
      </Row>
      <Spin spinning={loading} >
      <Table
      dataSource={tableData}
      columns={columns}
      />
      </Spin>
    </div>
  )
}

export default ViewUser
