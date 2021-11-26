import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../components/Button';
import Transition from '../components/Transition';
import { TransitionProps } from '../components/Transition/transition';

export default {
  title: '通用/Transition',   // 此处的story名称和底部export的如果一致，那么在文档中不会显示子菜单
  component: Transition,
  argTypes: {
    action: { control: null },
    defaultFileList: { control: null },
    beforeUpload: { control: null },
    onProgress: { control: null },
    onSuccess: { control: null },
    onError: { control: null },
    onChange: { control: null },
    onRemove: { control: null },
    headers: { control: null },
    name: { control: null },
    data: { control: null },
    withCredentials: { control: null },
    accept: { control: null },
    multiple: { control: null },
    drag: { control: null },
  },
} as ComponentMeta<typeof Transition>;

const Template: ComponentStory<typeof Transition> = (args: TransitionProps) => {
  const [show, setShow] = useState(true);

  return <div>
    <div className='item-description'>Transition是通过进一步封装react-transition-group来达到组件更易使用</div>
    <div className='item-description'>过渡效果：</div>
    <Button onClick={() => setShow(!show)} btnType='primary'>Toggle</Button>
    <Transition
      in={show}
      timeout={300}
      classNames='zoom-in-top'
    >
      <div>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
      </div>
    </Transition>
  </div>
}

export const transition = Template.bind({});
transition.args = {

};