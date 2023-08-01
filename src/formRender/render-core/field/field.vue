<template>
  <component :is="component" v-bind="root.props"></component>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { Schema } from '../../type';
import { getWidgetName, getWidget } from '../../models/mapping';
import { useFormRender } from '../../models/useFormRender';

interface FieldItemProps {
  root: Schema;
}
const props = defineProps<FieldItemProps>();
const { root } = toRefs(props);

const { widgets } = useFormRender();

const component = computed(() => {
  const name = getWidgetName(root.value);
  return getWidget(name, widgets.value);
});
</script>
<style scoped lang="scss"></style>
