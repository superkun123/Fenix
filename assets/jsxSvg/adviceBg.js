import * as React from "react"
import Svg, { Circle, Defs, LinearGradient  } from 'react-native-svg';


export function SvgComponentAdviceBg(props) {
  return (
    <Svg
    width={238}
    height={238}
    viewBox="0 0 238 238"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle
      cx={119}
      cy={119}
      transform="rotate(180 119 119)"
      fill="url(#prefix__paint0_linear)"
      r={119}
    />
    <Defs>
      <LinearGradient
        id="prefix__paint0_linear"
        x1={119}
        y1={209.849}
        x2={119}
        y2={54.382}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.15} />
        <stop offset={1} stopColor="#7DCDE0" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
  )
}
