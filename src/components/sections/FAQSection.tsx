import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How much does Multi AI Prompt Tool cost?",
    answer: "We offer incredibly affordable pricing: ₹99/month or just ₹999/year (save 92%). This gives you access to all 8 premium AI models that would normally cost ₹3000+ per month if purchased separately."
  },
  {
    question: "Which AI models are included?",
    answer: "You get access to GPT-4, Claude, Gemini Pro, Perplexity, Grok, Meta AI, Copilot, and DeepSeek. We're constantly adding new models as they become available, all included in your subscription."
  },
  {
    question: "Are there any usage limits or message caps?",
    answer: "No! Unlike other platforms that limit your usage, Multi AI Prompt Tool offers truly unlimited messages across all AI models. Chat as much as you want without worrying about hitting any caps."
  },
  {
    question: "How do I compare responses from different AIs?",
    answer: "Our unique interface shows responses from all AI models side-by-side in real-time. Simply ask your question once, and see how each AI interprets and answers it. Pick the best response or combine insights from multiple models."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with Multi AI Prompt Tool, we'll refund your payment, no questions asked."
  },
  {
    question: "How often do you add new AI models and features?",
    answer: "We regularly update our platform with the latest AI models and features. Subscribers get automatic access to all new additions without any extra cost. We typically add new models within days of their public release."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Frequently Asked</span>
            <br />
            <span className="text-neon">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Multi AI Prompt Tool
          </p>
        </div>

        <div className="card-glow">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/20">
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-neon-green transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We'd love to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@multiaiprompt.com" 
              className="text-neon-green hover:text-neon-teal transition-colors"
            >
              📧 support@multiaiprompt.com
            </a>
            <span className="hidden sm:block text-muted-foreground">|</span>
            <a 
              href="https://wa.me/1234567890" 
              className="text-neon-purple hover:text-neon-blue transition-colors"
            >
              💬 WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};