import { FunctionComponent } from "react";
import { AbsoluteFill } from "remotion";

interface LayoutProps {
  children: React.ReactNode;
  showTitle?: boolean;
}

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-gray-600 text-xl flex-1 tracking-tight">{children}</h1>
);

const Layout: FunctionComponent<LayoutProps> = ({ children, showTitle }) => {
  return (
    <div
      style={{
        gridTemplateRows: "20% 80%",
      }}
      className="bg-gray-100 grid inset-0 absolute grid-cols-1"
    >
      {showTitle && (
        <div className="p-20 flex items-center">
          <Title>Hello from Duc Mai</Title>
          <div>right</div>
        </div>
      )}
      <div className="p-20">{children}</div>
    </div>
  );
};

export default Layout;
