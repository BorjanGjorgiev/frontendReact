import { Content, Footer } from "antd/es/layout/layout";
import index from "C:\Users\borjan.gjorgiev\Desktop\Project\frontendReact\src\index.css"

import bankpicture from "../images/bankpicture.png"
import aclu from "../images/aclu.png"
import amazon from "..//images/amazon.png"
import slack from "../images/slack.png"
import canopy from "../images/canopy.png"
import { Link } from "react-router-dom";
function homePage()
{

    return(
        <div style={{
              background: 'linear-gradient(90deg, #6a1b9a, #2c0050)'}}>
        <Content className="container" style={{display: 'grid',
    gridTemplateColumns: '40% 60%',
    
    margin: 'auto',
          width: 'fit-content',
          background: 'linear-gradient(90deg, #6a1b9a, #2c0050)'}}>
    <div className="flex flex-col h-[400px] w-[750px] text-white px-6 justify-center space-y-1 ml-22">
  <div className="text-3xl font-bold">Banking made</div>
  <div className="text-3xl font-bold">simple, online and</div>
  <div className="text-3xl font-bold">on-the-go</div>
  <div className="text-xs">Banking made simple, online and on-the-go. Manage</div>
  <div className="text-xs">your finances hassle-free</div>
  <div className="flex gap-4">
    <Link to="/api/auth/login"><button className="border border-white px-4 py-2 rounded text-white hover:bg-white hover:text-purple-700">Log In</button></Link> 
    <Link to="/api/auth/register"><button className="border border-white px-4 py-2 rounded text-white hover:bg-white hover:text-purple-700">Sign Up</button></Link> 
  </div>
</div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
           
            height: '500px', 
          }}>
            <img src={bankpicture} className="w-[550px]"></img>
          </div>
        </Content>
        <Footer className="background-grey" style={{  backgroundColor: '#f5f5f5',  padding: '40px 0',margin: 0 }}>
            <div  className="flex flex-col items-center justify-center h-full gap-10">
                <div className='text-3xl font-bold' >
                    We have partnered with top companies
                </div>
                <div className="w-full border-t border-gray-300"></div>
                <div className="flex flex-row gap-10 ">
                    <img className="images" src={canopy}></img> <img className="images" src={slack}></img> <img className="images" src={aclu}></img> <img className="images" src={amazon}></img>
                </div>
                <div className="w-full border-t border-gray-300"></div>
            </div>
        </Footer>
        </div>
    );
}
export default homePage;