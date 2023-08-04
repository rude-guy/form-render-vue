<template>
  <ArcoInput
    v-model="model"
    size="large"
    placeholder="please enter your username..."
  />
</template>
<script setup lang="ts">
import { Input as ArcoInput } from '@arco-design/web-vue';
import { useFormRender } from '../../models/useFormRender';
import { computed } from 'vue';
import { Schema } from '../../type';

const props = defineProps<{
  path: string;
  schema: Schema;
}>();

console.log(props);

const { formData, getValueByStringPath, setValueByStringPath } =
  useFormRender();

const model = computed({
  get: () => getValueByStringPath<string>(formData.value, props.path),
  set: (newValue) => {
    // 这里可以在需要时更新 form 对象中的值
    setValueByStringPath(formData.value, props.path, newValue);
  },
});
</script>
<style scoped lang="scss"></style>
