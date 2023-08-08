import { TRenderSlotType, Schema } from '../type';
import { capitalizeFirstLetter, isFn } from '../utils';
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
    if (retVal.widget) {
      const widgetName = capitalizeFirstLetter(retVal.widget);
      const Widget = getWidget(widgetName, widgets);
      retVal = <Widget {...retVal?.props}></Widget>;
    }
    result[key] = () => retVal;
  });

  return result;
};
