export interface WxComponentLifecycleHook {
  /**
   * 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
   */
  created?(): void;

  /**
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   */
  attached?(): void;

  /**
   * 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息
   */
  ready?(): void;

  /**
   * 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
   */
  moved?(): void;

  /**
   * 组件生命周期函数，在组件实例被从页面节点树移除时执行
   */
  detached?(): void;
}
