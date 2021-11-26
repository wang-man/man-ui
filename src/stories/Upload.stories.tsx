import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../components/Button';
import Upload from '../components/Upload';
import { UploadProps } from '../components/Upload/upload';

export default {
  title: '通用/Upload',   // 此处的story名称和底部export的如果一致，那么在文档中不会显示子菜单
  component: Upload,
  argTypes: {
    action: { control: null },
    defaultFileList: { control: null },
    beforeUpload: { control: null },
    onProgress: { control: null },
    onSuccess: { control: null },
    onError: { control: null },
    onChange: { control: null },
    onRemove: { control: null },
    headers: { control: null },
    name: { control: null },
    data: { control: null },
    withCredentials: { control: null },
    accept: { control: null },
    multiple: { control: null },
    drag: { control: null },
  },
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = (args: UploadProps) => {
  const fileUploadProps = {
    action: 'https://develop.porsche-preview.cn/pdc-api-gateway/smamo-rental-service/web/v1/vehicles/image/upload',
    headers: {
      Authorization: 'Bearer ea11afd8-a066-41f4-8fdd-da9ebceaaee3'
    },
  }
  const dragUploadProps = {
    action: 'https://develop.porsche-preview.cn/pdc-api-gateway/smamo-rental-service/web/v1/vehicles/image/upload',
    headers: {
      Authorization: 'Bearer ea11afd8-a066-41f4-8fdd-da9ebceaaee3'
    },
    drag: true
  }
  return <div>
    <div className='item-description'>文件上传：</div>
    <Upload {...fileUploadProps}><Button btnType='primary'>点我上传</Button></Upload>
    <div className='item-description'>拖拽上传：</div>
    <Upload {...dragUploadProps}>Click or drag file to this area to upload</Upload>
  </div>
}

export const upload = Template.bind({});
upload.args = {

};