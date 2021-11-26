import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Progress, { ProgressProps } from '../components/Progress/progress';

export default {
  title: '通用/Progress',   // 此处的story名称和底部export的如果一致，那么在文档中不会显示子菜单
  component: Progress,
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
} as ComponentMeta<typeof Progress>;


const Template: ComponentStory<typeof Progress> = (args: ProgressProps) => {

  return <div>
    <div className='item-description'>标准：</div>
    <Progress percent={10} />
    <Progress percent={100} />
    <div className='item-description'>高度为10：</div>
    <Progress percent={50} strokeHeight={10} />
    <div className='item-description'>不同背景色：</div>
    <Progress percent={50} theme='secondary' />
    <Progress percent={50} theme='success' />
    <Progress percent={50} theme='info' />
    <Progress percent={50} theme='warning' />
    <Progress percent={50} theme='danger' />
    <Progress percent={50} theme='dark' />
  </div>
}

export const progress = Template.bind({});
progress.args = {

};