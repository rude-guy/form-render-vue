import { Schema } from '../../../formRender/type';

const schema: Schema = {
  type: 'object',
  displayType: 'horizontal',
  properties: {
    input1: {
      title: '正则表达式',
      type: 'string',
      required: true,
      rules: [{ match: /^[\u4E00-\u9FA5]+$/, message: '请输入中文！' }],
    },
    input2: {
      title: '自定义校验',
      type: 'string',
      rules: [
        {
          validator: (value) => {
            const pattern = '^[\u4E00-\u9FA5]+$';
            const result = new RegExp(pattern).test(value);
            return result;
            // 或者是返回一个对象，用于动态设置 message 内容。
            // TODO:目前message的优先级高于return的message。暂定
            // return {
            //   status: result,
            //   message: '请输入中文！',
            // };
          },
          message: '请输入中文！',
        },
      ],
    },
  },
};

export default schema;
