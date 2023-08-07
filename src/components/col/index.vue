<script setup lang="tsx">
import FormRender from '../../formRender/index.vue';
import schema from './config';
</script>

<template>
  <FormRender :schema="schema" :form-props="{}" />
</template>
