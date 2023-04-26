import { useReducer, useState } from 'react';
import Schema, { RuleItem, ValidateError } from 'async-validator';

export type CustomRuleFun = (getFieldValue: (key: string) => string) => RuleItem
export type CustomRule = RuleItem | CustomRuleFun

export interface FieldDetail {
  name: string;
  value: string;
  rules: CustomRule[];
  isValid: boolean;
  errors: ValidateError[]
}

export interface FieldsState {
  [key: string]: FieldDetail
}

export interface FormState {
  isValid: boolean
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
  const [form, setForm] = useState<FormState>({ isValid: true })
  const [fields, dispatch] = useReducer(fieldsReducer, {})
  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value
  }
  const transformRules = (rules: CustomRule[]) => {
    return rules.map(rule => {
      if (typeof rule === 'function') {
        const calledRule = rule(getFieldValue)
        return calledRule
      }
      return rule
    })
  }
  const validateField = async (name: string) => {
    const { value, rules } = fields[name]
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
    validator.validate(valueMap).then(() => {
    }).catch(({ errors: errs, fields }) => {
      isValid = false
      errors = errs
    }).finally(() => {
      dispatch({ type: 'updateValidateResult', name, value: { isValid, errors } })
    });
  }
  return {
    fields,
    dispatch,
    form,
    validateField
  }
}

export default useStore