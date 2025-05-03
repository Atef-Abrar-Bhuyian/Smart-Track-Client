import React from "react";
import { Accordion } from "flowbite-react";
import { Fade } from "react-awesome-reveal";
import { FiHelpCircle } from "react-icons/fi";
import GradientUI from "../../../Components/GradientUI/GradientUI";

export default function Faq() {
  return (
    <section className="relative py-20 px-4 sm:px-8 md:px-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      <GradientUI />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Fade triggerOnce>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 justify-center text-cyan-600 dark:text-cyan-400 mb-2">
              <FiHelpCircle className="w-6 h-6" />
              <span className="uppercase tracking-wide font-medium text-sm">
                Support
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-base">
              Find quick answers to common questions about our service.
            </p>
          </div>
        </Fade>

        <Accordion
          collapseAll
          className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-none"
        >
          <Accordion.Panel>
            <Accordion.Title className="text-lg font-medium bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              What payment methods do you accept?
            </Accordion.Title>
            <Accordion.Content className="bg-white dark:bg-gray-900 px-4 py-2">
              <p>
                We accept major credit cards, PayPal, and bank transfers.
              </p>
            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title className="text-lg font-medium bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Can I cancel my subscription anytime?
            </Accordion.Title>
            <Accordion.Content className="bg-white dark:bg-gray-900 px-4 py-2">
              <p>
                Yes, you can cancel anytime, and your subscription will remain
                active until the end of the billing cycle.
              </p>
            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title className="text-lg font-medium bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Do you offer refunds?
            </Accordion.Title>
            <Accordion.Content className="bg-white dark:bg-gray-900 px-4 py-2">
              <p>
                We offer a 7-day money-back guarantee if you’re not satisfied
                with our service.
              </p>
            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title className="text-lg font-medium bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Is there a free trial available?
            </Accordion.Title>
            <Accordion.Content className="bg-white dark:bg-gray-900 px-4 py-2">
              <p>
                Yes, we offer a 14-day free trial with access to all features.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </section>
  );
}
