import { Provider } from "react-redux";
import { storeFactory } from "../../../util/testHelpers";

// - Components
import Board from "./Board.jsx";

const setup = (props = {}) => {
  return shallow(
    <Provider
      store={storeFactory({ game: { boardState: [[0, 0, 0, 0, 0, 0, 0]] } })}
    >
      <Board.WrappedComponent {...props} />
    </Provider>
  )
    .dive()
    .dive();
};

describe("Board Component", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it("renders the Board component without errors", () => {
    expect(component.exists()).toBe(true);
  });
});
