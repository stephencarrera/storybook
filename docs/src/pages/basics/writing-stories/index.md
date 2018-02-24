---
id: 'writing-stories'
title: 'Writing Stories'
---

Storybook is all about writing stories. Usually a story contains a single state of one of your components. That's like a visual test case.

> Technically, a story is a function that returns a React element.

You can write a set of stories for your components and you'll get a storybook.

## Keeping your stories

There's no hard and fast rule for this. But, keeping stories close to your components is a good idea.

For example, let's say your UI components live in a directory called: `src/components.` Then you can write stories inside the `src/stories` directory.

This is just one way to do that. You can always edit your storybook config file and ask it to load stories from anywhere you want.

## Writing stories

This is how you write stories:
(Let's assume there's a component called "Button" in `src/components/Button.js`.)

```js
// file: src/stories/index.js

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../components/Button';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ));
```

This will show stories in your storybook like this:

![Basic stories](../static/basic-stories.png)

This is just our core API for writing stories. In addition to this, you can use the official and third party Storybook [addons](/addons/introduction) to get more functionality.

## Loading stories dynamically

Sometimes, you will want to load your stories dynamically rather than explicitly requiring them in the Storybook config file.

For example, you may write stories for your app inside the `src/components` directory with the `.stories.js` extension. Then you will want to load them at once. Simply edit your config directory at `.storybook/config.js` as follows:

```js
import { configure } from '@storybook/react';

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
```

Here we use Webpack's [require.context](https://webpack.js.org/guides/dependency-management/#require-context) to load modules dynamically. Have a look at the relevant Webpack [docs](https://webpack.js.org/guides/dependency-management/#require-context) to learn more about how to use require.context.

The **React Native** packager resolves all the imports at build-time, so it's not possible to load modules dynamically. If you don't want to import all your stories manually you can use [react-native-storybook-loader](https://github.com/elderfo/react-native-storybook-loader) to automatically create the import statements for all of your stories. 

## Using Decorators

A decorator is a way to wrap a story with a common set of component(s). Let's say you want to center all your stories. Here is how we can do this with a decorator:

```js
import React from 'react';
import { storiesOf } from '@storybook/react';
import MyComponent from '../my_component';

storiesOf('MyComponent', module)
  .addDecorator(story => (
    <div style={{textAlign: 'center'}}>
      {story()}
    </div>
  ))
  .add('without props', () => <MyComponent />)
  .add('with some props', () => <MyComponent text="The Comp"/>);
```

Here we only add the decorator for the current set of stories. (In this example, we add it just for the **MyComponent** story group.)

But, you can also add a decorator **globally** and it'll be applied to all the stories you create. This is how to add a decorator like that:

```js
import React from 'react';
import { configure, addDecorator } from '@storybook/react';

addDecorator(story => (
  <div style={{textAlign: 'center'}}>
    {story()}
  </div>
));

configure(function () {
  // ...
}, module);
```

## Using Markdown

As of storybook 3.3, [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) can be used in storybook by default. All you need to do is import a markdown file, and it will automatically be parsed into an HTML string. You can then use that string in any addon that supports HTML (such as notes).


```js
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import MyComponent from './MyComponent';
import someMarkdownText from './someMarkdownText.md';

storiesOf('Component', module)
  .add('With Markdown', withNotes(someMarkdownText)(() => <MyComponent/>));
```

## Nesting stories

You can organize your stories in a nesting structures using "/" as a separator:

```js
// file: src/stories/index.js

import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../components/Button';

storiesOf('My App/Buttons/Simple', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ));

storiesOf('My App/Buttons/Emoji', module)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ));
```

## Generating nesting path based on __dirname

The name is just a javascript string, by using a template literal, you can easily interpolate data.

One example would be to use `base` from [`paths.macro`](https://github.com/storybooks/paths.macro):
```js
import React from 'react';
import base from 'paths.macro';

import { storiesOf } from '@storybook/react';

import BaseButton from '../components/BaseButton';

storiesOf(`Other|${base}/Dirname Example`, module)
  .add('story 1', () => <BaseButton label="Story 1" />)
  .add('story 2', () => <BaseButton label="Story 2" />);
```

*This uses [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros)*.

## Run multiple storybooks

You can run multiple storybooks for different kinds of stories (or components). To do that, you can create different NPM scripts to start different stories. See:

```json
{
   "scripts": {
     "start-storybook-for-theme": "start-storybook -p 9001 -c .storybook-theme",
     "start-storybook-for-app": "start-storybook -p 8001 -c .storybook-app"
   }
}
```
