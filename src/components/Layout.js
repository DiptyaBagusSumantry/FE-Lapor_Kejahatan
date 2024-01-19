import { useRouter } from "next/router";
import Navbar from "./Navbar";
import SidebarAdmin from "./SidebarAdmin";

export default function Layout({children}) {
  const route = useRouter()
  const isAdminRoute = route.pathname.includes("admin")
  const isLoginAdminRoute = route.pathname === "/login/admin"
  return (
    <>
      <Navbar />
      <div className="font-sans">
        {isAdminRoute && !isLoginAdminRoute === true ? (
          <div className="flex">
          <SidebarAdmin />
          {children}
          </div>
        ) : isLoginAdminRoute == true? (
          <div>
            {children}
          </div>
        ) : (
          <div>
            {children}
          </div>
        )}
      </div>
    </>
  )
}
