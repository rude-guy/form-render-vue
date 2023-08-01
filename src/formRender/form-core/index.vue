<!-- import { PropType, defineComponent, toRefs } from 'vue';
import { Form, Row } from '@arco-design/web-vue';
import { useForm } from '../models/useForm';
import { Schema } from '../type';
import RenderCore from '../render-core/index';
import { pick } from 'lodash';
import { provideFormRender } from '../models/useFormRender';

export default defineComponent({
  name: 'form-render-core',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    displayType: {
      type: String as PropType<'row' | 'column'>,
      requered: false,
      default: 'row',
    },
    widgets: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
    initFormData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { displayType } = toRefs(props);
    const { formData } = useForm(props.initFormData);

    provideFormRender({
      ...pick(props, ['schema', 'widgets']),
    });

    return () => {
      return (
        <Form model={formData}>
          <Row gutter={displayType.value === 'row' ? 16 : 24}>
            <RenderCore schema={props.schema} />
          </Row>
        </Form>
      );
    };
  },
}); -->

<template>
  <Form :model="formData">
    <RenderCore :schema="props.schema" :widgets="props.widgets" />
  </Form>
</template>
<script setup lang="ts">
import { Form } from '@arco-design/web-vue';
import { Schema } from '../type';
import RenderCore from '../render-core/index.vue';
import { ref } from 'vue';
interface FormCoreProps {
  schema: Schema;
  widgets: Record<string, any>;
}

const props = defineProps<FormCoreProps>();

const formData = ref();
</script>
<style scoped lang="scss"></style>
