import React, { useEffect, useState } from "react";
import {
    DownOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button,  Dropdown,  Menu, theme, Typography } from "antd";
import {  Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth";
import { API_URL } from "../../Comman/api";
import axios from "axios";


const HeaderApp = () => {
    const user = useSelector((state) => state.auth.user);
    const [imageUrl, setImageUrl] = useState("");
    console.log("header",user)
    const dispatch = useDispatch();
    const {
        token: { colorBgContainer },
      } = theme.useToken();
      useEffect(()=> {
        if(user){
            const url = API_URL + '/' + "api/documents/" + user?.id
            axios.get(url)
            .then((data)=>{console.log("data",data?.data[0]?.path)
                const profileUrl = API_URL + '/' +  data?.data[0]?.path;
                console.log(profileUrl,"profileurl")
                if(data?.data[0]?.path){
                  setImageUrl(profileUrl);
                }
    
            })
            .catch((error)=>console.log(error));
        }
      },[user])
      let userMenu = (
        <Menu
        //  onClick={onHandleLink}
        >
            <Menu.Item icon={<LogoutOutlined />} key={"logout"}>
                <a
                 onClick={()=>dispatch(logout())}
                  >Log Out</a>
            </Menu.Item>
        </Menu>
    );
    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <div style={{ margin : "0 20px",display : "flex", justifyContent : "space-between"}}>
                <div>
        <Button
          type="text"
          icon={true ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        //   onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        </div>
        <div>
                                <Avatar
                                    icon={<UserOutlined />}
                                    // onClick={() =>
                                    //     history.push({
                                    //         pathname: "/hrv2/employee/details/profile",
                                    //         state: { record: userInfo },
                                    //     })
                                    // }
                                    className="cursor-pointer"
                                    style={{ backgroundColor: "#87d068" }}
                                    // src={makeFileURL(userImage)}
                                    src={imageUrl ? imageUrl : "https://via.placeholder.com/150" }
                                    // src="https://via.placeholder.com/150"
                                />

                            
                                <Dropdown
                                 overlay={userMenu}
                                >
                                    <Typography.Text>
                                        {" "}
                                        {/* {userFullName(userInfo)} */}
                                       {user?.name}
                                         <DownOutlined />
                                    </Typography.Text>
                                </Dropdown>
                                </div>
                                </div>
                           
      </Header>
    );
};

export default HeaderApp;
