// import React from 'react'
import * as React from 'react';
import classnames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
  Href = 'href'
}

interface BaseButtonProps {
  className?: string,
  disabled?: boolean,
  size?: ButtonSize,
  btnType?: ButtonType,
  children: React.ReactNode,
  href?: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = props =>{
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...resetProps     // 取出其他props
  } = props

  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled   // 为a标签的时候才给设置这个class，因为本身button标签有disabled这个属性
  })

  if (btnType === ButtonType.Link) {
    return (
      <a href={href} className={classes} {...resetProps}>{children}</a>
    )
  }else{
    return (
      <button disabled={disabled} className={classes} {...resetProps}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default     // 默认为default类型
}

export default Button