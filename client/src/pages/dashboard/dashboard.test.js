import React from "react";
import { shallow } from "enzyme";
// - Components
import Dashboard from "./Dashboard.jsx";

// - Abstracting mounting logic
const setup = (props = {}) => {
  const component = shallow(<Dashboard {...props} />);
  return component;
};

// - Abstracting logic for custom selector
import { findByTestAttr } from "../../util/customTestSelectors";

describe("Dashboard Component", () => {
  // - Pre setup for every test
  let component;
  beforeEach(() => {
    component = setup();
  });

  it("should render without errors", () => {
    const wrapper = findByTestAttr(component, "dashboardView");
    expect(wrapper.length).toBe(1);
  });
});
