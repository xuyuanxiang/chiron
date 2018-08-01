import { Node } from './Node';

export interface AST {
  script: Node;
  style: Node;
  template: Node; // *.wxml
}
