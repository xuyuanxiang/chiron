export interface WxEventOptions {
  bubbles: boolean; // 事件是否冒泡
  composed: boolean; // 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
  capturePhase: boolean; // 事件是否拥有捕获阶段
}
