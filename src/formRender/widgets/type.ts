import type { InputProps } from './fields/input/input.tsx';
import type { InputNumberProps } from './fields/inputNumber/inputNumber';
import type { SelectProps } from './fields/select/select';
import type { CardProps } from './boxCard/index';
import type { FormItemProps } from '../render-core/fieldItem/field.tsx';

export type WidgetsTypes = {
  input: InputProps;
  inputNumber: InputNumberProps;
  select: SelectProps;
  card: CardProps;
  formItem: FormItemProps;
};
