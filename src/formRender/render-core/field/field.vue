<template>
  <component :is="component" v-bind="root.props"></component>
</template>
<script setup lang="ts">
import { computed, toRefs, watch, watchEffect } from 'vue';
import { Schema } from '../../type';
import { capitalizeFirstLetter } from '../../utils';
import { mapping } from '../../models/mapping';

interface FieldItemProps {
  widgets: Record<string, any>;
  root: Schema;
}
const props = defineProps<FieldItemProps>();
const { root, widgets } = toRefs(props);

const componentName = computed(() => {
  const { type, widget } = root.value;
  if (widget) {
    return capitalizeFirstLetter(widget);
  }
  return mapping[type || 'default'];
});

const component = computed(() => {
  return widgets.value[componentName.value];
});

watchEffect(() => {
  console.log(component.value, widgets.value, root);
});
</script>
<style scoped lang="scss"></style>
