import * as React from "react"
import Svg, { Path, ClipPath, LinearGradient, Defs, G, Stop } from 'react-native-svg';


export function SvgComponentFlag(props) {
  return (
    <Svg
      width={64}
      height={96}
      viewBox="0 0 64 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M0 32V6.5A6.5 6.5 0 016.5 0H15v32H0z" fill="#4593A7" />
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M5.94 0h-.544C9.366.47 13 2.354 13 9.415v85.201a1 1 0 001.314.95l23.872-7.9a1 1 0 01.628 0l23.872 7.9c.647.213 1.314-.249 1.314-.93V12.923C64 3.964 55.788 0 52.747 0H5.94z"
          fill="#5DADC1"
        />
        <Path
          d="M5.94 0h-.544C9.366.47 13 2.354 13 9.415v85.201a1 1 0 001.314.95l23.872-7.9a1 1 0 01.628 0l23.872 7.9c.647.213 1.314-.249 1.314-.93V12.923C64 3.964 55.788 0 52.747 0H5.94z"
          fill="url(#prefix__paint0_linear)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={31}
          y1={23.143}
          x2={0.892}
          y2={80.427}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#5DADC1" />
          <Stop offset={1} stopColor="#4E9DB1" />
        </LinearGradient>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" transform="translate(5)" d="M0 0h59v96H0z" />
        </ClipPath>
      </Defs>
    </Svg>

  )
}
