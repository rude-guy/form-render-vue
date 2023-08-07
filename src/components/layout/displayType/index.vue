<script setup lang="tsx">
import FormRender from '../../formRender/index.vue';
import schema from './config';
</script>

<template>
  <h2>displayType: {{ schema.displayType }}</h2>
  <FormRender :schema="schema" />
</template>
