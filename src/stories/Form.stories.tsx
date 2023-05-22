import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Form, { FormProps } from '../components/Form/form';
import Item from '../components/Form/formItem';
import Input from '../components/Input'
import Button from '../components/Button/button'
import { ValidateRule } from '../components/Form/useStore';


export default {
  title: 'Form/Form',   // 此处的story名称和底部export的如果一致，那么在文档中不会显示子菜单
  component: Form,
  argTypes: {

  },
} as ComponentMeta<typeof Form>;

const confirmRules: ValidateRule[] = [
  { type: 'string', required: true, min: 3, max: 8 },
  (getFieldValue) => ({
    asyncValidator(rule, value) {
      if (value !== getFieldValue('password')) {
        return Promise.reject('两次密码不一致')
      }
      return Promise.resolve()
    }
  })
]


const Template: ComponentStory<typeof Form> = (args: FormProps) => {

  return <div className='form-story'>
    <Form initialValues={{ usename: 'man' }} {...args}>
      <Item label='用户名' name='usename' rules={[{ type: 'email', required: true }]} validateTrigger='onChange'>
        <Input />
      </Item>
      <Item label='密码' name='password' rules={[{ type: 'string', required: true, min: 3, max: 8 }]} >
        <Input type='password' />
      </Item>
      <Item label='确认密码' name='confirmPassword' rules={confirmRules}>
        <Input type='password' />
      </Item>
      <Item name='someText' >
        <Input placeholder='no-label' />
      </Item>
      <Item name='agreement' rules={[{ type: 'enum', enum: [true], message: '请先同意此协议' }]} validateTrigger='onChange'>
        <input type='checkbox' />是否同意用户协议 < a href="http://">用户协议</a>
      </Item>
      <div className='agreement-section'>
        <Button btnType='danger' type='submit'>提交</Button>
      </div>
    </Form>
  </div>
}

export const form = Template.bind({});
form.args = {

};