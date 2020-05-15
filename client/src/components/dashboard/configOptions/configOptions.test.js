import { Provider } from "react-redux";
import { storeFactory } from "../../../util/testHelpers";

// - Components
import OneConfigOptions from "./OneConfigOptions.jsx";
import TwoConfigOptions from "./TwoConfigOptions.jsx";

const setupConfigOptOne = (props = {}) => {
  return shallow(
    <Provider
      store={storeFactory({ game: { boardState: [[0, 0, 0, 0, 0, 0, 0]] } })}
    >
      <OneConfigOptions {...props} />
    </Provider>
  );
};
const setupConfigOptTwo = (props = {}) => {
  return shallow(
    <Provider
      store={storeFactory({ game: { boardState: [[0, 0, 0, 0, 0, 0, 0]] } })}
    >
      <TwoConfigOptions {...props} />
    </Provider>
  );
};

describe("ConfigOptions Components", () => {
  let componentConfigOptOne, componentConfigOptTwo;
  beforeEach(() => {
    componentConfigOptOne = setupConfigOptOne();
    componentConfigOptTwo = setupConfigOptTwo();
  });

  it("both player the player one config and player two config render without errors", () => { 
    expect(componentConfigOptOne.exists()).toBe(true);
    expect(componentConfigOptTwo.exists()).toBe(true);
  });
});
