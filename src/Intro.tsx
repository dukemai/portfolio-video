import {FunctionComponent} from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {format} from 'date-fns';
import Layout from './Layout';

const Intro: FunctionComponent = () => {
	const frame = useCurrentFrame();

	const titleOpacity = interpolate(frame, [5, 25], [0, 1]);
	const subtitleOpacity = interpolate(frame, [30, 50], [0, 1]);

	const titleY = interpolate(frame, [5, 25], [50, 0], {
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.ease),
	});
	const subtitleY = interpolate(frame, [30, 50], [50, 0], {
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.ease),
	});
	const timeframe = [1637081199, 1639673199];

	return (
		<Layout>
			<div>
				<h1
					className="text-4xl leading-none tracking-tight"
					style={{
						opacity: titleOpacity,
						transform: `translateY(${titleY}px)`,
					}}
				>
					Welcome to Duc Mai's blog
				</h1>
				<h2
					className="text-gray-700 mb-48 tracking-tight"
					style={{
						fontSize: '120px',
						opacity: subtitleOpacity,
						transform: `translateY(${subtitleY}px)`,
					}}
				>
					{format(new Date(timeframe[0] * 1000), 'MMM. dd')} –{' '}
					{format(new Date(timeframe[1] * 1000), 'MMM. dd, yyyy')}
				</h2>
				<div className="border-t border-gray-400">
					<h2 className="text-gray-400 uppercase my-8">Powered by Remotion</h2>
					<div className="grid grid-cols-5 h-4">
						<div className="bg-pink-500" />
						<div className="bg-green-500" />
						<div className="bg-blue-500" />
						<div className="bg-lime-500" />
						<div className="bg-yellow-500" />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Intro;
