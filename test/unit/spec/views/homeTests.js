import React from "react";
import jasmineEnzyme from "jasmine-enzyme";
import { shallowWithIntl } from "../../helpers/intl-enzyme-test-helper.js";
import Home from "../../../../client/views/home/Home.js";

describe("homepage", () => {
	beforeEach(() => {
		jasmineEnzyme();
	});

	it("generates containing div", () => {
		expect(getComponent()).toHaveTagName("div");
	});

	it("has class 'home'", () => {
		expect(getComponent()).toHaveClassName("home");
	});
});

function getComponent() {
	return shallowWithIntl(<Home />);
}
