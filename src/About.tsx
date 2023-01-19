import { FunctionComponent } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import Layout from "./Layout";

interface AboutProps {}

interface TextProps {
  children: React.ReactNode;
  index: number;
  isLast?: boolean;
}

const Text: FunctionComponent<TextProps> = ({ children, index, isLast }) => {
  const frame = useCurrentFrame();
  const start = 5 + 40 * index;
  const end = start + 40;
  const appearingY = interpolate(frame, [start, end], [50, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const disappearingY = interpolate(frame, [end + 10, end + 30], [0, -50], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <span
      style={{
        transform: `translateY(${
          frame > end && !isLast ? disappearingY : appearingY
        }px)`,
      }}
      className="ml-4 uppercase font-bold absolute top-0 z-10 left-0"
    >
      {children}
    </span>
  );
};

const skills = [
  "React",
  "Svelte",
  "Next js",
  "Nodejs",
  "Javascript",
  "Frontend",
];
const About: FunctionComponent<AboutProps> = () => {
  const frame = useCurrentFrame();
  const welcomeOpacity = interpolate(
    frame,
    [5 + 40 * skills.length, 5 + 40 * skills.length + 30],
    [0, 1]
  );

  return (
    <AbsoluteFill className="bg-black flex-1 items-center justify-center">
      <div className="text-white relative">
        <div className="text-4xl">
          Hello, This is <span className="text-lime-400">Duc Mai</span>
        </div>
        <div className="text-3xl flex overflow-hidden">
          <span className="text-red-700 uppercase font-bold">
            proficient in
          </span>
          <div className="relative">
            <span className="opacity-0 w-64 inline-block">Long word</span>
            {skills.map((sk, index) => (
              <Text
                key={index}
                index={index}
                isLast={index === skills.length - 1}
              >
                {sk}
              </Text>
            ))}
          </div>
        </div>
        <div
          style={{ opacity: welcomeOpacity }}
          className="absolute top-40 border p-4 rounded-md border-lime-500 text-lg"
        >
          Welcome to my world{" "}
          <span className="underline text-lime-400">
            https://hittaducmai.se
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default About;
