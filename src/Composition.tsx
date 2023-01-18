import {AbsoluteFill, Series} from 'remotion';
import Intro from './Intro';
import Layout from './Layout';
import {Logo} from './Logo';
import Overall from './Overall';


export const MyComposition = () => {
	return (
			<Series>
				<Series.Sequence name="Intro" durationInFrames={130}>
					<Intro />
				</Series.Sequence>
				<Series.Sequence name="Overall" durationInFrames={180}>
					<Overall />
				</Series.Sequence>
			</Series>
	);
};
