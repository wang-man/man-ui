import React, { FC, ReactNode, createContext } from 'react'
import classNames from 'classnames'
import useStore from './useStore';

export interface FormProps {
  name?: string;
  initialValues?: Record<string, any>;
  className?: string;
  children: ReactNode
}
// 这里也可以直接写成 IFormContext = dispatch ，但使用 ReturnType 从我们自定义的useStore中获取类型更为严谨
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields'> & Pick<FormProps, 'initialValues'>;
export const FormContext = createContext<IFormContext>({} as IFormContext);

const FormItem: FC<FormProps> = (props) => {
  const { name, className, children, initialValues } = props;
  const classes = classNames('man-form', className);
  const { form, fields, dispatch } = useStore();
  const passedContext: IFormContext = {
    dispatch, fields, initialValues
  }
  return (
    <>
      <form className={classes} name={name}>
        <FormContext.Provider value={passedContext}>
          {children}
        </FormContext.Provider>
      </form>
      <div>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(fields)}</pre>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(form)}</pre>
      </div>
    </>
  )
}

FormItem.defaultProps = {
  name: 'man_form'
}

export default FormItem