import { Table } from "antd";
import { useEffect, useState } from "react";
import { fetchLogs } from "../api/logsApi/logApi";
import { Log } from "./reusable/Log";
function UserLogs()
{
    const [logs, setLogs] = useState<Log[]>([]);
    const[error,setError]=useState<String>();
    const[loading,setLoading]=useState<Boolean>();
     useEffect(() => {
            const load = async () => {
              try {
                const [logs] = await Promise.all([
                  fetchLogs(),
                ]);
                setLogs(logs);
              } catch (err: any) {
                setError(err.message);
              } finally {
                setLoading(false);
              }
            };
            load();
          }, [])
          const columns = [
            {
              title: 'Username',
              dataIndex: 'username',
              key: 'username',
            },
            {
              title: 'Action',
              dataIndex: 'action',
              key: 'action',
            },
            {
              title: 'IPAddress',
              dataIndex: 'ipAddress',
              key: 'ipAddress',
            },
            {
                title: 'Timestamp',
                dataIndex: 'timestamp',
                key: 'timestamp',
              },
          ]
    return(
       <Table dataSource={logs} columns={columns}></Table>
    )
}
export default UserLogs;