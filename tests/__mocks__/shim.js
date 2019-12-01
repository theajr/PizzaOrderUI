global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// console.error = () => {};

configure({ adapter: new Adapter() });
