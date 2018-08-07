export interface ViewProps {
  tagName?: string;
  /**
   * 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果
   * @since 1.0.0
   */
  hoverClass: string;
  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   * @since 1.0.0
   */
  hoverStopPropagation: boolean;

  /**
   * 按住后多久出现点击态，单位毫秒
   * @since 1.0.0
   */
  hoverStartTime: number;

  /**
   * 手指松开后点击态保留时间，单位毫秒
   * @since 1.0.0
   */
  hoverStayTime: number;

  /**
   * 组件是否显示
   * @since 1.0.0
   */
  hidden: boolean;
}
