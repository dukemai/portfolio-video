/* eslint-disable camelcase */
import {FunctionComponent} from 'react';
import Layout from './Layout';

import Tablet from './components/icons/Tablet';
import Desktop from './components/icons/Desktop';
import Tv from './components/icons/Tv';
import Phone from './components/icons/Phone';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import Measure from './components/Measure';
import Trend from './components/Trend';

const DEVICE_LOOKUP = {
	phone: Phone,
	tv: Tv,
	desktop: Desktop,
	tablet: Tablet,
};

const Stat = ({
	index,
	children,
}: {
	index: number;
	children: React.ReactNode;
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Scale the index value up by a factor of 8
	const scale = index * 8;

	const offset = spring({
		frame: frame - 10 - scale, // Delay the starting frame of the animation
		from: -100,
		to: 0,
		fps,
		config: {
			damping: 60,
			mass: 0.4,
		},
	});

	const opacity = interpolate(frame, [10 + scale, 20 + scale], [0, 1]);

	return (
		<div
			className="flex items-center border-t-2 border-green-500 px-4 relative"
			style={{transform: `translateY(${offset}px)`, opacity}}
		>
			{children}
		</div>
	);
};
const Value = ({children}: {children: React.ReactNode}) => (
	<div
		className="z-10 font-sans text-3xl leading-none"
		style={{width: '700px'}}
	>
		{children}
	</div>
);

const Label = ({children}: {children: React.ReactNode}) => (
	<div
		className="text-black text-lg font-sans capitalize z-10"
		style={{width: '250px'}}
	>
		{children}
	</div>
);
const getCurrentValue = (spring: number, endValue: number) =>
	Math.ceil(
		interpolate(spring, [0, 1], [0, endValue], {
			extrapolateRight: 'clamp',
		})
	);
const formatNumber = (i: number) => new Intl.NumberFormat().format(i);
const data = [
	{
		total_row_count: 18,
		timeframe: [1637081199, 1639673199],
		meta: {aggregation: 'view_start'},
		data: [
			{
				views: 130733672,
				value: 130733672,
				total_watch_time: 8731601750121,
				total_playing_time: 5353697584974,
				negative_impact: null,
				field: 'phone',
			},
			{
				views: 14470905,
				value: 14470905,
				total_watch_time: 8188264507338,
				total_playing_time: 6259201041271,
				negative_impact: null,
				field: 'desktop',
			},
			{
				views: 4232855,
				value: 4232855,
				total_watch_time: 1093806322135,
				total_playing_time: 911524058234,
				negative_impact: null,
				field: 'tv',
			},
			{
				views: 3755811,
				value: 3755811,
				total_watch_time: 1431185303219,
				total_playing_time: 871339792375,
				negative_impact: null,
				field: 'tablet',
			},
		],
	},
	{
		total_row_count: 17,
		timeframe: [1634399199, 1637081199],
		meta: {aggregation: 'view_start'},
		data: [
			{
				views: 133478441,
				value: 133478441,
				total_watch_time: 19276358886803,
				total_playing_time: 6661500447203,
				negative_impact: null,
				field: 'phone',
			},
			{
				views: 15079609,
				value: 15079609,
				total_watch_time: 8822592094110,
				total_playing_time: 6834326126397,
				negative_impact: null,
				field: 'desktop',
			},
			{
				views: 4466728,
				value: 4466728,
				total_watch_time: 1835334835200,
				total_playing_time: 943620400985,
				negative_impact: null,
				field: 'tablet',
			},
			{
				views: 4010607,
				value: 4010607,
				total_watch_time: 1114319229977,
				total_playing_time: 993875797077,
				negative_impact: null,
				field: 'tv',
			},
		],
	},
];

const Overall: FunctionComponent = () => {
	const leadingDeviceViews = data[0].data.sort((a, b) => b.views - a.views)[0]
		.views;

	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const driver = spring({
		frame,
		fps,
		config: {
			damping: 60,
			overshootClamping: true,
		},
	});

	return (
		<Layout showTitle>
			<div className="grid grid-rows-5 bg-lime-200 grid-cols-1">
				{data[0].data.map((device, i) => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					const Icon = DEVICE_LOOKUP[device.field];
					const totalViews = getCurrentValue(driver, device.views);
					const previousMonthViews =
						data[1].data.find((d) => d.field === device.field)?.views || 0;

					return (
						<Stat key={device.value} index={i}>
							<div className="z-10 w-28 pl-6 mr-20">
								<Icon />
							</div>
							<Measure
								index={i}
								value={(device.views / leadingDeviceViews) * 100}
							/>
							<Value>{formatNumber(totalViews)}</Value>
							<Label>{device.field === 'tv' ? 'TV' : device.field}</Label>
							<div className="flex justify-end -mt-4" style={{width: '550px'}}>
								<Trend
									border
									color="green"
									pastMonthValue={device.views}
									previousMonthValue={previousMonthViews}
								/>
							</div>
						</Stat>
					);
				})}
			</div>
		</Layout>
	);
};

export default Overall;
