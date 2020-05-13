// - Components
import Register from "./Register.jsx";

const setup = (props = {}) => {
  return shallow(<Register.WrappedComponent {...props} />);
};

describe("Register Component", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it("renders the Login component without errors", () => {
    const wrapper = findByTestAttr(component, "component-register");
    expect(wrapper.exists()).toBe(true);
  });
  it("renders all three input fields", () => {
    const wrapper = findByTestAttr(component, "component-register-input");
    expect(wrapper.length).toBe(3);
  });
  it("renders the register button", () => {
    const wrapper = findByTestAttr(component, "component-register-btn");
    expect(wrapper.length).toBe(1);
  }); 
});
