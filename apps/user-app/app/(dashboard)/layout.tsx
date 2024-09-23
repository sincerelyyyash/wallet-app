import { SidebarComponent } from "@/components/sidebarComponent";
import Footer from "@repo/ui/footer";

export default function Layout({ children }: { children: React.ReactNode; }): JSX.Element {
  return (
    <div className="flex">
      <SidebarComponent />
      <div className="flex-grow p-4">
        {children}
        <div className="flex justify-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}

