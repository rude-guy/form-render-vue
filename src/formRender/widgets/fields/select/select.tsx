import { Select } from '@arco-design/web-vue';
import type { SelectInstance } from '@arco-design/web-vue';
import withFieldWrap from '../../../utils/withFieldWrap';
import { SlotTypeMap } from '../../../type';

type ArcoSelectProps = SelectInstance['$props'];

export interface SelectProps extends ArcoSelectProps {
  slots?: SlotTypeMap<
    | 'trigger'
    | 'prepend'
    | 'search-icon'
    | 'loading-icon'
    | 'arrow-icon'
    | 'footer'
    | 'header'
    | 'label'
    | 'option'
    | 'empty'
  >;
}

export default withFieldWrap(Select);
