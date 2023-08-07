import { PropType, defineComponent } from 'vue';
import Field from './field/field.vue';
import { SchemaBase } from '../type';

{
  /* <template>
  <template
    v-if="schema.properties"
    v-for="(item, value) of Object.entries(schema.properties)"
  >
    <Field
      :parent="schema"
      :field="item[0]"
      :column="schema.column"
      :schema="item[1]"
      :displayType="schema.displayType"
    />
  </template>
</template>
<script setup lang="ts">
import { SchemaBase } from '../type';
import Field from './field/field.vue';
interface RenderCoreProps {
  schema: SchemaBase;
}

defineOptions({
  name: 'renderCore',
  inheritAttrs: false,
});

const props = defineProps<RenderCoreProps>();
</script>
<style scoped lang="scss"></style> */
}

export default defineComponent({
  name: 'renderCore',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<SchemaBase>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { schema } = props;
      return (
        <>
          {schema.properties &&
            Object.entries(schema.properties).map((item) => {
              return (
                <Field
                  parent={schema}
                  field={item[0]}
                  column={schema.column}
                  schema={item[1]}
                  displayType={schema.displayType}
                />
              );
            })}
        </>
      );
    };
  },
});
