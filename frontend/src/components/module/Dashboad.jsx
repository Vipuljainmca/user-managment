import { Card } from "antd";
import { useEffect, useState } from "react";
import { UserOutlined, CheckCircleOutlined, ExclamationCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import useApiRequest from "../Comman/useApiRequest";
import { DASHBOARD } from "../Comman/api";

const DashboardMetrics = () => {
    const {getApi} = useApiRequest();
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    todayRegistrations: 0,
    incompleteProfiles: 0,
    completedProfiles: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
        const successFn = (data) => {
            setMetrics(data)
        }
        const errorFn = (error) => {
            console.log(error);
        }
      getApi(DASHBOARD,{},successFn,errorFn);
    };
    fetchMetrics();
  }, []);

  return (
    <div style={ {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        padding: "16px",
      }}>
      <MetricCard title="Total Registrations" count={metrics.totalUsers} icon={<UserOutlined />} />
      <MetricCard title="Today's Registrations" count={metrics.todayRegistrations} icon={<UserAddOutlined />} />
      <MetricCard title="Incomplete Profiles" count={metrics.incompleteProfiles} icon={<ExclamationCircleOutlined />} />
      <MetricCard title="Completed Profiles" count={metrics.completedProfiles} icon={<CheckCircleOutlined />} />
    </div>
  );
};

const MetricCard = ({ title, count, icon }) => {
  return (
    <Card className="shadow-md" style={{
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: "20px",
        borderRadius: "8px",
      }}>
      <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{icon}</div>
      <h3>{title}</h3>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{count}</p>
    </Card>
  );
};

export default DashboardMetrics;

