import { Input } from '@arco-design/web-vue';
import type { InputInstance } from '@arco-design/web-vue';
import withFieldWrap from '../../../utils/withFieldWrap';
import { SlotTypeMap } from '../../../type';

type ArcoInputProps = InputInstance['$props'];
export interface InputProps extends ArcoInputProps {
  slots?: SlotTypeMap<'append' | 'prepend' | 'suffix' | 'prefix'>;
}

export default withFieldWrap(Input);
