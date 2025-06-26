import { Outlet } from "react-router-dom";
import HeaderMenu from "../components/headerMenu";


function homeLayout()
{
    return(
        <div className="h-screen w-full overflow-hidden flex flex-col">
        <header className="h-[64px] w-full fixed top-0 left-0 z-50">
          <HeaderMenu />
        </header>
        <main className="flex-1 w-full pt-[64px] pb-[100px] overflow-y-auto">
          <Outlet />
        </main>
        <footer className="background-grey">

        </footer>
      </div>
    )
}
export default homeLayout;