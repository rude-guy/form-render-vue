import { TRenderSlotType, Schema } from '../type';
import { isFn } from '../utils';
import { getWidget } from './mapping';

export const getSlots = (
  slots: Record<string, TRenderSlotType>,
  schema: Schema,
  widgets: Record<string, any>
) => {
  const result: Record<string, () => unknown> = {};

  Object.keys(slots || {}).forEach((key) => {
    const slot: any = slots[key];
    let retVal = slot;
    if (isFn(slot)) {
      retVal = slot(schema);
    }
    // TODO 暂时不做 widget 的处理
    if (retVal.widget) {
      const Widget = getWidget(retVal.widget, widgets);
      retVal = <Widget {...retVal?.props}></Widget>;
    }
    result[key] = () => retVal;
  });

  return result;
};
