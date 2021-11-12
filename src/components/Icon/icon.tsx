import React from "react";
import classnames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export type ThemeTypes = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeTypes
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classnames('man-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
}

export default Icon