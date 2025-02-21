import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    message,
    Row,
    Select,
    Spin,
    Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadProfile from "./UploadProfile";
import { USER } from "../../Comman/api";
import dayjs from "dayjs";
import useApiRequest from "../../Comman/useApiRequest";
import { useSelector } from "react-redux";

const AddUser = ({ allowedPermission }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const {postApi, putApi} = useApiRequest();
    const [profileImageId, setProfileImageId] = useState("");
    const role = useSelector(state => state.auth?.user?.role);

    const [isMobileView, setIsMobileView] = useState(false);
    const navigate = useNavigate();

    const updateScreenSize = () => {
        setIsMobileView(window.innerWidth <= 768);
    };

    const location = useLocation();
    const editRecord = location.state?.data;

    console.log(editRecord);

    useEffect(() => {
        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);
        if (editRecord) {
            editRecord.dateOfBirth = dayjs(editRecord?.dateOfBirth)
            form.setFieldsValue(editRecord);
            console.log(editRecord,"modify")
        }
        return () => {
            window.removeEventListener("resize", updateScreenSize);
        };
    }, []);

    function isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const onFinish = value => {
        // console.log(value);
        value.dateOfBirth = value.dateOfBirth.format("YYYY-MM-DD")
       const emailValid = isValidEmail(value.email);
       if(!emailValid){
        message.error("Invalid email format")
        return;
       }
        setLoading(true);

        const successFn = data => {
            setLoading(true);
            console.log(data);
            navigate("/user-management/view-user");
        };
        const errorFn = error => {
            setLoading(false);
            console.log(error);
        };
        if (editRecord) {
            // if (allowedPermission?.includes("edit")) {
                if(profileImageId){
                    value.profilePicture = profileImageId;
                }
                putApi(USER, editRecord?._id, value, successFn, errorFn);
            // } else {
            //     setLoading(false);
            //     message.error("You Don't have permission to Edit this record");
            // }
        } else {
            // postApi("user",value,successFn,errorFn);
            // if (allowedPermission.includes("create")) {
                if(role!=="user"){
                    postApi(USER,value, successFn, errorFn);
                }else{
                    message.error("User can not have permission to create new user")
                    setLoading(false)
                }
            // } else {
            //     message.error("You Don't have permission to create the record");
            //     setLoading(false);
            // }
        }
    };

    return (
        <>
            <Row>
                <Typography.Text
                    style={{ fontSize: "16px", fontWeight: "600" }}>
                    Add User
                </Typography.Text>
            </Row>

            <Card 
            >
                <Spin spinning={loading}>
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        <Row gutter={[12, 12]}>
                            <Col span={isMobileView ? 24 : 12}>
                                <Form.Item label="Name" name={"name"}>
                                    <Input placeholder="Name" />
                                </Form.Item>
                            </Col>
                            <Col span={isMobileView ? 24 : 12}>
                                <Form.Item label="Email" name={"email"}>
                                    <Input
                                        placeholder="Email"
                                    />
                                </Form.Item>
                            </Col>
                        { !editRecord &&   <Col span={isMobileView ? 24 : 12}>
                                <Form.Item label="Password" name={"password"}>
                                    <Input.Password />
                                </Form.Item>
                            </Col>}
                            <Col span={isMobileView ? 24 : 12}>
                                <Form.Item label="Data of Birth" name={"dateOfBirth"} >
                                   <DatePicker style={{width : "100%"}} format='DD/MM/YYYY'/>
                                </Form.Item>
                            </Col>
                            <Col span={isMobileView ? 24 : 12}>
                                <Form.Item label="Role" name={"role"} >
                                  <Select>
                                    <Select.Option value="user">User</Select.Option>
                                    <Select.Option disabled={role==="user"} value="admin">Admin</Select.Option>
                                  </Select>
                                </Form.Item>
                            </Col>
                           {editRecord && <UploadProfile id={editRecord?._id} setProfileImageId={setProfileImageId} profilePictureId={editRecord?.profilePicture}/>
                           }
                            {/* <Col span={isMobileView ? 24 : 12}>
            <Form.Item label="Name" >
                <Input placeholder='Name'/>
            </Form.Item>
            </Col> */}
                        </Row>

                        <Form.Item>
                            <Button
                                htmlType="summit"
                                style={{
                                    backgroundColor: "#1677ff",
                                    color: "white",
                                }}>
                                summit
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        </>
    );
};

export default AddUser;
