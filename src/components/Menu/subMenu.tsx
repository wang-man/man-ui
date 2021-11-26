import React, { useState, useContext, FunctionComponentElement } from 'react'
import classnames from 'classnames';
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem';
import Transtion from '../Transition/transition'
import Icon from '../Icon/icon'
export interface SubMenuProps {
  index?: string;
  title: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props: SubMenuProps) => {
  const { index, title, className, disabled, children } = props;
  const [openFlag, setOpenFlag] = useState(false);
  const context = useContext(MenuContext);
  const classes = classnames('man-menu-item submenu-item', className, {
    'is-active': context.activeIndex.split('_')[0] === index && context.mode === 'horizontal'
  })

  console.log(context)
  console.log(index)

  const handleClick = (e: React.MouseEvent) => {
    setOpenFlag(!openFlag);
  }

  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    setOpenFlag(toggle);
  }

  const mouseHandles = context.mode === 'horizontal' ? { onMouseEnter: (e: React.MouseEvent,) => handleMouse(e, true), onMouseLeave: (e: React.MouseEvent,) => handleMouse(e, false) } : {}

  const clickHandles = context.mode === 'vertical' ? { onClick: handleClick } : {}

  const renderChildren = () => {
    const itemClasses = classnames('man-submenu', {
      'menu-opened': openFlag
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const subItem = child as FunctionComponentElement<MenuItemProps>;
      if (subItem.type.displayName === 'MenuItem') {
        return React.cloneElement(subItem, {
          index: `${index}_${i.toString()}`
        })
      } else {
        console.error('仅允许MenuItem组件')
        return null
      }
    })
    return (
      <Transtion
        in={openFlag}
        timeout={100}
        classNames='zoom-in-top'
      >
        <ul className={itemClasses} >
          {childrenComponent}
        </ul>
      </Transtion>
    )
  }

  const titleClasses = classnames('submenu-title', {
    'is-vertical': context.mode === 'vertical',
    'is-opened': openFlag
  })
  return (
    <li className={classes} {...mouseHandles}>
      <div className={titleClasses} {...clickHandles}>
        <span className='submenu-title-content'>
          {title}
        </span>
        <Icon icon='chevron-down' className='chevron-icon' />
      </div>
      {renderChildren()}
    </li>
  )
}
SubMenu.displayName = 'SubMenu';
export default SubMenu