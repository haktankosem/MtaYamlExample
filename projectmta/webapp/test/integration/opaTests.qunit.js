/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["projectmta/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
