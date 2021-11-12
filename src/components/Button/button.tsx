import React from 'react';
import classnames from 'classnames'

export type ButtonSize = 'lg' | 'sm'

export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
interface BaseButtonProps {
  className?: string,
  disabled?: boolean,
  size?: ButtonSize,
  btnType?: ButtonType,
  children: React.ReactNode,
  href?: string
}

type ButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>  // 与button元素原生属性组合
type AnchorProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>  // 与a元素原生属性组合
export type CombineButtonProps = Partial<ButtonProps & AnchorProps>      // 类型别名，交叉类型

const Button: React.FC<CombineButtonProps> = props => {
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
    'disabled': (btnType === 'link') && disabled   // 为a标签的时候才给设置这个class，因为本身button标签有disabled这个属性
  })

  if (btnType === 'link') {
    return (
      <a href={href} className={classes} {...resetProps}>{children}</a>
    )
  } else {
    return (
      <button disabled={disabled} className={classes} {...resetProps}>{children}</button>
    )
  }
}

// 默认属性
Button.defaultProps = {
  disabled: false,
  btnType: 'default'     // 默认为default类型
}

export default Button