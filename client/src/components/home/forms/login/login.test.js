// - Components
import Login from "./Login.jsx";

const setup = (props = {}) => {
  return shallow(<Login.WrappedComponent {...props} />);
};

describe("Login Component", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it("renders the Login component without errors", () => {
    const wrapper = findByTestAttr(component, "LoginView");
    expect(wrapper.exists()).toBe(true);
  });
  it("renders two input fields by default", () => {
    const wrapper = findByTestAttr(component, "component-login-input");
    expect(wrapper.length).toBe(2);
  });
  it("renders the login button", () => {
    const wrapper = findByTestAttr(component, "component-login-btn");
    expect(wrapper.length).toBe(1);
  });
});
