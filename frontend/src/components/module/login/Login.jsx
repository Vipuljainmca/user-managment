import { Button, Card, Col, DatePicker, Form, Input, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../base/redux/auth";
import { useNavigate } from "react-router-dom";
import { LOGIN, SIGNUP } from "../../Comman/api";
import useApiRequest from "../../Comman/useApiRequest";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileView, setIsMobileView] = useState(false);
    const [pageType, setPageType] = useState("login");
    const { postApi } = useApiRequest();
    const updateScreenSize = () => {
        setIsMobileView(window.innerWidth <= 768);
    };

    useEffect(() => {
        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);
        return () => {
            window.removeEventListener("resize", updateScreenSize);
        };
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onFinish = value => {
        console.log(value);
        const successFn = data => {
            console.log(data);
            message.success("Login Successful")
            dispatch(loginSuccess(data));
            navigate("/user-management/view-user");
        };
        const errorFn = error => {
          if(error?.response?.data?.message){
            message.error(error?.response?.data?.message)
          }
            console.log(error);
        };
        postApi(LOGIN, value, successFn, errorFn);
    };
    function isValidEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
  }

    const SignupUser = value => {
        console.log(value);
        value.dateOfBirth = value.dateOfBirth.format("YYYY-MM-DD")
        const emailValid = isValidEmail(value.email);
        if(!emailValid){
         message.error("Invalid email format")
         return;
        }
        const successFn = (data) => {
          console.log(data)
          const postLogin = data => {
            console.log(data);
            message.success("Login Successful")
            dispatch(loginSuccess(data));
            navigate("/user-management/view-user");
        };
        const failedLogin = error => {
            console.log(error);
            if(error?.response?.data?.message){
              message.error(error?.response?.data?.message)
            }
        };
          postApi(LOGIN,{email,password},postLogin,failedLogin)
        }

        const errorFn = (error) => {
          if(error?.response?.data?.error){
            message.error(error?.response?.data?.error)
          }
          console.log(error);
        }
        postApi(SIGNUP,value,successFn,errorFn);
    };
    return (
        <Row
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f2f5",
            }}>
            <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2em",
                    borderRadius: "8px",
                }}>
                {pageType === "login" ? (
                  <Card className="shadow-md" style={{
                    textAlign: "center",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    padding: "20px",
                    borderRadius: "8px",
                  }}>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <h2 className="auth-type-title family-poppins">
                            Login to your Account
                        </h2>
                        <Form onFinish={onFinish}>
                            <Row
                                style={{
                                    justifyContent: "center",
                                    marginTop: "1em",
                                }}>
                                <Col span={24}>
                                    {" "}
                                    <Form.Item
                                        name={"email"}
                                        rules={[{ required: true }]}>
                                        <Input
                                            className="custom-input-box-f5"
                                            prefix={<UserOutlined />}
                                            style={{
                                                width: isMobileView
                                                    ? "90%"
                                                    : "60%",
                                                marginBottom: "1em",
                                            }}
                                            placeholder="Email id"
                                            value={email}
                                            onChange={e =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    {" "}
                                    <Form.Item
                                        name={"password"}
                                        rules={[{ required: true }]}>
                                        <Input.Password
                                            prefix={<LockOutlined />}
                                            placeholder="password"
                                            className="custom-input-box-f5"
                                            style={{
                                                width: isMobileView
                                                    ? "90%"
                                                    : "60%",
                                                marginBottom: "1em",
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row
                                style={{
                                    justifyContent: "center",
                                    marginBottom: "1em",
                                }}>
                                <Button
                                    style={{
                                        width: isMobileView ? "90%" : "60%",
                                    }}
                                    type="primary"
                                    htmlType="summit">
                                    Login
                                </Button>
                                <Row></Row>
                                <Col span={24} style={{ margin: "10px" }}>
                                    Don't have account ?{" "}
                                    <a onClick={() => setPageType("signup")}>
                                        Signup
                                    </a>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    </Card>
                ) : (
                  <Card >
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <h2 className="auth-type-title family-poppins">
                            Signup
                        </h2>
                        <Form onFinish={SignupUser}>
                            <Row
                                style={{
                                    justifyContent: "center",
                                    marginTop: "1em",
                                }}>
                                <Col span={24}>
                                    {" "}
                                    <Form.Item
                                        name={"name"}
                                        rules={[{ required: true }]}>
                                        <Input
                                            className="custom-input-box-f5"
                                            prefix={<UserOutlined />}
                                            style={{
                                                width: isMobileView
                                                    ? "90%"
                                                    : "60%",
                                                marginBottom: "1em",
                                            }}
                                            placeholder="Full Name"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    {" "}
                                    <Form.Item
                                        name={"email"}
                                        rules={[{ required: true }]}>
                                        <Input
                                            className="custom-input-box-f5"
                                            prefix={<UserOutlined />}
                                            style={{
                                                width: isMobileView
                                                    ? "90%"
                                                    : "60%",
                                                marginBottom: "1em",
                                            }}
                                            placeholder="Email id"
                                            value={email}
                                            onChange={e =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    {" "}
                                    <Form.Item
                                        name={"password"}
                                        rules={[{ required: true }]}>
                                        <Input.Password
                                            prefix={<LockOutlined />}
                                            placeholder="password"
                                            className="custom-input-box-f5"
                                            style={{
                                                width: isMobileView
                                                    ? "90%"
                                                    : "60%",
                                                marginBottom: "1em",
                                            }}
                                            onChange={e =>
                                              setPassword(e.target.value)
                                          }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                <Form.Item
                                        name={"dateOfBirth"}>
                                        <DatePicker
                                            className="custom-input-box-f5"
                                            // prefix={<UserOutlined />}
                                            style={{
                                                width: isMobileView
                                                    ? "90%"
                                                    : "60%",
                                                marginBottom: "1em",
                                            }}
                                            placeholder="Data of Birth"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row
                                style={{
                                    justifyContent: "center",
                                    marginBottom: "1em",
                                }}>
                                <Button
                                    style={{
                                        width: isMobileView ? "90%" : "60%",
                                    }}
                                    type="primary"
                                    htmlType="summit">
                                    signup
                                </Button>
                            </Row>
                            <Col span={24} style={{ margin: "10px" }}>
                                You have account ?{" "}
                                <a onClick={() => setPageType("login")}>
                                    login
                                </a>
                            </Col>
                            <Row></Row>
                        </Form>
                    </div>
                    </Card>
                )}
            </Col>
        </Row>
    );
};

export default Login;
