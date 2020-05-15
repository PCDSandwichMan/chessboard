// - Components
import BoardSizeInput from "./BoardSizeInput.jsx";
import { findByTestAttr } from "../../../util/testHelpers.js";

const setup = (props = {}) => {
  return shallow(<BoardSizeInput {...props} />);
};

describe("BoardSizeInput Component", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it("renders the BoardSizeInput component without errors", () => { 
    expect(component.exists()).toBe(true);
  });
  it("fires the handleBoardSetup function on CREATE NEW BOARD click", () => {
    const mockHandleBoardSetup = jest.fn();
    component.setProps({ 
      handleBoardSetup: mockHandleBoardSetup,
    });

    const btn = findByTestAttr(
      component,
      "component-boardSizeInput-createBoardBtn"
    );
    btn.simulate("click");

    expect(mockHandleBoardSetup.mock.calls.length).toBe(1);
  });
  it("fires the handleBoardSetup function on RESET GAME click", () => {
    const mockHandleBoardSetup = jest.fn();
    component.setProps({ 
      handleBoardSetup: mockHandleBoardSetup,
    });

    const btn = findByTestAttr(component, "component-boardSizeInput-resetBtn");
    btn.simulate("click");

    expect(mockHandleBoardSetup.mock.calls.length).toBe(1);
  });
  it("fires the handleUserGameSave function on SAVE GAME click", () => {
    const mockHandleUserGameSave = jest.fn();
    component.setProps({ 
      handleUserGameSave: mockHandleUserGameSave,
    });

    const btn = findByTestAttr(
      component,
      "component-boardSizeInput-saveGameBtn"
    );
    btn.simulate("click");

    expect(mockHandleUserGameSave.mock.calls.length).toBe(1);
  });
});
