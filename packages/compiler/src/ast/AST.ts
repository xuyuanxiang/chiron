import { Node } from './Node';

export interface AST {
  app: Node;
  pages: Node;
  components: Node;
}
