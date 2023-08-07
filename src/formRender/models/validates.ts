import type { FieldRule } from '@arco-design/web-vue';
import Color from 'color';
import { Schema } from '../type';
import { isFunction, isObject } from 'lodash';
import { isUrl } from '../utils';

const getRuleVal = (
  type: string,
  minmax: 'min' | 'max',
  val?: number,
  message?: string
) => {
  const ruleMap: Record<string, Record<string, any>> = {
    string: {
      min: { minLength: val, message: `字符串最小长度为${val}` },
      max: { maxLength: val, message: `字符串最大长度为${val}` },
    },
    number: {
      min: { min: val, message: `数字最小值为${val}` },
      max: { max: val, message: `数字最大值为${val}` },
    },
    array: {
      min: { length: val, message: `列表最小长度为${val}` },
      max: { length: val, message: `列表最大长度为${val}` },
    },
  };

  const rule = ruleMap[type]?.[minmax];
  rule.message = message || rule.message;
  rule.type = type;
  return rule;
};

const insertLengthRule = (schema: Schema, rules: FieldRule[]) => {
  const { type, max, min, message } = schema;

  if (max || max === 0) {
    const rule = getRuleVal(type!, 'max', max, message);
    rules.push(rule);
  }
  if (min || min === 0) {
    const rule = getRuleVal(type!, 'min', min, message);
    rules.push(rule);
  }
};

const insertRequiredRule = (schema: Schema, rules: FieldRule[]) => {
  let { type, format, required, message, widget, title } = schema;

  const requiredAlready = schema?.rules?.some((item) => item?.required);

  // 未声明 required，或已经存在 required 校验
  if (!required || requiredAlready) {
    return;
  }

  let rule: any = { required: true, message };

  if (
    ['year', 'quarter', 'month', 'week', 'date', 'dateTime', 'time'].includes(
      format!
    ) &&
    type === 'range'
  ) {
    rule = {
      type: 'array',
      required: true,
      length: 2,
    };
  } else if (widget === 'checkbox') {
    rule = { type, required: true, message: message || title + '必填' };
  } else if (type === 'string' || type === 'number') {
    rule = {
      type,
      required: true,
      message: message || (!title ? void 0 : title + '必填'),
    };
  }
  rules.push(rule);
};

export const transformRules = (rules: FieldRule[], formData: any) => {
  return rules.map((item: FieldRule & { transformed?: boolean }) => {
    const validator = isFunction(item?.validator)
      ? (item.validator as Schema['validator'])
      : void 0;
    if (validator && !item.transformed) {
      item.validator = async (value, callback) => {
        const result = await validator(value, formData);
        if (isObject(result)) {
          return !result?.status && callback(result.message || item.message);
        }
        return !result && callback(item.message || result);
      };
      item.transformed = true;
    }
    return item;
  });
};

export const getRuleList = (schema: Schema, formData: any) => {
  let { format, rules: ruleList = [], validator, pattern, message } = schema;

  const rules = [...ruleList];
  insertRequiredRule(schema, rules);
  insertLengthRule(schema, rules);

  if (isFunction(validator)) {
    rules.push({
      validator: validator as any,
      message: message || '校验失败',
    });
  }

  if (pattern) {
    rules.push({
      match: pattern,
      message,
    });
  }

  if (format === 'url') {
    rules.push({ type: 'url', message });
  }

  if (format === 'email') {
    rules.push({ type: 'email', message });
  }

  if (format === 'image') {
    rules.push({
      validator: (value: any) => {
        if (!value) {
          return true;
        }
        const imagePattern =
          '([/|.|w|s|-])*.(?:jpg|gif|png|bmp|apng|webp|jpeg|json)';
        const _isUrl = isUrl(value);
        const _isImg = new RegExp(imagePattern).test(value);
        return _isUrl || _isImg;
      },
      message: message || '请输入正确的图片格式',
    });
  }

  if (format === 'color') {
    rules.push({
      validator: (value: any) => {
        try {
          Color(value || null); // 空字符串无法解析会报错，出现空的情况传 null
          return true;
        } catch (e) {
          return false;
        }
      },
      message: message || '请填写正确的颜色格式',
    });
  }
  return transformRules(rules, formData);
};
