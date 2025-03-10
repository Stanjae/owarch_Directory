import CBanner from "@/components/cui/CBanner";
import CFooter from "@/components/cui/CFooter";
import NavBar from "@/components/cui/NavBar";

export default function PublicPagesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main>
        <NavBar/>
        <main>
            <CBanner/>
            {children}
        </main>
          <CFooter/>
      </main>
    );
  }