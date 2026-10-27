import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { consultingService, serviceHead } from "@/lib/services";

export const Route = createFileRoute("/services/ai-consulting")({
  head: () => serviceHead(consultingService),
  component: () => <ServicePage service={consultingService} />,
});

