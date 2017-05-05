import React from "react";
import { addLocaleData, injectIntl, intlShape } from "react-intl";
import en from "react-intl/locale-data/en";
import Helmet from "react-helmet";
import { observer } from "mobx-react";

if (process.env.BROWSER) {
	// eslint-disable-next-line global-require
	require("./app.less");
}

addLocaleData([...en]);

@observer
export class AppComponent extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired,
		children: React.PropTypes.object
	}

	get defaultMetaTags() {
		const metaTags = [
			{ name: "description", content: SiteInfo.name },
			{ name: "viewport", content: "width=device-width, initial-scale=1.0, user-scalable=yes" },
			{ property: "og:type", content: "article" }
		];

		return metaTags;
	}

	render() {
		return (
				<div>
					<Helmet
						htmlAttributes={ { lang: "en" } }
						titleTemplate={ `${SiteInfo.name} - %s` }
						defaultTitle={ `${SiteInfo.name}` }
						meta={ this.defaultMetaTags }
					/>
					{this.props.children}
				</div>
		);
	}
}


export default injectIntl(AppComponent, { withRef: true });
