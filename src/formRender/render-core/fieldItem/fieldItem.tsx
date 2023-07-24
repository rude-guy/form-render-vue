import { defineComponent } from 'vue';

export default defineComponent({
  name: 'field-item',
  setup(props) {
    return () => {
      return (
        <div>
          <slot></slot>
        </div>
      );
    };
  },
});
