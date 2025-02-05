const pick = require("lodash.pick");
const stripe = require("../../stripe.app.js");

module.exports = {
  key: "stripe-update-customer",
  name: "Create a Customer",
  type: "action",
  version: "0.0.1",
  description: "Update a customer",
  props: {
    stripe,
    customer: {
      propDefinition: [
        stripe,
        "name",
      ],
      optional: false,
    },
    name: {
      propDefinition: [
        stripe,
        "name",
      ],
    },
    email: {
      propDefinition: [
        stripe,
        "email",
      ],
    },
    phone: {
      propDefinition: [
        stripe,
        "phone",
      ],
    },
    description: {
      propDefinition: [
        stripe,
        "description",
      ],
    },
    line1: {
      propDefinition: [
        stripe,
        "address1",
      ],
    },
    line2: {
      propDefinition: [
        stripe,
        "address2",
      ],
    },
    city: {
      propDefinition: [
        stripe,
        "city",
      ],
    },
    state: {
      propDefinition: [
        stripe,
        "state",
      ],
    },
    postal_code: {
      propDefinition: [
        stripe,
        "postal_code",
      ],
    },
    country: {
      propDefinition: [
        stripe,
        "country",
      ],
    },
    metadata: {
      propDefinition: [
        stripe,
        "metadata",
      ],
    },
    advanced: {
      propDefinition: [
        stripe,
        "advanced",
      ],
      description: "Specify less-common options that you require. See [Create a Customer]" +
        "(https://stripe.com/docs/api/customers/create) for a list of supported options.",
    },
  },
  async run() {
    const params = pick(this, [
      "name",
      "email",
      "phone",
      "description",
      "metadata",
    ]);
    const address = pick(this, [
      "line1",
      "line2",
      "city",
      "state",
      "postal_code",
      "country",
    ]);
    return await this.stripe.sdk().customers.update(this.customer, {
      ...params,
      address,
      ...this.advanced,
    });
  },
};
