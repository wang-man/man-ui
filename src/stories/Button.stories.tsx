import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button, { CombineButtonProps } from '../components/Button/button';
import './stories.scss'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: '通用/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
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
      control: {
        type: null
      }
    },
    backgroundColor: {
      name: 'backgroundColor',
      type: { name: 'string', required: false },
      description: '背景颜色',
      table: {
        type: {
          summary: 'string'
        },
        // defaultValue: { summary: 'default' },
      },
      control: 'color'
    },
    disabled: {
      // defaultValue: false,
      description: '是否禁用状态',
      control: 'boolean',
      table: {
        type: { summary: 'bool' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      options: ['lg', 'sm'],
      control: { type: 'radio' }
    },
    href: {
      name: 'href',
      type: { name: 'string' },
      description: 'demo description',
      table: {
        type: { summary: 'string' },
      },
      control: {
        type: null
      }
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

// 下列所有export第一个为该组件主体描述部分的值，下面的则展示部分差异性的内容
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  btnType: '',
  className: '',
  size: '',
  disabled: false,
  href: ''
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
