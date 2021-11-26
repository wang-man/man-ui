import React, { FC } from 'react'
import { ThemeTypes } from '../Icon/icon'
export interface ProgressProps {
  /**是否禁用 Input */
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeTypes;
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props
  return (
    <div className="man-progress-bar" style={styles}>
      <div className="man-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div
          className={`man-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
}
export default Progress;
