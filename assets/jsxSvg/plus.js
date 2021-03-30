import * as React from "react"
import Svg, { Path, ClipPath,  Defs, G  } from 'react-native-svg';


export function SvgComponentPlus(props) {
  return (
    <Svg
    width={23}
    height={23}
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#prefix__clip0)" fill="#fff">
      <Path d="M19.5 9.893h-16a1 1 0 000 2h16a1 1 0 000-2z" />
      <Path d="M12.5 18.893v-16a1 1 0 10-2 0v16a1 1 0 102 0z" />
    </G>
    <Defs>
      <ClipPath id="prefix__clip0">
        <Path
          fill="#fff"
          transform="rotate(45 4.672 14.328)"
          d="M0 0h15v15H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>

  )
}
