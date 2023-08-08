import { InputNumber } from '@arco-design/web-vue';
import type { InputNumberInstance } from '@arco-design/web-vue';
import withFieldWrap from '../../../utils/withFieldWrap';
import { SlotTypeMap } from '../../../type';

type ArcoInputProps = InputNumberInstance['$props'];

export interface InputNumberProps extends ArcoInputProps {
  slots?: SlotTypeMap<
    'append' | 'prepend' | 'suffix' | 'prefix' | 'minus' | 'plus'
  >;
}

export default withFieldWrap(InputNumber);
