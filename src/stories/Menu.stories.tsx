import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Menu from '../components/Menu';
import { MenuProps } from '../components/Menu/menu';

export default {
  title: '通用/Menu',   // 此处的story名称和底部export的如果一致，那么在文档中不会显示子菜单
  component: Menu,
  argTypes: {
    defaultIndex: { control: null },
    /**class */
    className: { control: null },
    /**菜单模式 */
    mode: { control: null },
    children: { control: null },
    style: { control: null },
    onSelect: { control: null },
  },
} as ComponentMeta<typeof Menu>;


const Template: ComponentStory<typeof Menu> = (args: MenuProps) => {
  const menuSelect = (index: string) => {
    console.log('选择了菜单项: ', index)
  }
  return <div>
    <div className='item-description'>横向：</div>
    <Menu onSelect={menuSelect} mode='horizontal'>
      <Menu.Item>菜单一</Menu.Item>
      <Menu.Item>菜单二</Menu.Item>
      <Menu.SubMenu title='菜单三'>
        <Menu.Item>菜单三-1</Menu.Item>
        <Menu.Item>菜单三-2</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item>菜单四</Menu.Item>
    </Menu>
    <div className='item-description'>纵向：</div>
    <Menu onSelect={menuSelect} mode='vertical' style={{ width: '200px' }} >
      <Menu.Item>菜单一</Menu.Item>
      <Menu.Item>菜单二</Menu.Item>
      <Menu.SubMenu title='菜单三'>
        <Menu.Item>菜单三-1</Menu.Item>
        <Menu.Item>菜单三-2</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item>菜单四</Menu.Item>
    </Menu>
  </div>
}

export const menu = Template.bind({});
menu.args = {

};