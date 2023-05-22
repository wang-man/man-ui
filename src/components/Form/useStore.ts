import { useReducer, useState } from 'react';
import Schema, { RuleItem, ValidateError } from 'async-validator';
import { mapValues, forEach } from 'lodash-es'

export type CustomRuleFun = (getFieldValue: (key: string) => string) => RuleItem
export type ValidateRule = RuleItem | CustomRuleFun

export interface FieldDetail {
  name: string;
  value: string;
  rules: ValidateRule[];
  isValid: boolean;
  errors: ValidateError[]
}

export interface FieldsState {
  [key: string]: FieldDetail
}

export interface FormState {
  isValid: boolean,
  isSubmitting: boolean,
  errors: Record<string, ValidateError[]>
}


export interface FieldsAction {
  type: 'addField' | 'updateValue' | 'updateValidateResult';
  name: string;
  value: any;
}

function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: { ...action.value }
      }
    case 'updateValue':
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value }
      }
    case 'updateValidateResult':
      const { isValid, errors } = action.value;
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors }
      }
    default:
      return state
  }
}

function useStore() {
  const [form, setForm] = useState<FormState>({ isValid: true, isSubmitting: false, errors: {} })
  const [fields, dispatch] = useReducer(fieldsReducer, {})
  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value
  }
  const transformRules = (rules: ValidateRule[]) => {
    return rules.map(rule => {
      if (typeof rule === 'function') {
        const calledRule = rule(getFieldValue)
        return calledRule
      }
      return rule
    })
  }
  const validateField = (value: any, name: string) => {
    const { rules } = fields[name]
    const afterRules = transformRules(rules)
    const descriptor = {
      [name]: afterRules
    }
    const valueMap = {
      [name]: value
    }
    const validator = new Schema(descriptor)

    let isValid = true;
    let errors: ValidateError[] = []
    validator.validate(valueMap).then((fields) => {
      dispatch({ type: 'updateValidateResult', name, value: { isValid, errors } })
    }).catch(({ errors: errs }) => {
      console.log(errs)
      isValid = false
      errors = errs
      dispatch({ type: 'updateValidateResult', name, value: { isValid, errors } })
    })
  }

  const validateAllFields = () => {
    let isValid = true
    let errors: Record<string, ValidateError[]>
    // 从field中取出表单域名和value的映射关系： {"username":{"label":"用户名","name":"usename","value":"man","rules":[{"type":"email","required":true}]} 提出 {username: "man"}
    const valueMap = mapValues(fields, item => item.value)
    const descriptor = mapValues(fields, item => transformRules(item.rules))
    const validator = new Schema(descriptor)
    setForm({ ...form, isSubmitting: true })

    return validator.validate(valueMap).then((fields) => {
      console.log('fields', fields)
      isValid = true
      forEach(fields, (value, name) => {
        dispatch({ type: 'updateValidateResult', name, value: { isValid: true, errors: null } })
      })
      return {
        isValid,
        values: fields,
        errors
      }
    }).catch(({ errors: errs, fields }) => {
      isValid = false
      errors = errs
      console.log(errors)
      console.log(fields)
      // errors是检验错误信息数组形式。fields中其实也是检验错误信息，只不过是key/value形式。
      forEach(fields, (value, name) => {
        dispatch({ type: 'updateValidateResult', name, value: { isValid: false, errors: value } })
      })
      return {
        isValid,
        errors,
        values: valueMap
      }
    }).finally(() => {
      setForm({ ...form, isSubmitting: false, isValid, errors })
    });
  }

  return {
    fields,
    dispatch,
    form,
    validateField,
    validateAllFields
  }
}

export default useStore