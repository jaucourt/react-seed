import jasmineEnzyme from "jasmine-enzyme";
import React from "react";
import { shallow } from "enzyme";
import { getIntlContext } from "../helpers/intl-enzyme-test-helper.js";
import { AppComponent as App } from "../../../client/app.js";

describe("App tests", () => {
	const projectName = "React seed app";

	beforeEach(() => {
		jasmineEnzyme();
	});

	it("creates containing div", () => {
		expect(getComponent()).toHaveTagName("div");
	});

	it("contains Helmet", () => {
		expect(getComponent().find("HelmetWrapper")).toBePresent();
	});

	it("Helmet has expected html attributes", () => {
		const helmet = getComponent().find("HelmetWrapper");
		expect(helmet).toHaveProp("htmlAttributes", jasmine.objectContaining({ lang: "en" }));
	});

	it("Helmet has expected title template", () => {
		const helmet = getComponent().find("HelmetWrapper");
		expect(helmet).toHaveProp("titleTemplate", `${projectName} - %s`);
	});

	it("Helmet has expected default title", () => {
		const helmet = getComponent().find("HelmetWrapper");
		expect(helmet).toHaveProp("defaultTitle", projectName);
	});

	it("Helmet has expected meta tags", () => {
		const helmet = getComponent().find("HelmetWrapper");
		expect(helmet).toHaveProp("meta", jasmine.arrayContaining([
			jasmine.objectContaining({ name: "description", content: projectName }),
			jasmine.objectContaining({ name: "viewport", content: "width=device-width, initial-scale=1.0, user-scalable=yes" }),
			jasmine.objectContaining({ property: "og:type", content: "article" })
		]));
	});

	it("Renders child nodes", () => {
		class SampleComponent extends React.Component {
			render() {
				return (<div className="mySampleComponent"></div>);
			}
		}
		const scInst = (<SampleComponent />);
		expect(getComponent(scInst).find(SampleComponent)).toBePresent();
	});
});

function getComponent(children) {
	return shallow(<App intl={getIntlContext()} children={children} />);
}
