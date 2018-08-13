import { WxComponentPropertyDefinitionMap } from './WxComponentPropertyDefinitionMap';
import { WxComponentLifecycleHook } from './WxComponentLifecycleHook';
import { WxComponentBehavior } from './WxComponentBehavior';
import { WxComponentRelationMap } from './WxComponentRelationMap';

export interface WxComponentConstructorArguments<Data = { [key: string]: any }>
  extends WxComponentLifecycleHook {
  /**
   * 组件的对外属性，是属性名到属性设置的映射表，属性设置中可包含三个字段， type 表示属性类型、 value 表示属性初始值、 observer 表示属性值被更改时的响应函数
   */
  properties?: WxComponentPropertyDefinitionMap;
  /**
   * 组件的内部数据，和 properties 一同用于组件的模版渲染
   */
  data?: Data;
  /**
   * 组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用
   */
  methods?: { [key: string]: Function };
  /**
   * 组件接受的外部样式类
   */
  externalClasses?: string | string[];
  /**
   * 类似于mixins和traits的组件间代码复用机制
   */
  behaviors?: WxComponentBehavior[];
  /**
   * 组件间关系定义
   */
  relations?: WxComponentRelationMap;
  /**
   * @deprecated 微信文档未定义
   */
  options: any;
}
