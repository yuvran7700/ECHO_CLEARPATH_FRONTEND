import { useState } from "react";
import useForecast from "@/hooks/useForecast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrainFront, Sparkles, ArrowRight } from "lucide-react";

const LINES = [
    { id: "T1", name: "North Shore & Western Line" },
    { id: "T2", name: "Leppington & Inner West Line" },
    { id: "T3", name: "Liverpool & Inner West Line" },
    { id: "T4", name: "Eastern Suburbs & Illawarra Line" },
    { id: "T5", name: "Cumberland Line" },
    { id: "T6", name: "Lidcombe & Bankstown Line" },
    { id: "T7", name: "Olympic Park Line" },
    { id: "T8", name: "Airport & South Line" },
    { id: "T9", name: "Northern Line" },
];

export default function LineSelector({
    className = "",
}) {
    const { selectedLineId, handleLineSelect } = useForecast();

    const [open, setOpen] = useState(false);
    const [selectedUnavailableLine, setSelectedUnavailableLine] = useState("");

    const selectedLine = LINES.find((line) => line.id === selectedLineId);
    const unavailableLine = LINES.find((line) => line.id === selectedUnavailableLine);

    function handleChange(value) {
        if (value === "T1") {
            handleLineSelect(value);
            return;
        }

        setSelectedUnavailableLine(value);
        setOpen(true);
    }

    return (
        <div className={className}>
            <Select value={selectedLineId} onValueChange={handleChange}>
                <SelectTrigger className="h-12 w-full max-w-lg rounded-2xl border-black/10 bg-white px-4 text-left shadow-sm">
                    <SelectValue>
                        {selectedLine
                            ? `${selectedLine.id} — ${selectedLine.name}`
                            : "Choose a train line..."}
                    </SelectValue>
                </SelectTrigger>

                <SelectContent className="rounded-2xl">
                    {LINES.map((line) => (
                        <SelectItem key={line.id} value={line.id} className="rounded-xl">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-xs font-semibold text-foreground">
                                    {line.id}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-foreground">
                                        {line.name}
                                    </p>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-xl rounded-[28px] border-none p-0 shadow-2xl">
                    <div className="overflow-hidden rounded-[28px] bg-white">
                        <div className="relative border-b border-black/5 bg-gradient-to-b from-neutral-50 to-white px-6 pb-6 pt-8">
                            <div className="mb-6 flex items-center justify-center">
                                <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] bg-black text-white shadow-sm">
                                    <TrainFront className="h-10 w-10" />
                                    <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            <DialogHeader className="space-y-3 text-center">
                                <DialogTitle className="text-2xl font-semibold tracking-tight text-foreground">
                                    {selectedUnavailableLine} is coming soon
                                </DialogTitle>

                                <DialogDescription className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">
                                    {unavailableLine?.name ?? "This line"} is not supported in the
                                    current release yet. ClearPath is starting with T1 first, and
                                    more Sydney train lines will be added soon.
                                </DialogDescription>
                            </DialogHeader>
                        </div>

                        <div className="space-y-5 px-6 py-6">
                            <div className="rounded-2xl border border-black/5 bg-neutral-50 p-4">
                                <p className="text-sm font-medium text-foreground">
                                    Available now
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    T1 — North Shore & Western Line
                                </p>
                            </div>

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="rounded-2xl"
                                    onClick={() => setOpen(false)}
                                >
                                    Close
                                </Button>

                                <Button
                                    type="button"
                                    className="rounded-2xl"
                                    onClick={() => {
                                        handleLineSelect("T1");
                                        setOpen(false);
                                    }}
                                >
                                    View T1 instead
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}