import { ref } from 'vue';
import { Schema } from '../../formRender/type';

const schema = ref<Schema>({
  type: 'object',
  column: 2,
  displayType: 'horizontal',
  properties: {
    input1: {
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
