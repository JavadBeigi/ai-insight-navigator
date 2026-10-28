import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { chatbotService, serviceHead } from "@/lib/services";

export const Route = createFileRoute("/services/enterprise-chatbot")({
  head: () => serviceHead(chatbotService),
  component: () => <ServicePage service={chatbotService} />,
});

