import { Button, Dropdown, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import Icon from '@mdi/react';
import { mdiBank } from '@mdi/js';
import { DownOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
const items = [
    { label: 'Profile', key: 'item-1' },
    { label: 'Change Password', key: 'item-2' },  
    { label: 'Signout', key: 'item-3' },
  ];
function HeaderMenu()
{
    return(
        <Header
        className="w-full h-150 flex "
        style={{
          background: 'linear-gradient(90deg, #6a1b9a, #2c0050)',
          color: "white",borderBottom: '5px solid black'
        }}
      >
        <Menu
          mode="horizontal"
          theme="dark"
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'transparent',
            color: 'white',
            height: '100%',
            width: '100%',
            borderBottom: 'none',
          }}
          selectable={false} 
        >
          <Menu.Item key="bank" style={{ display: 'flex', alignItems: 'center', marginLeft: 40 }}>
            <Icon path={mdiBank} size={2} color="white" />
          </Menu.Item>
          <Menu.Item key="spacer" style={{ marginLeft: '150px', pointerEvents: 'none', opacity: 0 }} />
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="about">About Us</Menu.Item>
        <Link to="/api/users" > <Menu.Item key="users">Users</Menu.Item></Link> 
        <Link to="/api/groups"><Menu.Item key="groups">Groups</Menu.Item></Link>  
          <Menu.Item key="contact">Contact Us</Menu.Item>

          <Menu.Item key="account">
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                My account <DownOutlined />
              </a>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </Header>
    )
}
export default HeaderMenu;