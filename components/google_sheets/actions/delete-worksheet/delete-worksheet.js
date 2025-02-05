const googleSheets = require("../../google_sheets.app");

module.exports = {
  key: "google_sheets-delete-worksheet",
  name: "Delete Worksheet",
  description: "Delete a specific worksheet",
  version: "0.0.1",
  type: "action",
  props: {
    googleSheets,
    drive: {
      propDefinition: [
        googleSheets,
        "watchedDrive",
      ],
      description: "The drive containing the spreadsheet to edit",
    },
    sheetId: {
      propDefinition: [
        googleSheets,
        "sheetID",
        (c) => ({
          driveId: googleSheets.methods.getDriveId(c.drive),
        }),
      ],
    },
    worksheetId: {
      propDefinition: [
        googleSheets,
        "worksheetIDs",
        (c) => ({
          sheetId: c.sheetId,
        }),
      ],
      type: "string",
      label: "Worksheet",
    },
  },
  async run() {
    const request = {
      spreadsheetId: this.sheetId,
      requestBody: {
        requests: [
          {
            deleteSheet: {
              sheetId: this.worksheetId,
            },
          },
        ],
      },
    };
    return await this.googleSheets.batchUpdate(request);
  },
};
