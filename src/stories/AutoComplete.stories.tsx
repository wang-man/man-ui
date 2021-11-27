import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import AutoComplete, { DataSourceObject } from '../components/AutoComplete/autoComplete';
library.add(fas);

export default {
  title: 'Form/Autocomplete',   // 此处的story名称和底部export的如果一致，那么在文档中不会显示子菜单
  component: AutoComplete,
  argTypes: {
    fetchSuggestions: {
      name: 'fetchSuggestions',
      type: { required: true },
      description: '数组或promise函数',
      // defaultValue: 'default',
      table: {
        type: {
          summary: '(str: string) => DataSourceObject[] | Promise<DataSourceObject[]>'
        },
        // defaultValue: { summary: 'default' },
      },
      control: null
    },
    onSelect: {
      name: 'onSelect',
      type: { required: false },
      description: '被选中时调用，参数为选中项的对象',
      // defaultValue: 'default',
      table: {
        type: {
          summary: '(item: DataSourceObject) => void'
        },
        // defaultValue: { summary: 'default' },
      },
      control: null
    },
    renderOption: {
      name: 'renderOption',
      type: { required: false },
      description: '默认展示数据的dom结构',
      // defaultValue: 'default',
      table: {
        type: {
          summary: ' (item: DataSourceObject, index: number) => ReactElement'
        },
        // defaultValue: { summary: 'default' },
      },
      control: null
    },
    value: {
      name: 'value',
      type: { required: false },
      description: '默认输入的值',
      // defaultValue: 'default',
      table: {
        type: {
          summary: ' string'
        },
        // defaultValue: { summary: 'default' },
      },
      control: null
    },
    disabled: {
      name: 'disabled',
      type: { required: false },
      description: '是否禁用',
      // defaultValue: 'default',
      table: {
        type: {
          summary: 'boolean'
        },
        defaultValue: { summary: false },
      },
      control: { type: null }
    },
    restProps: {
      name: 'restProps',
      type: { required: false },
      description: '其他input属性',
      // defaultValue: 'default',
      table: {
        type: {
          summary: 'InputProps'
        },
        // defaultValue: { summary: 'default' },
      },
      control: null
    },
  },
} as ComponentMeta<typeof AutoComplete>;


const data = ['abc1', 'abc2', 'abc3', 'abc4']

const Template: ComponentStory<typeof AutoComplete> = (args) => {
  const fetchSuggestionsFun1 = (str: string) => {
    return data.filter(item => item.includes(str)).map(value => ({ value, label: value }));
  }
  const fetchSuggestionsFun2 = async (str: string) => {
    const result = await fetch(`https://api.github.com/search/users?q=${str}`).then(res => {
      return res.json();
    }).then(data => {
      return data.items;
    })
    return result.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
  }

  const renderOption1 = (item: DataSourceObject, index: number) => {
    return <div>
      <div>value：{item.value}</div>
      <div>label：{item.label}</div>
    </div>
  }
  const renderOption2 = (item: DataSourceObject, index: number) => {
    return <div>
      <div>用户：{item.value}</div>
      <div>头像：<img src={item.avatar_url} width='20px' alt="" /></div>
    </div>
  }

  const selectHandle = (selected: DataSourceObject) => {
    console.log(selected)
  }

  return <>
    <div className='item-description'>静态数据：</div>
    <AutoComplete fetchSuggestions={fetchSuggestionsFun1} renderOption={renderOption1} placeholder='请输入' onSelect={selectHandle} />
    <div className='item-description'>禁用：</div>
    <AutoComplete fetchSuggestions={fetchSuggestionsFun2} disabled={true} placeholder='请输入' onSelect={selectHandle} />
    <div className='item-description'>接口异步数据：</div>
    <AutoComplete fetchSuggestions={fetchSuggestionsFun2} renderOption={renderOption2} placeholder='请输入' />
  </>
}

export const autocomplete = Template.bind({});
autocomplete.args = {
  // disabled: false
};