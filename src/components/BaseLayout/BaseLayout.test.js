/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import BaseLayout from './BaseLayout';

describe('Layout', () => {
  it('renders children correctly', () => {
    const wrapper = renderer.create(
      <App context={{ insertCss: () => {} }}>
        <BaseLayout>
          <div className="child" />
        </BaseLayout>
      </App>,
    ).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
