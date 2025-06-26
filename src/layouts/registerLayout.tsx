import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import RegisterPage from "../components/registerPage";
import HeaderMenu from "../components/headerMenu";
import { Outlet } from "react-router-dom";
function RegisterLayout()
{
return (<Layout style={{  background: 'linear-gradient(90deg, #6a1b9a, #2c0050)' }}>
    <Header  style={{width:'100%',marginBottom:'20px'}}>
        <HeaderMenu/>
        </Header>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Outlet/>
      </Content>
      <Footer style={{ textAlign: 'center', color: 'white', background: 'transparent' }}>
        © 2025. All rights reserved.
      </Footer>
    </Layout>)
}

export default RegisterLayout;