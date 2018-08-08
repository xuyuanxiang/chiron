import { Node } from './Node';

export interface AST {
  app: Node | null;
  pages: Node | null;
  components: Node | null;
}
