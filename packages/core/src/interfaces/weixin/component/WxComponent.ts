import { WxComponentConstructorArguments } from './WxComponentConstructorArguments';
import { WxComponentBehavior } from './WxComponentBehavior';
import { WxEventOptions } from '../common/WxEventOptions';
import { WxComponentRelationMap } from './WxComponentRelationMap';

export interface WxComponent<Data = { [key: string]: any }>
  extends WxComponentConstructorArguments {
  /**
   * 组件的文件路径
   */
  is: String;

  /**
   * 节点id
   */
  id: String;

  /**
   * 节点dataset
   */
  dataset: String;

  /**
   * 设置data并执行视图层渲染
   */
  setData(data: Data): void;

  /**
   * 触发事件
   */
  triggerEvent(event: string, detail: any, options?: WxEventOptions): void;

  /**
   * 创建一个 SelectorQuery 对象，选择器选取范围为这个组件实例内
   * @deprecated unimplemented
   */
  createSelectorQuery?(): void;

  /**
   * 检查组件是否具有 behavior （检查时会递归检查被直接或间接引入的所有behavior）
   * @deprecated unimplemented
   */
  hasBehavior?(behavior: WxComponentBehavior): boolean;

  /**
   * 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象
   * @deprecated unimplemented
   */
  selectComponent?(selector: string): WxComponent;

  /**
   * 使用选择器选择组件实例节点，返回匹配到的全部组件实例对象组成的数组
   * @deprecated unimplemented
   */
  selectAllComponents?(selector: string): WxComponent;

  /**
   * 获取所有这个关系对应的所有关联节点
   * @deprecated unimplemented
   */
  getRelationNodes?(relationKey: string): WxComponentRelationMap;
}
