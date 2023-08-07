<script setup lang="tsx">
import FormRender from '../../../formRender/index.vue';
import schema from './config';
</script>

<template>
  <FormRender
    :schema="schema"
    :form-props="{
      labelWidth: 100,
      maxWidth: 150,
    }"
  />
</template>
