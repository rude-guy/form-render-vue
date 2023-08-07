import { Schema } from '../../../formRender/type';

const schema: Schema = {
  type: 'object',
  displayType: 'horizontal',
  properties: {
    input1: {
      title: '必填',
      type: 'string',
      required: true,
    },
    input2: {
      title: '数字最大值',
      type: 'number',
      max: 2,
      required: true,
    },
    input3: {
      title: '数字最小值',
      type: 'number',
      min: 10,
      required: true,
    },
    input4: {
      title: '字符最大长度',
      type: 'string',
      max: 2,
      required: true,
    },
    input5: {
      title: '字符最小长度',
      type: 'string',
      min: 10,
      required: true,
    },
    input6: {
      title: 'url 校验',
      type: 'string',
      required: true,
      format: 'url',
    },
    input7: {
      title: 'email 校验',
      type: 'string',
      required: true,
      format: 'email',
    },
    input8: {
      title: '图片格式校验',
      type: 'string',
      required: true,
      format: 'image',
    },
  },
};

export default schema;
