import {FunctionComponent} from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface MeasureProps {
	index: number;
	value: number;
}

const Measure: FunctionComponent<MeasureProps> = ({index, value}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const width = spring({
		frame: frame - 20 - index * 8, // Delay the starting frame of the animation
		from: 0,
		to: value,
		fps,
		config: {
			damping: 60,
		},
	});

	return (
		<div className="absolute inset-0 bg-white" style={{width: `${width}%`}} />
	);
};

export default Measure;
