import { defineComponent } from 'vue';
import { Input } from '@arco-design/web-vue';

export default defineComponent({
  name: 'Input',
  props: {
    schema: Object,
    formData: Object,
    onChange: Function,
    path: String,
    hidden: Boolean,
    props: Object,
  },
  setup(props) {
    console.log(props);
    return () => {
      return <Input />;
    };
  },
});
