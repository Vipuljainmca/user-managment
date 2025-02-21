import { Button, Col, Result, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Row style={{ marginTop: "20px", textAlign: "center" }} gutter={24}>
    <Col span={24}>
        <Result
            status="403"
            title={
                <span>
                    <h1>
                        <b>404</b>
                    </h1>
                    {/* <h2>Page Not Found</h2> */}
                    <h2>Permission Denied</h2>
                    
                </span>
            }
            subTitle="You don't have permision to visit this page you."
            extra={
                <Link to="/">
                    <Button className="primary-btn" type="primary">
      Go to Home
                    </Button>
                </Link>
            }
        />
    </Col>
</Row>
  )
}

export default PageNotFound
