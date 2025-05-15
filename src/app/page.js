import Image from "next/image";
import styles from "./page.module.css";
import MainHome from "@/components/Home/Home";
import Dashboard from "@/components/SellerDashboard/dashboard/Dashboard";

export default function Home() {
  return (
    <div>
{/*     <MainHome />
 */}
 <Dashboard />
        </div>
  );
}
