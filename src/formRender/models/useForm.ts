import { ref } from 'vue';

const formData = ref();

export const useForm = <T extends any>(initFormData: T) => {
  return {
    formData,
  };
};
