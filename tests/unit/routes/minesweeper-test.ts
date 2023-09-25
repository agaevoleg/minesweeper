import { module, test } from 'qunit';
import { setupTest } from 'newapp/tests/helpers';

module('Unit | Route | minesweeper', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:minesweeper');
    assert.ok(route);
  });
});
