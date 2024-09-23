import { SidebarComponent } from "@/components/sidebarComponent";

export default function Layout({ children }: { children: React.ReactNode; }): JSX.Element {
  return (
    <div className="flex">
      <SidebarComponent />
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
}

