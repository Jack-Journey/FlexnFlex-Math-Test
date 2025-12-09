import svgPaths from "./svg-b5suu1p7tl";
import { motion } from "framer-motion";

function Head() {
  return (
    <div className="absolute inset-[7.5%]" data-name="head">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 170 170">
        <g>
          <path d={svgPaths.pfac0180} fill="var(--fill-0, #FFE5A3)" fillOpacity="0.8" id="Vector" />
          <path d={svgPaths.pfac0180} fill="url(#paint0_radial_1_351)" id="Vector_2" />
        </g>
        <defs>
          <radialGradient cx="0" cy="0" gradientTransform="translate(70 54.5) rotate(56.4588) scale(106.78)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_351" r="1">
            <stop stopColor="#FFE5A3" stopOpacity="0.8" />
            <stop offset="0.745192" stopColor="#FFD059" stopOpacity="0.8" />
            <stop offset="1" stopColor="#EFAC00" stopOpacity="0.8" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

function EyeCorrect() {
  return (
    <div className="absolute inset-[37.5%_33.5%_57.25%_33.5%]" data-name="eye/correct">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 11">
        <g id="eye/correct">
          <path d={svgPaths.p29b4b80} fill="var(--fill-0, #1E293B)" id="Vector" />
          <path d={svgPaths.p2613d800} fill="var(--fill-0, #1E293B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Cheek() {
  return (
    <div className="absolute inset-[46.5%_20.5%_48.5%_21.5%]" data-name="cheek">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 10">
        <g id="cheek">
          <path d={svgPaths.pa69f680} fill="var(--fill-0, #F472B6)" id="Vector" opacity="0.4" />
          <path d={svgPaths.p220b0700} fill="var(--fill-0, #F472B6)" id="Vector_2" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}

function MouthLaugh() {
  return (
    <div className="absolute bottom-[33.7%] left-[43%] right-[43%] top-1/2" data-name="mouth/laugh">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 33">
        <g id="mouth/laugh">
          <path d={svgPaths.p15e5b800} fill="var(--fill-0, #1E293B)" id="Ellipse 1" />
          <g id="Mask group">
            <mask height="33" id="mask0_1_335" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="28" x="0" y="0">
              <path d={svgPaths.p9b67800} fill="var(--fill-0, #1E293B)" id="Ellipse 2" />
            </mask>
            <g mask="url(#mask0_1_335)">
              <path d={svgPaths.p3d961a00} fill="var(--fill-0, #F472B6)" id="Vector" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function FlexCorrect() {
  return (
    <div className="relative size-full" data-name="Flex/correct">
      <Head />
      <EyeCorrect />
      <Cheek />
      <MouthLaugh />
      <motion.div 
        className="absolute h-[119px] left-[3px] top-[78px] w-[83px]" 
        data-name="thumbsUp"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-[-2.1%_-3.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 124">
            <g id="thumbsUp">
              <path d={svgPaths.p11335e00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1509a840} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="5" />
            </g>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}