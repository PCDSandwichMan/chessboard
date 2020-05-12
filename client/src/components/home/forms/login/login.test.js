import React from "react";
import { shallow } from "enzyme";
// - Components
import Login from "./Login.jsx";

// - Abstracting mounting logic
const setup = (props = {}) => {
  const component = shallow(<Login {...props} />);
  return component;
};

// - Abstracting logic for custom selector
import { findByTestAttr } from "../../util/customTestSelectors";

describe("Login Component", () => {
  // - Pre setup for every test
  let component;
  beforeEach(() => {
    component = setup();
  });

  it("should render without errors", () => {
    const wrapper = findByTestAttr(component, "LoginView");
    expect(wrapper.length).toBe(1);
  });
});
