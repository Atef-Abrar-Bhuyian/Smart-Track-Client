import React from "react";
import { Accordion } from "flowbite-react";
import { Fade } from "react-awesome-reveal";

export default function Faq() {
  return (
    <div className="mt-16 w-11/12 mx-auto">
      <Fade>
        <h2 className="text-3xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
      </Fade>
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>What payment methods do you accept?</Accordion.Title>
          <Accordion.Content>
            We accept major credit cards, PayPal, and bank transfers.
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            Can I cancel my subscription anytime?
          </Accordion.Title>
          <Accordion.Content>
            Yes, you can cancel anytime, and your subscription will remain
            active until the end of the billing cycle.
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Do you offer refunds?</Accordion.Title>
          <Accordion.Content>
            We offer a 7-day money-back guarantee if you’re not satisfied with
            our service.
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Is there a free trial available?</Accordion.Title>
          <Accordion.Content>
            Yes, we offer a 14-day free trial with access to all features.
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}
