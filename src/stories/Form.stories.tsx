import { useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from '../components/Icon/icon';
import Form, { FormProps, IformRef } from '../components/Form/form';
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
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value !== getFieldValue('password')) {
            reject('两次密码不一致')
          }
          resolve()
        }, 500);    // 模拟校验过程
      })
    }
  })
]


const Template: ComponentStory<typeof Form> = (args: FormProps) => {
  const ref = useRef<IformRef>(null) // 如果不赋一个null，下面的ref报红
  // 验证form组件实例方法
  const resetAll = () => {
    console.log('form', ref.current)
    ref.current?.resetFields()
  }
  return <div className='form-story'>
    <Form  {...args} ref={ref}>
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
        <Button type='button' onClick={resetAll}>重置</Button>
      </div>
    </Form>
    <h3>renderProps模式：</h3>
    <Form initialValues={{ usename: 'man' }} {...args} ref={ref}>
      {
        ({ isSubmitting, isValid }) => {
          return <>
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
              <Button btnType='danger' type='submit' >提交{isSubmitting && <Icon icon='coffee' />}  {isValid ? '校验成功' : '校验失败'}</Button>
            </div>
          </>
        }
      }
    </Form>
  </div>
}

export const form = Template.bind({});
form.args = {

};