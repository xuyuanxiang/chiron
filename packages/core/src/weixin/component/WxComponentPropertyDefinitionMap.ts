export type WxComponentProperty<BasicType, Type> =
  | BasicType
  | Array<Type>
  | {
      type: BasicType;
      value: Type;
      observer: (newVal: Type, oldVal?: Type, changedPath?: string) => void;
    };

export type WxComponentPropertyBasicType = Boolean | Number | String | Object;
export type WxComponentPropertyType = boolean | number | string | object;

/**
 * 组件的对外属性，是属性名到属性设置的映射表，属性设置中可包含三个字段，
 * type 表示属性类型、 value 表示属性初始值、 observer 表示属性值被更改时的响应函数
 */
export interface WxComponentPropertyDefinitionMap {
  [key: string]: WxComponentProperty<
    WxComponentPropertyBasicType,
    WxComponentPropertyType
  >;
}
