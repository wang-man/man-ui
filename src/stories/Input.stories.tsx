import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input, { InputSize, InputProps } from '../components/Input/input';
import './stories.scss'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    disabled: { control: 'boolean' },
    size: {
      option: ['lg', 'sm'],
      control: { type: 'radio' }
    },
    icon: {
      name: 'icon',

    },
    prepend: {

    },
    append: {

    },
    style: {

    },
  },
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args: InputProps) => {
  return <div className='input-story'>

  </div>
}

// 下列所有export第一个为该组件主体描述部分的值，下面的则展示部分差异性的内容
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {

}