import * as React from 'react';
import classnames from 'classnames';
import { useContext } from 'react';
import { MenuContext } from './menu'
export interface MenuItemProps {
  index?: string;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, className, disabled, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classnames('man-menu-item', className, { 'is-disable': disabled, 'is-active': context.activeIndex === index });

  const itemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index);
    }
  }

  return (
    <li className={classes} style={style} onClick={itemClick}>
      {children}
    </li >
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem;
