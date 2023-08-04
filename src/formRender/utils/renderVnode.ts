import { defineComponent } from 'vue';

const RenderVnode = defineComponent({
  props: {
    vnode: {
      type: [Object, String],
      required: true,
    },
  },
  render() {
    return this.vnode;
  },
});

export default RenderVnode;
