// Used by Karma to inject a <div id="app"></div> element.
// Allows require(ing) the client.js to provide coverage for untested files.

if (document.getElementById("app") === null) {
	const div = document.createElement("div");
	div.id = "app";
	document.body.appendChild(div);
}
