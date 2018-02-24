import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { document } from 'global';

import {
  withKnobs,
  text,
  button,
  number,
  select,
  date,
  color,
  array,
  boolean,
} from '@storybook/addon-knobs/polymer';

storiesOf('Addon|Knobs', module)
  .addDecorator(withKnobs)
  .add('simple', () => {
    const title = text('Button title', 'Hello');
    const el = document.createElement('playground-button');
    el.setAttribute('title', title);
    button('callback', () => el.setAttribute('title', 'testing'));
    return el;
  })
  .add('complex', () => {
    const name = text('Name', 'Jane');
    const stock = number('Stock', 20, { range: true, min: 0, max: 30, step: 5 });
    const fruits = { apples: 'Apple', bananas: 'Banana', cherries: 'Cherry' };
    const fruit = select('Fruit', fruits, 'apple');
    const price = number('Price', 2.25);
    const colour = color('Border', 'deeppink');
    const today = date('Today', new Date('Jan 20 2017 GMT+0'));
    const items = array('Items', ['Laptop', 'Book', 'Whiskey']);
    const nice = boolean('Nice', true);

    const stockMessage = stock
      ? `I have a stock of ${stock} ${fruit}, costing &dollar;${price} each.`
      : `I'm out of ${fruit}${nice ? ', Sorry!' : '.'}`;
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

    button('Arbitrary action', action('You clicked it!'));

    return `
          <div style="border:2px dotted ${colour}; padding: 8px 22px; border-radius: 8px">
            <h1>My name is ${name},</h1>
            <h3>today is ${new Date(today).toLocaleDateString('en-US', dateOptions)}</h3>
            <p>${stockMessage}</p>
            <p>Also, I have:</p>
            <ul>
              ${items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p>${nice ? 'Nice to meet you!' : 'Leave me alone!'}</p>
          </div>
        `;
  });
