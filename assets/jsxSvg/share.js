import * as React from "react"
import Svg, { Path} from 'react-native-svg';


export function SvgComponentShare(props) {
  return (
    <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M2 11.334v2c0 .736.597 1.333 1.333 1.333h9.334c.736 0 1.333-.597 1.333-1.333v-2M10.667 4L8 1.333 5.333 4M8 1.333v9.334"
      stroke="#51A0B3"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>

  )
}
