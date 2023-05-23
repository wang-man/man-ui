import React, { FC, ReactNode, createContext } from 'react'
import classNames from 'classnames'
import { ValidateError } from 'async-validator';
import useStore, { FormState } from './useStore';

type RenderProps = (form: FormState) => ReactNode

export interface FormProps {
  name?: string;
  initialValues?: Record<string, any>;
  className?: string;
  children: ReactNode | RenderProps
  onFinish?: (values: Record<string, any>) => void
  onFinishFaild?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void
}
// 这里也可以直接写成 IFormContext: dispatch ，但使用 ReturnType 从我们自定义的useStore中获取类型更为严谨
// ReturnType用于从一个函数中获取它返回值的类型
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>;
export const FormContext = createContext<IFormContext>({} as IFormContext);

const Form: FC<FormProps> = (props) => {
  const { name, className, children, initialValues, onFinish, onFinishFaild } = props;
  const classes = classNames('man-form', className);
  const { form, fields, dispatch, validateField, validateAllFields } = useStore();
  const context: IFormContext = {
    dispatch, fields, initialValues, validateField
  }
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    validateAllFields().then((result) => {
      console.log(result)
      const { isValid, values, errors } = result;
      if (isValid && onFinish) {
        onFinish(values)
      } else if (!isValid && onFinishFaild) {
        onFinishFaild(values, errors)
      }
    })
  }

  // renderProps是react官网推荐的一个设计模式，通常是一个函数属性，函数中可以灵活的传入各种组件/节点，函数参数又可用于节点中。整体类似vue中插槽的功能，非常值得学习。
  let chidldrenNode: ReactNode = null
  if (typeof children === 'function') {
    chidldrenNode = children(form)
  } else {
    chidldrenNode = children
  }
  return (
    <>
      <form className={classes} name={name} onSubmit={submitForm}>
        <FormContext.Provider value={context}>
          {chidldrenNode}
        </FormContext.Provider>
      </form>
      {/* <div>
        <code style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(fields)}</code>
      </div>
      <div>
        <code style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(form)}</code>
      </div> */}
    </>
  )
}

Form.defaultProps = {
  name: 'man_form',

}

export default Form