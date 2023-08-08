import { Button } from '@arco-design/web-vue';
import { Schema } from '../../../formRender/type';
import { IconAlignLeft } from '@arco-design/web-vue/es/icon';

const schema: Schema = {
  type: 'object',
  displayType: 'vertical',
  properties: {
    obj: {
      type: 'object',
      widget: 'card',
      title: '卡片主题',
      description: '这是一个对象类型',
      column: 2,
      labelCol: 4,
      fieldCol: 20,
      props: {
        // size: 'small',
        hoverable: false,
        headerStyle: { backgroundColor: '#f0f0f0' },
        slots: {
          title: () => {
            return (
              <div>
                <IconAlignLeft />
                21321
              </div>
            );
          },
        },
      },
      properties: {
        input1: {
          titleExtraWidget: () => <Button type="primary"> 12321</Button>,
          title: '输入框 A',
          type: 'string',
        },
        input2: {
          title: '输入框 B',
          type: 'string',
        },
        input3: {
          title: '输入框 C',
          type: 'string',
        },
        input4: {
          title: '输入框 D',
          type: 'string',
        },
      },
    },
  },
};
export default schema;
