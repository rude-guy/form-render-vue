import { PropType, defineComponent } from 'vue';
import { Card } from '@arco-design/web-vue';
import type { CardInstance } from '@arco-design/web-vue';
import { Schema, SlotTypeMap } from '../../type';
import './index.scss';
import { getSlots } from '../../models/slot';
import { useGlobalConfig } from '../../models/useGlobalConfig';
import { assign } from 'lodash';

type ArcoCardProps = CardInstance['$props'];
export interface CardProps extends ArcoCardProps {
  slots?: SlotTypeMap<'actions' | 'cover' | 'extra' | 'title'>;
}

const BoxCard = defineComponent({
  name: 'card',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    childern: {
      type: Object as PropType<JSX.Element>,
      required: false,
    },
  },
  setup(props, { attrs }) {
    console.log(props, attrs);
    const { schema, childern } = props;

    const { widgets } = useGlobalConfig();

    const propsSlots = getSlots(schema.props?.slots, schema, widgets.value);

    let titleNode = () => (
      <>
        {schema.title}
        <span class="card-header-desc">{schema.description}</span>
      </>
    );

    const slots = assign(propsSlots, {
      default: () => childern,
      title: propsSlots?.title || titleNode,
    });

    return () => <Card {...schema.props}>{{ ...slots }}</Card>;
  },
});

export default BoxCard;
