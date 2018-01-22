import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import MuleSoftHero from './MuleSoftHero';

describe('MuleSoftHero unit tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<MuleSoftHero />);
    expect(wrapper).toBeTruthy();
  });

  it('renders the message sent to the component', () => {
    const message = 'this is a message';
    const wrapper = shallow(<MuleSoftHero message={message} />);
    const messageContainer = wrapper.find('[data-test-id="message-container"]');
    expect(messageContainer.text()).toEqual(message);
  });
});
