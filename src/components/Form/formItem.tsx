import React, { FC, ReactNode, useEffect, useContext } from 'react'
import classNames from 'classnames'
import { FormContext } from './form';

export interface FormItemProps {
  name: string;
  label?: string;
  className?: string;
  children: ReactNode
}


const FormItem: FC<FormItemProps> = (props) => {
  const { label, className, children, name } = props;
  const classes = classNames('man-form-item', className, { 'man-form-item-no-label': !label });

  const { dispatch, fields, initialValues } = useContext(FormContext)
  useEffect(() => {
    const value = (initialValues && initialValues[name]) || '';
    console.log(value)
    dispatch({ type: 'addField', name, value: { label, name, value } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 获取store对应的value
  const fieldState = fields[name]
  const value = (fieldState && fieldState.value) || ''
  let valueProp = 'value', trigger = 'onChange';

  // 1. 获取children数组第一个元素（第一个元素视为输入元素）
  const childList = React.Children.toArray(children)
  const child = childList[0] as React.ReactElement
  console.log('name---------------', name)
  console.log('value', value)
  console.log('child', child)
  // todo:判断child的类型，显示警告
  if (childList.length === 0) {
    console.error('Item中缺少子节点')
    return null
  }
  if (childList.length > 1) {
    console.warn('Item中不能多余一个子节点')
  }
  if (!React.isValidElement(childList[0])) {
    console.error('Item中不是一个合法的React节点')
    return null
  }
  // 适应不同的事件以及 value 属性名称
  if (child.type === "input" && child.props.type === 'checkbox') {
    valueProp = 'checked'
  }

  const onValueUpdate = (e: any) => {
    let value = e.target.value
    // 适应不同的事件以及value 属性名称
    if (e.target.nodeName === "INPUT" && e.target.type === 'checkbox') {
      value = e.target.checked
    }
    dispatch({ type: 'updateValue', name, value })
  }
  // 以下是表单数据受控处理关键-------------------
  // 2. 手动创建一个属性列表，需要value以及onChange属性。如此实现表单输入实时显示
  const controlProps: Record<string, any> = {}
  controlProps[valueProp] = value      // value属性受控
  controlProps[trigger] = onValueUpdate
  console.log('valueProp', valueProp)

  // 3.cloneElement 混合这个child以及手动的属性列表
  const returnChildNode = React.cloneElement(
    child,
    { ...child.props, ...controlProps }
  )

  return (
    <div className={classes}>
      {
        label && <div className='man-form-item-label'>
          {label}
        </div>
      }
      <div className='man-form-item-content'>
        {returnChildNode}
      </div>

    </div>
  )
}


export default FormItem