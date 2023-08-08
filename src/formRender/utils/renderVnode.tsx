import { PropType, defineComponent } from 'vue';
import { useGlobalConfig } from '../models/useGlobalConfig';
import { getWidget } from '../models/mapping';
import { Schema, TRenderSlotType } from '../type';
import { capitalizeFirstLetter, isFn } from './tool';

const getSlot = (slot: any, schema: Schema, widgets: Record<string, any>) => {
  let retSlot = slot;
  if (isFn(retSlot)) {
    retSlot = retSlot(schema);
  }
  if (retSlot?.widget) {
    const widgetName = capitalizeFirstLetter(retSlot.widget);
    const Widget = getWidget(widgetName, widgets);
    retSlot = <Widget {...retSlot?.props}></Widget>;
  }
  return retSlot;
};

const RenderVnode = defineComponent({
  props: {
    slot: {
      type: [Function, Object] as PropType<TRenderSlotType>,
      required: true,
    },
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
  },
  setup(props) {
    const { widgets } = useGlobalConfig();
    return () => getSlot(props.slot, props.schema, widgets.value);
  },
});

export default RenderVnode;
