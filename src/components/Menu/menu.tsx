import classnames from 'classnames';
import * as React from 'react';
import { useState, createContext } from 'react';
import { MenuItemProps } from './menuItem'
type MenuMode = 'horizontal' | 'vertical';

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: string) => void
}

interface MenuContextProps {
  mode?: string;
  activeIndex: string;
  onSelect?: (selectedIndex: string) => void
}
export const MenuContext = createContext<MenuContextProps>({ activeIndex: '0' });  // 创建的context为一个对象，有一个默认初始index为0 

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, onSelect, children, style } = props;
  const [activeIndex, setActive] = useState(defaultIndex);

  // 定义一个点击事件函数，包裹onSelect，那么就模拟了select事件
  const handleClick = (index: string) => {
    setActive(index);   // 使activeIndex变化，那么activeIndex就变化，那么状态树就变化，对比子组件的index
    if (onSelect) {
      onSelect(index);
    }
  }
  const passedContext: MenuContextProps = {
    activeIndex: activeIndex || '0',      // activeIndex可能为undefined,而index为数字
    onSelect: handleClick,            // 同时传递点击事件函数进入状态树，子组件就可以使用这个函数
    mode
  }

  const classes = classnames('man-menu', className, `man-menu-${mode}`);

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const menuItem = child as React.FunctionComponentElement<MenuItemProps>; // 注意FunctionComponentElement。menuItem就是传入Menu组件的MenuItem
      const { displayName } = menuItem.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(menuItem, {
          index: index.toString()
        })
      } else {
        console.error('仅允许MenuItem组件')
        return null
      }
    })
  }
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>   {/* 将passedContext传入状态树中，子组件就也能共享使用 */}
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal'
}


export default Menu;