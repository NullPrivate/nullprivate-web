import sourceMessages from '../i18n/zh-cn/commerce.json';

export type MessageParams = Record<string, string | number>;
export type Translator = (key: string, params?: MessageParams) => string;

/** 商务组件共用文本插值；业务参数与展示语言分开处理。 */
export function createCommerceTranslator(messages?: Record<string, string>): Translator {
  const source: Record<string, string> = sourceMessages;
  return (key, params = {}) => {
    const template = messages?.[key] ?? source[key] ?? key;
    return template.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
      Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : placeholder,
    );
  };
}
