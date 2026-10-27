import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { agentService, serviceHead } from "@/lib/services";

export const Route = createFileRoute("/services/ai-agent-development")({
  head: () => serviceHead(agentService),
  component: () => <ServicePage service={agentService} />,
});

