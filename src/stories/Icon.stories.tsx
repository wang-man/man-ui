import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from '../components/Icon';
import { IconProps } from '../components/Icon/icon';

export default {
  title: '通用/Icon',   // 此处的story名称和底部export的如果一致，那么在文档中不会显示子菜单
  component: Icon,
  argTypes: {
    defaultIndex: { control: null },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args: IconProps) => {
  return <div>
    <div className='item-description'>Icon是通过进一步封装fortawesome来达到更易使用，详见其官网：<a href='https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react' target='_blank'>https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react</a></div>
    <div className='item-description'>不同主题色：</div>
    <Icon icon='coffee' />
    <Icon theme='danger' icon='coffee' />
    <Icon theme='dark' icon='coffee' />
    <Icon theme='info' icon='coffee' />
    <Icon theme='light' icon='coffee' />
    <Icon theme='primary' icon='coffee' />
    <Icon theme='secondary' icon='coffee' />
    <Icon theme='success' icon='coffee' />
    <Icon theme='warning' icon='coffee' />
  </div>
}

export const icon = Template.bind({});
icon.args = {

};