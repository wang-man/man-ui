import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Form, { FormProps } from '../components/Form/form';
import Item from '../components/Form/formItem';
import Input from '../components/Input'
import Button from '../components/Button/button'

export default {
  title: 'Form/Form',   // 此处的story名称和底部export的如果一致，那么在文档中不会显示子菜单
  component: Form,
  argTypes: {

  },
} as ComponentMeta<typeof Form>;


const Template: ComponentStory<typeof Form> = (args: FormProps) => {

  return <div className='form-story' style={{ width: '30em' }}>
    <Form initialValues={{ usename: 'man', agreement: true }}>
      <Item label='用户名' name='usename'>
        <Input />
      </Item>
      <Item label='密码' name='password'>
        <Input type='password' />
      </Item>
      <Item name='someText' >
        <Input placeholder='no-label' />
      </Item>
      <div className='agreement-section' >
        <Item name='agreement'>
          <input type="checkbox" />
        </Item>
        <span>是否同意用户协议<a href="http://">用户协议</a></span>
      </div>
      <div className='agreement-section'>
        <Button btnType='danger'>提交</Button>
      </div>
    </Form>
  </div>
}

export const form = Template.bind({});
form.args = {

};