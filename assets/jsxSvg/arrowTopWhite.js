import * as React from "react"
import Svg, { Path } from 'react-native-svg';


export function SvgComponentArrowTop(props) {
  return (
    <Svg
    width={8}
    height={13}
    viewBox="0 0 8 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M4.354.646a.5.5 0 00-.708 0L.464 3.828a.5.5 0 10.708.708L4 1.707l2.828 2.829a.5.5 0 10.708-.708L4.354.646zM4.5 13V1h-1v12h1z"
      fill="#fff"
    />
  </Svg>
  )
}
