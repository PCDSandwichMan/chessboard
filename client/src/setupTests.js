import React from "react";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// - Custom Selectors
import { findByTestAttr } from "./util/testHelpers";

Enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
});

global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.findByTestAttr = findByTestAttr;
