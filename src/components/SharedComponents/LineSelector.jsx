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

export default function LineSelector({ className = "" }) {
    const { selectedLineId, handleLineSelect } = useForecast();

    const [open, setOpen] = useState(false);
    const [selectedUnavailableLine, setSelectedUnavailableLine] = useState("");

    const selectedLine = LINES.find((line) => line.id === selectedLineId);
    const unavailableLine = LINES.find(
        (line) => line.id === selectedUnavailableLine
    );

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
                {/* 🔥 FIXED TRIGGER */}
                <SelectTrigger
                    className="
            h-11 w-full max-w-lg 
            rounded-[28px]
            border border-orange-500
            bg-orange-500 text-white

            px-3
            shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)]

            transition-all duration-200
            hover:bg-orange-600
            active:scale-[0.995]

            focus:ring-2 focus:ring-orange-300/40

            [&>svg]:text-white
            [&>svg]:opacity-100
          "
                >
                    <SelectValue>
                        {selectedLine ? (
                            <div className="flex items-center gap-2.5">
                                {/* NSW-style square badge */}
                                <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-white text-[11px] font-black tracking-tight text-orange-600">
                                    {selectedLine.id}
                                </div>

                                <span className="truncate text-sm font-semibold text-white">
                                    {selectedLine.name}
                                </span>
                            </div>
                        ) : (
                            <span className="text-sm text-white/90">
                                Choose a train line...
                            </span>
                        )}
                    </SelectValue>
                </SelectTrigger>

                {/* DROPDOWN */}
                <SelectContent className="rounded-3xl border border-black/10 bg-white p-2 shadow-2xl">
                    {LINES.map((line) => (
                        <SelectItem
                            key={line.id}
                            value={line.id}
                            className="rounded-2xl px-3 py-3 transition-colors hover:bg-neutral-50 focus:bg-neutral-50"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div
                                    className={`
                    flex h-8 w-8 items-center justify-center
                    rounded-[7px] text-xs font-black tracking-tight
                    ${line.id === "T1"
                                            ? "bg-orange-500 text-white"
                                            : "bg-neutral-100 text-neutral-700"
                                        }
                  `}
                                >
                                    {line.id}
                                </div>

                                <p className="truncate text-sm font-medium text-neutral-900">
                                    {line.name}
                                </p>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* DIALOG */}
            {/* <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-xl rounded-[32px] border-none p-0 shadow-2xl">
                    <div className="overflow-hidden rounded-[32px] bg-white">
                        <div className="border-b border-black/5 bg-gradient-to-b from-neutral-50 to-white px-6 pb-6 pt-8">
                            <div className="mb-6 flex items-center justify-center">
                                <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] bg-neutral-900 text-white shadow-sm">
                                    <TrainFront className="h-10 w-10" />
                                    <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            <DialogHeader className="space-y-3 text-center">
                                <DialogTitle className="text-2xl font-semibold tracking-tight text-neutral-900">
                                    {selectedUnavailableLine} is coming soon
                                </DialogTitle>

                                <DialogDescription className="mx-auto max-w-md text-sm leading-6 text-neutral-500">
                                    {unavailableLine?.name ?? "This line"} is not supported yet.
                                    ClearPath is starting with T1 first, with more lines coming
                                    soon.
                                </DialogDescription>
                            </DialogHeader>
                        </div>

                        <div className="space-y-5 px-6 py-6">
                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                                <p className="text-sm font-medium text-neutral-900">
                                    Available now
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-orange-500 text-[11px] font-black text-white">
                                        T1
                                    </div>
                                    <p className="text-sm text-neutral-600">
                                        North Shore & Western Line
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <Button
                                    variant="outline"
                                    className="rounded-full border-black/10 px-5"
                                    onClick={() => setOpen(false)}
                                >
                                    Close
                                </Button>

                                <Button
                                    className="rounded-full bg-orange-500 px-5 text-white hover:bg-orange-600"
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
            </Dialog> */}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg rounded-[28px] border-none p-0 shadow-2xl">
                    <div className="overflow-hidden rounded-[28px] bg-white">
                        <div className="px-6 pb-6 pt-7 sm:px-7">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-[24px] bg-neutral-900 text-white shadow-sm">
                                    <TrainFront className="h-9 w-9" />
                                    <div className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-600 ring-4 ring-white">
                                        <Sparkles className="h-3.5 w-3.5" />
                                    </div>
                                </div>

                                <DialogHeader className="space-y-2">
                                    <DialogTitle className="text-[28px] font-semibold tracking-tight text-neutral-900">
                                        {selectedUnavailableLine} is coming soon
                                    </DialogTitle>

                                    <DialogDescription className="mx-auto max-w-sm text-sm leading-6 text-neutral-500">
                                        {unavailableLine?.name ?? "This line"} is not supported yet.
                                        ClearPath is starting with T1 first, with more lines rolling out
                                        soon.
                                    </DialogDescription>
                                </DialogHeader>
                            </div>

                            <div className="mt-6 rounded-3xl border border-orange-100 bg-orange-50/80 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-orange-500 text-[12px] font-black tracking-tight text-white">
                                        T1
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-neutral-900">
                                            Available now
                                        </p>
                                        <p className="mt-1 text-sm text-neutral-600">
                                            North Shore &amp; Western Line
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <Button
                                    variant="outline"
                                    className="h-11 rounded-full border-black/10 px-5"
                                    onClick={() => setOpen(false)}
                                >
                                    Close
                                </Button>

                                <Button
                                    className="h-11 rounded-full bg-orange-500 px-5 text-white hover:bg-orange-600"
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