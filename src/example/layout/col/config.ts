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
      labelCol: 7,
      fieldCol: 10,
      title: 'Field A',
      type: 'string',
    },
    input2: {
      title: 'Field B',
      type: 'string',
    },
    input3: {
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
