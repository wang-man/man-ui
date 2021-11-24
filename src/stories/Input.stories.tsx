import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import Input, { InputSize, InputProps } from '../components/Input/input';
import './stories.scss'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // 本组件这块的说明在组件中已经定义，所以这里可以为空
  argTypes: {
    disabled: { control: null },
    size: { control: null },
    icon: { control: null },
    prepend: { control: null },
    append: { control: null },
    style: { control: null },
  },
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args: InputProps) => {
  return <div className='input-story'>
    <div className='item-description'>最基本：</div>
    <Input placeholder='请输入' />
    <div className='item-description'>前缀/后缀/标签：</div>
    <Input prepend='姓名' />
    <Input append='.com' />
    <Input icon='coffee' placeholder='我是带图标的输入框' />
    <div className='item-description'>三种大小：</div>
    <Input size='lg' placeholder='大尺寸' />
    <Input placeholder='默认大小' />
    <Input size='sm' placeholder='小尺寸' />
    <div className='item-description'>禁用状态：</div>
    <Input disabled={true} />
  </div >
}

// 下列所有export第一个为该组件主体描述部分的值，下面的则展示部分差异性的内容
export const input = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
input.args = {

}