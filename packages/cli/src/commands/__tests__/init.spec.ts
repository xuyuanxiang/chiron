import { init } from '../init';

jest.mock('dns');

describe('init command', () => {
  beforeEach(() => {});

  it('clone', () => {
    init('my-project');
  });
});
