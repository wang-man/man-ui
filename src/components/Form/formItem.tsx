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

  const { dispatch, fields } = useContext(FormContext)
  useEffect(() => {
    dispatch({ type: 'addField', name, value: { label, name } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 获取store对应的value
  const fieldState = fields[name]
  const value = fieldState && fieldState.value
  const onValueUpdate = (e: any) => {
    const value = e.target.value
    console.log('new value', value)
    dispatch({ type: 'updateValue', name, value })
  }
  // 1. 手动创建一个属性列表，需要value以及onChange属性
  const controlProps: Record<string, any> = {}
  controlProps.value = value
  controlProps.onChange = onValueUpdate
  // todo:适应不同的事件以及value 属性名称
  // 2. 获取children数组第一个元素（第一个元素视为输入元素）
  const childList = React.Children.toArray(children)
  // todo:判断child的类型，显示警告
  const child = childList[0] as React.ReactElement
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