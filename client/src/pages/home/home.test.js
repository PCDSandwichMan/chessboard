import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { storeFactory } from "../../util/testHelpers";
// - Components
import Home from "./Home.jsx";

const setup = (props = {}) => {
  return shallow(<Home {...props} />);
};

describe("Home Page", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it("renders the Home page without errors", () => {
    const wrapper = findByTestAttr(component, "view-home");
    expect(wrapper.length).toBe(1);
  });
  it("renders all images", () => {
    const wrapper = component.find('[alt="driven business units logos"]');
    expect(wrapper.length).toBe(6);
  });
  it("renders the login by default", () => {
    const fullMountComponent = mount(
      <Provider store={storeFactory()}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    const wrapper = fullMountComponent.find('[data-test="component-login"]');
    expect(wrapper.length).toBe(1);
  });
});
