import { Component, ComponentConstructorArguments } from './Component';

export interface PageConstructorArguments
  extends ComponentConstructorArguments {
  route: string;
}

export class Page extends Component {
  readonly type: string = 'Page';
  readonly route: string;

  constructor({ route, ...others }: PageConstructorArguments) {
    super(others);
    this.route = route;
  }
}
