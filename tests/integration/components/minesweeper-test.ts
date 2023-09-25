import { module, test } from 'qunit';
import { setupRenderingTest } from 'newapp/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | minesweeper', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Minesweeper />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Minesweeper>
        template block text
      </Minesweeper>
    `);

    assert.dom().hasText('template block text');
  });
});
