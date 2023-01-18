import {FunctionComponent} from 'react';
import {AbsoluteFill} from 'remotion';

interface LayoutProps {
	children: React.ReactNode;
}


const Title = ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-gray-600 text-xl ml-20 flex-1 font-sans tracking-tight">{children}</h1>
  )

const Layout: FunctionComponent<LayoutProps> = ({children}) => {
	return (
		<div
			style={{
				gridTemplateRows: '20% 80%',
			}}
			className="bg-gray-100 absolute inset-0 grid"
		>
			<div className="p-20 flex items-center">
				<Title>Hello from Duc Mai</Title>

				
			</div>
			<div className="p-20">{children}</div>
		</div>
	);
};

export default Layout;
