import { motion } from "framer-motion"
import {useState} from "react"
import crypto from "crypto"

type ColorInfo = {
  from: string[],
  to: string[]
}

export const randomColor = () : string => {
  return `#${crypto.randomBytes(3).toString("hex")}`
}

const colorWeight = (color: string, weight: number) => {
  let red = Math.floor(parseInt(color.substring(1,3), 16) * weight).toString(16).padStart(2, '0')
  let green = Math.floor(parseInt(color.substring(3,5), 16) * weight).toString(16).padStart(2, '0')
  let blue = Math.floor(parseInt(color.substring(5,7), 16) * weight).toString(16).padStart(2, '0')

  return `#${red}${green}${blue}`
}

const Logo = ({props} : any) => {
  const [colors, setColors] = useState<ColorInfo>({from: ["#aa1740", "#dd6be2", "#aa1740"], to: ["#dd6be2", "#aa1740", "#dd6be2"]})

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={400.333}
      height={400.333}
      viewBox="0 0 1045 1045"
      {...props}
      cursor="pointer"
      onClick={() => {
        let color = randomColor();
        let color2 = randomColor();
        setColors({
          from: [colorWeight(color, 0.8), colorWeight(color2, 0.8), colorWeight(color, 0.6), colorWeight(color2, 0.8)],
          to: [colorWeight(color2, 1), colorWeight(color2, 1), colorWeight(color2, 0.6), colorWeight(color, 0.8)]
        });
      }}
    >
      <defs>
        <linearGradient id="logo_svg__d">
          <stop offset={0} stopColor="#4b2c30" stopOpacity={0.804}/>
          <stop offset={1} stopColor="#ff969c" stopOpacity={0.804} />
        </linearGradient>
        <linearGradient id="logo_svg__c">
          <stop offset={0} stopColor="#2a1015" stopOpacity={0.827} />
          <stop offset={1} stopColor="#4b161d" stopOpacity={0.804} />
        </linearGradient>

        <linearGradient id="logo_svg__b">

        <motion.stop
        animate={{
            stopColor: [
              "#b233d4", "#d4337c", "#dd4840", "#b233d4", "#8637a9", "#bf26d2", "#b233d4"
            ],
        }}
        transition={{
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            duration: 25,
        }}
        />

        <motion.stop
        offset="50%"
        animate={{
            stopColor: [
              "#d68888", "#d6bb88", "#ba93bf", "#93a3bf", "#d68888", "#d68888"
            ],
        }}
        transition={{
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",

            duration: 25,
        }}
        />

        </linearGradient>

        <linearGradient id="logo_svg__a">

        <motion.stop
        animate={{
            stopColor: colors.from,
        }}
        transition={{
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",

            duration: 5,
        }}
        />

        <motion.stop
        offset="50%"
        stopOpacity={0.471}
        animate={{
            stopColor: colors.to,
        }}
        transition={{
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",

            duration: 5,
        }}
        />
        </linearGradient>



        <linearGradient
          xlinkHref="#logo_svg__a"
          id="logo_svg__g"
          x1={232.764}
          y1={767.708}
          x2={1166.291}
          y2={767.708}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(.76128 0 0 .76135 -6.318 -6.361)"
        />
        <linearGradient
          xlinkHref="#logo_svg__b"
          id="logo_svg__e"
          x1={871.24}
          y1={4895.204}
          x2={9575.35}
          y2={4895.204}
          gradientUnits="userSpaceOnUse"
        />
        <linearGradient
          xlinkHref="#logo_svg__c"
          id="logo_svg__h"
          x1={348.273}
          y1={537.141}
          x2={698.426}
          y2={537.141}
          gradientUnits="userSpaceOnUse"
        />
        <linearGradient
          xlinkHref="#logo_svg__d"
          id="logo_svg__i"
          gradientUnits="userSpaceOnUse"
          x1={452.7}
          y1={537.592}
          x2={594.421}
          y2={537.592}
        />
        <filter
          id="logo_svg__f"
          x={0}
          width={1}
          y={0}
          height={1}
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation={0.017} />
        </filter>
      </defs>
      <g>

      </g>

      <path
        d="M521.032 969.658c-22.886-51.185-65.267-110.618-112.956-158.404-18.268-18.305-29.174-27.813-68.68-59.877-69.328-56.27-94.797-81.586-119.85-119.137-22.658-33.961-36.707-69.73-44.36-112.946-3.357-18.958-4.732-73.553-2.501-99.307 7.765-89.651 35.047-159.884 79.26-204.043 63.329-63.252 146.413-55.774 208.915 18.802 24.03 28.672 47.957 73.98 61.46 116.378 1.585 4.976 3.222 9.048 3.638 9.048.416 0 2.049-4.072 3.628-9.048 7.943-25.03 21.908-56.215 34.511-77.065 30.795-50.947 69.709-83.045 113.723-93.805 13.006-3.18 38.929-3.812 50.923-1.241 72.949 15.635 127.034 89.044 145.261 197.158 6.87 40.748 8.858 95.666 4.638 128.147-5.956 45.847-20.406 85.41-44.216 121.058-24.69 36.964-48.003 60.605-115.666 117.29-46.737 39.155-67.62 59.126-94.732 90.6-41.531 48.21-81.03 107.47-95.068 142.632l-2.424 6.07z"
        opacity={0.996}
        fill="url(#logo_svg__g)"
        stroke="#000"
        strokeWidth={1.415}
      />



      <path d="M171.587 473c0 2 .713 2 94.685 2 93.971 0 94.684 0 94.684-2s-.713-2-94.684-2c-93.972 0-94.685 0-94.685 2zM197.488 595c0 2 .731 2 80.512 2 79.78 0 80.512 0 80.512-2s-.731-2-80.512-2c-79.78 0-80.512 0-80.512 2zM524.497 849.073c0 134.42 0 135.153 2 135.153s2-.733 2-135.153 0-135.154-2-135.154-2 .734-2 135.154zM686.26 473.348c0 2 .733 2 97.395 2 96.661 0 97.394 0 97.394-2s-.733-2-97.394-2c-96.662 0-97.395 0-97.395 2zM688.364 594.857c0 2 .745 2 82.033 2s82.034 0 82.034-2-.746-2-82.034-2c-81.288 0-82.033 0-82.033 2z" />
      
      <g>
        <path
          d="M506.656 713.168c-11.486-1.108-24.171-3.916-37.056-8.203-47.459-15.79-86.543-51.667-106.32-97.597-11.743-27.269-16.392-56.251-13.832-86.223 5.264-61.627 44.41-117.88 100.469-144.374 23.966-11.327 46.448-16.404 72.776-16.435 52.246-.061 100.7 22.65 134.433 63.01 22.046 26.378 37.185 62.03 40.236 94.757 1.164 12.486.453 37.552-1.382 48.682-2.47 14.986-9.307 35.58-16.653 50.169-32.412 64.361-101.838 103.046-172.67 96.214z"
          opacity={0.996}
          fill="url(#logo_svg__h)"
          stroke="#000"
          strokeWidth={0.986}
        />
      </g>
      <g>
        <path
          d="M510.997 603.714c-24.125-4.295-45.364-21.865-54.184-44.823-3.257-8.478-4.38-24.81-2.37-34.465 4.67-22.431 23.302-42.423 47.298-50.748 6.36-2.207 11.281-2.9 21.064-2.968 16.387-.114 27.365 3.153 40.847 12.156 33.357 22.273 39.91 64.684 14.878 96.298-6.516 8.229-22.157 18.704-32.854 22.002-9.91 3.056-25.426 4.196-34.679 2.548z"
          opacity={0.996}
          fill="url(#logo_svg__i)"
          stroke="#000"
          strokeWidth={1.446}
        />
      </g>
      <g> 
        <motion.path
          d="M 348,539.5 H 479.7 L 522.80734,496.26469 566.8,538.5 H 699"
          animate={{
            pathLength: [0, 1],
            stroke: ["#e51837", "#d01661", "#e51837"],
          }}
          transition={{
            duration: 2.05,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          fill={"None"}
          stroke={"#fff"}
          strokeWidth={"6px"}
        />

      </g>
    </svg>
  );
}

export default Logo