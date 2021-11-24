import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button, { CombineButtonProps } from '../components/Button/button';
import './stories.scss'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: '通用/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // 下面的配置并不必须，如果此组件在其props的types中自己做过注释也在这里生效（如果是联合类型却不会生效）
  argTypes: {
    btnType: {
      name: 'btnType',
      type: { name: 'string', required: false },
      description: '按钮类型',
      // defaultValue: 'default',
      table: {
        type: {
          summary: 'primary | default | danger | link'
        },
        defaultValue: { summary: 'default' },
      },
      control: null
    },
    backgroundColor: {
      name: 'backgroundColor',
      type: { name: 'string', required: false },
      description: '背景颜色',
      table: {
        type: {
          summary: 'string'
        },
      },
      control: null,

    },
    disabled: {
      description: '是否禁用状态',
      control: null,
      table: {
        type: { summary: 'bool' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      options: ['lg', 'sm'],
      description: '尺寸大小',
      table: {
        type: { summary: 'lg | sm' },
      },
      control: { type: null }
    },
    href: {
      name: 'href',
      type: { name: 'string' },
      description: '链接按钮的链接地址',
      table: {
        type: { summary: 'string' },
      },
      control: null
    },
    className: {
      name: 'className',
      type: { name: 'string' },
      description: '按钮class',
      table: {
        type: { summary: 'string' },
      },
      control: null
    }
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args: CombineButtonProps) => {
  return <div className='button-story'>
    <Button {...args} btnType='default'>default</Button>
    <Button {...args} btnType='primary'>primary</Button>
    <Button {...args} btnType='danger'>danger</Button>
    <Button {...args} btnType='link' href='https://storybook.js.org/'>link</Button>
  </div>
}

// 下列所有export中第一个为该组件storybook主体展示的内容，后面的则分别展示剩下的内容
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg'
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm'
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
};
