import { ref } from 'vue';
import { Schema } from '../../formRender/type';

const schema = ref<Schema>({
  type: 'object',
  column: 2,
  displayType: 'horizontal',
  labelCol: 5,
  fieldCol: 19,
  properties: {
    input1: {
      span: 8,
      title: 'Field A',
      type: 'string',
    },
    input2: {
      span: 9,
      title: 'Field B',
      type: 'string',
    },
    input3: {
      span: 7,
      labelCol: 10,
      fieldCol: 14,
      title: 'Field C',
      type: 'string',
    },
    input4: {
      title: 'Field D',
      type: 'string',
    },
  },
});

export default schema;
