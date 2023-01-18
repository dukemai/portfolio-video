import {FunctionComponent} from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface TrendProps {
	border: boolean;
	color: string;
	previousMonthValue: number;
	pastMonthValue: number;
}

const Trend: FunctionComponent<TrendProps> = ({
	border = false,
	color,
	previousMonthValue,
	pastMonthValue,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const y = spring({
		frame,
		from: 100,
		to: 0,
		fps,
		config: {
			stiffness: 100,
		},
	});

	const delta = Math.abs(
		(1 - pastMonthValue / previousMonthValue) * 100
	).toFixed(1);
	const isTrendingUp = pastMonthValue > previousMonthValue;
	const prefix = isTrendingUp ? '+' : '-';

	return (
		<div
			className={`mt-4 text-base leading-tight px-4 py-3 rounded-lg z-10 ${
				border ? 'border-2' : ''
			} border-${color}-500 font-mono uppercase`}
			style={{width: 'fit-content', transform: `translateY(${y}px)`}}
		>
			<span className={`text-${color}-500`}>
				{prefix}
				{delta}% from last month
			</span>
		</div>
	);
};

export default Trend;
