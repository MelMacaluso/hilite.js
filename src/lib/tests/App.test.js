import Hilite from '../../lib/App';

it('renders without crashing', () => {
  const mockEl = document.createElement('div')
  mockEl.width = 200
  new Hilite({
    target: mockEl
  });
});