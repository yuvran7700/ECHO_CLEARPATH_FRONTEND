import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen } from "lucide-react";

export default function ApiDocButton() {
    const navigate = useNavigate();

    const items = [
        {
            title: "API documentation",
            description:
                "Open the reference for weather, alert, and social media search endpoints, request parameters, and response schemas.",
            buttonLabel: "Open docs",
            icon: FileText,
            path: "/api-doc", // internal route
        },
        {
            title: "Integration guide",
            description:
                "See the setup flow for frontend apps, server-side services, and testing environments.",
            buttonLabel: "View guide",
            icon: BookOpen,
            externalUrl: "https://yuvran7700.github.io/clearpath-docs/", // 👈 external
        },
    ];

    return (
        <Card className="rounded-3xl border border-black/10 bg-white/80 shadow-none backdrop-blur-sm">
            <CardHeader className="space-y-2 pb-3">
                <CardTitle className="text-lg font-semibold tracking-tight text-neutral-900">
                    Developer access
                </CardTitle>
                <CardDescription className="max-w-2xl text-sm leading-6 text-neutral-500">
                    Fast links for engineers integrating predictions into apps, dashboards,
                    or internal tools.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="group flex flex-col gap-4 rounded-2xl border border-black/8 bg-neutral-50/80 p-4 transition-all duration-200 hover:border-black/12 hover:bg-neutral-100/80 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex min-w-0 items-start gap-3">
                                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/8 bg-white text-neutral-600">
                                    <Icon className="h-4 w-4" />
                                </div>

                                <div className="min-w-0">
                                    <h4 className="text-sm font-medium text-neutral-900">
                                        {item.title}
                                    </h4>
                                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* go to webURL */}
                            <div className="flex shrink-0 justify-start sm:justify-end">
                                <Button
                                    onClick={() => {
                                        if (item.externalUrl) {
                                            window.open(item.externalUrl, "_blank");
                                        } else {
                                            navigate(item.path);
                                        }
                                    }}
                                    variant="outline"
                                    className="h-9 rounded-full border-black/10 bg-white px-4 text-sm font-medium text-neutral-800 shadow-none transition hover:bg-neutral-100 hover:text-black"
                                >
                                    {item.buttonLabel}
                                </Button>


                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}