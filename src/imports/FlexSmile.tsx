import svgPaths from "./svg-55rwzxvn9x";
import { motion } from "framer-motion";

function Head() {
  return (
    <div className="absolute inset-[7.5%]" data-name="head">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 170 170">
        <g>
          <path d={svgPaths.pfac0180} fill="var(--fill-0, #FFE5A3)" fillOpacity="0.8" id="Vector" />
          <path d={svgPaths.pfac0180} fill="url(#paint0_radial_1_309)" id="Vector_2" />
        </g>
        <defs>
          <radialGradient cx="0" cy="0" gradientTransform="translate(70 54.5) rotate(56.4588) scale(106.78)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_309" r="1">
            <stop stopColor="#FFE5A3" stopOpacity="0.8" />
            <stop offset="0.745192" stopColor="#FFD059" stopOpacity="0.8" />
            <stop offset="1" stopColor="#EFAC00" stopOpacity="0.8" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

function EyeNormal() {
  return (
    <div className="absolute inset-[37.5%_33.5%_53.5%_33.5%]" data-name="eye/normal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 18">
        <g id="eye/normal">
          <path d={svgPaths.p3896100} fill="var(--fill-0, #1E293B)" id="Vector" />
          <path d={svgPaths.p286dd280} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p30596a00} fill="var(--fill-0, #1E293B)" id="Vector_3" />
          <path d={svgPaths.p2198100} fill="var(--fill-0, white)" id="Vector_4" />
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

function MouthSmile() {
  return (
    <div className="absolute bottom-[39%] left-[40%] right-[40%] top-1/2" data-name="mouth/smile">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 22">
        <g id="mouth/smile">
          <path d={svgPaths.p11978980} fill="var(--fill-0, #1E293B)" id="Ellipse 1" />
          <g id="Mask group">
            <mask height="22" id="mask0_1_293" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="40" x="0" y="0">
              <path d={svgPaths.p11978980} fill="var(--fill-0, #1E293B)" id="Ellipse 2" />
            </mask>
            <g mask="url(#mask0_1_293)">
              <path d={svgPaths.pdcbc0f0} fill="var(--fill-0, #F472B6)" id="Vector" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function FlexSmile() {
  return (
    <motion.div 
      className="relative size-full" 
      data-name="Flex/smile"
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Head />
      <EyeNormal />
      <Cheek />
      <MouthSmile />
    </motion.div>
  );
}