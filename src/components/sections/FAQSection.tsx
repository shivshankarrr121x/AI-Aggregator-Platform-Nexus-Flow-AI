import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Nexus Flow AI really free?",
    answer: "Yes! Nexus Flow AI is absolutely free to use with unlimited usage. We believe AI should be accessible to everyone. You'll need to provide your own API keys for the AI services, but our platform is completely free with no hidden fees or subscriptions."
  },
  {
    question: "Which AI models are included?",
    answer: "You get access to 8 premium AI models including ChatGPT, Claude, Gemini Pro, Perplexity, Grok, Meta AI, Copilot, and DeepSeek. Simply add your API keys and start comparing responses instantly."
  },
  {
    question: "Are there any usage limits or message caps?",
    answer: "No! Nexus Flow AI offers truly unlimited messages across all AI models. Your usage is only limited by your API key quotas from the AI providers themselves. Chat as much as you want without any restrictions from our platform."
  },
  {
    question: "How do I compare responses from different AIs?",
    answer: "Our unique interface shows responses from all AI models side-by-side in real-time. Simply ask your question once, and see how each AI interprets and answers it. Pick the best response or combine insights from multiple models."
  },
  {
    question: "Do I need API keys for all 8 AI models?",
    answer: "You can start with just one or two API keys and add more later. The platform works great even if you only have a few AI models configured. You can always add more API keys as you explore different AI capabilities."
  },
  {
    question: "How often do you add new AI models and features?",
    answer: "We regularly update our platform with the latest AI models and features. All users get automatic access to all new additions at no cost. We typically add support for new models within days of their public release."
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
            Everything you need to know about Nexus Flow AI
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
              href="mailto:support@nexusflowai.com" 
              className="text-neon-green hover:text-neon-teal transition-colors"
            >
              📧 support@nexusflowai.com
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