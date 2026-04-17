import React, { useMemo } from "react";

const DEFAULT_GREY = "#98A2B3";
const VIEW_BOX = "0 0 160 160";

const LINES = {
  T1: {
    id: "T1",
    name: "North Shore & Western Line",
    color: "#ffd500",
    segments: [
      [89, 95, 116, 95],[19, 19, 19, 63],[120, 60, 120, 91],[28, 74, 29, 73],
      [43, 74, 64, 95],[30, 74, 43, 74],[79, 19, 120, 60],[64, 95, 82, 95],
      [19, 63, 30, 74],[79, 2, 79, 19],[83, 94, 88, 94],[5, 74, 28, 74],
    ],
  },
  T9: {
    id: "T9",
    name: "Northern Line",
    color: "#cc0000",
    segments: [
      [83, 95, 88, 95],[89, 94, 116, 94],[116, 94, 119, 91],[96, 37, 119, 60],
      [119, 60, 119, 91],[78, 93, 79, 94],[82, 94, 83, 95],[79, 94, 82, 94],
      [88, 95, 89, 94],[78, 18, 78, 93],
    ],
  },
  M1: {
    id: "M1",
    name: "Metro North West & Bankstown",
    color: "#08bfbf",
    segments: [
      [118, 103, 123, 98],[125, 96, 127, 94],[128, 71, 128, 76],[118, 60, 118, 70],
      [79, 46, 80, 47],[31, 40, 76, 40],[127, 70, 128, 71],[125, 87, 125, 89],
      [125, 89, 127, 91],[128, 78, 128, 82],[80, 47, 105, 47],[30, 41, 30, 42],
      [105, 47, 118, 60],[127, 83, 128, 82],[127, 91, 127, 94],[30, 41, 31, 40],
      [77, 41, 77, 44],[113, 103, 118, 103],[124, 70, 127, 70],[76, 40, 77, 41],
    ],
  },
  T2: {
    id: "T2",
    name: "Leppington & Inner West Line",
    color: "#09b3fb",
    segments: [
      [57, 89, 64, 96],[137, 65, 138, 66],[121, 66, 122, 65],[49, 95, 55, 89],
      [55, 88, 55, 89],[137, 86, 138, 85],[47, 132, 49, 130],[49, 95, 49, 130],
      [18, 132, 47, 132],[55, 89, 57, 89],[124, 86, 137, 86],[49, 82, 56, 89],
      [116, 96, 121, 91],[122, 65, 137, 65],[121, 66, 121, 91],[138, 66, 138, 85],
      [64, 96, 116, 96],
    ],
  },
  T3: {
    id: "T3",
    name: "Liverpool & Inner West Line",
    color: "#ff830f",
    segments: [
      [124, 85, 136, 85],[64, 97, 116, 97],[137, 67, 137, 84],[116, 97, 122, 91],
      [63, 98, 64, 97],[122, 67, 123, 66],[62, 107, 63, 106],[136, 66, 137, 67],
      [123, 66, 136, 66],[50, 108, 51, 107],[136, 85, 137, 84],[63, 98, 63, 106],
      [51, 107, 62, 107],[122, 67, 122, 91],[50, 108, 50, 118],
    ],
  },
  T8: {
    id: "T8",
    name: "Airport & South Line",
    color: "#16da23",
    segments: [
      [123, 91, 124, 92],[123, 83, 124, 84],[123, 84, 135, 84],[120, 109, 124, 105],
      [124, 92, 124, 105],[106, 108, 106, 109],[112, 109, 120, 109],[105, 109, 110, 109],
      [123, 68, 123, 91],[89, 125, 123, 91],[135, 67, 136, 68],[106, 108, 107, 109],
      [51, 125, 89, 125],[50, 126, 51, 125],[123, 85, 124, 84],[123, 68, 124, 67],
      [124, 67, 135, 67],[136, 68, 136, 83],[50, 126, 50, 150],[135, 84, 136, 83],
    ],
  },
  T4: {
    id: "T4",
    name: "Eastern Suburbs & Illawarra Line",
    color: "#0000ff",
    segments: [
      [125, 77, 135, 77],[113, 151, 145, 151],[124, 78, 124, 83],[111, 104, 124, 91],
      [111, 104, 111, 158],[152, 77, 153, 78],[111, 151, 112, 150],[111, 150, 112, 150],
      [124, 78, 125, 77],[124, 87, 124, 91],[111, 149, 113, 151],[139, 77, 152, 77],
      [153, 78, 153, 79],
    ],
  },
  T6: {
    id: "T6",
    name: "Lidcombe & Bankstown Line",
    color: "#994d0f",
    segments: [
      [64, 100, 64, 105],[65, 98, 65, 99],[64, 100, 65, 99],[64, 105, 70, 111],
    ],
  },
  T5: {
    id: "T5",
    name: "Cumberland Line",
    color: "#c70f9f",
    segments: [
      [47, 131, 48, 130],[18, 19, 18, 63],[18, 131, 47, 131],[48, 95, 48, 130],
      [18, 63, 30, 75],[48, 95, 54, 89],[43, 75, 55, 87],[30, 75, 43, 75],
    ],
  },
  T7: {
    id: "T7",
    name: "Olympic Park Line",
    color: "#737373",
    segments: [
      [69, 84, 69, 90],[65, 94, 69, 90],
    ],
  },
};

const LINE_ORDER = ["T1", "T9", "M1", "T2", "T3", "T8", "T4", "T6", "T5", "T7"];

const STATIONS = {
  T1: [
    { id: "richmond", x: 18, y: 19, label: "Richmond" },
    { id: "blacktown", x: 31, y: 75, label: "Blacktown" },
    { id: "parramatta", x: 64, y: 95, label: "Parramatta" },
    { id: "strathfield", x: 82, y: 95, label: "Strathfield" },
    { id: "central", x: 120, y: 91, label: "Central" },
    { id: "chatswood", x: 105, y: 45, label: "Chatswood" },
    { id: "hornsby", x: 79, y: 19, label: "Hornsby" },
  ],
  T2: [
    { id: "leppington", x: 18, y: 132, label: "Leppington" },
    { id: "liverpool", x: 49, y: 130, label: "Liverpool" },
    { id: "granville", x: 49, y: 95, label: "Granville" },
    { id: "parramatta", x: 64, y: 96, label: "Parramatta" },
    { id: "central", x: 121, y: 91, label: "Central" },
    { id: "museum", x: 138, y: 85, label: "Museum" },
    { id: "st_james", x: 137, y: 65, label: "St James" },
  ],
  T3: [
    { id: "liverpool", x: 50, y: 118, label: "Liverpool" },
    { id: "bankstown", x: 63, y: 107, label: "Bankstown" },
    { id: "lidcombe", x: 64, y: 97, label: "Lidcombe" },
    { id: "central", x: 122, y: 91, label: "Central" },
    { id: "st_james", x: 137, y: 67, label: "St James" },
  ],
  T4: [
    { id: "bondi_junction", x: 153, y: 79, label: "Bondi Jn" },
    { id: "central", x: 124, y: 91, label: "Central" },
    { id: "hurstville", x: 111, y: 120, label: "Hurstville" },
    { id: "sutherland", x: 111, y: 138, label: "Sutherland" },
    { id: "cronulla", x: 145, y: 151, label: "Cronulla" },
  ],
  T5: [
    { id: "richmond", x: 18, y: 19, label: "Richmond" },
    { id: "blacktown", x: 30, y: 75, label: "Blacktown" },
    { id: "parramatta", x: 48, y: 95, label: "Parramatta" },
    { id: "liverpool", x: 47, y: 131, label: "Liverpool" },
    { id: "leppington", x: 18, y: 131, label: "Leppington" },
  ],
  T6: [
    { id: "lidcombe", x: 64, y: 100, label: "Lidcombe" },
    { id: "berala", x: 65, y: 99, label: "Berala" },
    { id: "bankstown", x: 70, y: 111, label: "Bankstown" },
  ],
  T7: [
    { id: "lidcombe", x: 65, y: 94, label: "Lidcombe" },
    { id: "olympic_park", x: 69, y: 90, label: "Olympic Park" },
  ],
  T8: [
    { id: "revesby", x: 89, y: 125, label: "Revesby" },
    { id: "sydenham", x: 106, y: 109, label: "Sydenham" },
    { id: "central", x: 123, y: 91, label: "Central" },
    { id: "museum", x: 136, y: 83, label: "Museum" },
    { id: "st_james", x: 135, y: 67, label: "St James" },
    { id: "macarthur", x: 50, y: 150, label: "Macarthur" },
  ],
  T9: [
    { id: "hornsby", x: 78, y: 18, label: "Hornsby" },
    { id: "epping", x: 78, y: 40, label: "Epping" },
    { id: "strathfield", x: 83, y: 95, label: "Strathfield" },
    { id: "central", x: 119, y: 91, label: "Central" },
  ],
  M1: [
    { id: "tallawong", x: 31, y: 40, label: "Tallawong" },
    { id: "epping", x: 77, y: 40, label: "Epping" },
    { id: "chatswood", x: 105, y: 47, label: "Chatswood" },
    { id: "barangaroo", x: 125, y: 70, label: "Barangaroo" },
    { id: "central", x: 128, y: 82, label: "Central" },
  ],
};

function SegmentPath({ segments, stroke, strokeWidth = 2, opacity = 1 }) {
  return (
    <>
      {segments.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={opacity}
        />
      ))}
    </>
  );
}

function InteractiveLine({ line, selected, dimmed, onSelect }) {
  const displayStroke = selected ? line.color : DEFAULT_GREY;
  const opacity = selected ? 1 : dimmed ? 0.3 : 0.75;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`Select ${line.name}`}
      className="cursor-pointer outline-none"
      onClick={() => onSelect(line.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(line.id);
        }
      }}
    >
      <SegmentPath segments={line.segments} stroke="transparent" strokeWidth={9} />
      {selected && (
        <SegmentPath
          segments={line.segments}
          stroke={line.color}
          strokeWidth={5.5}
          opacity={0.18}
        />
      )}
      <SegmentPath
        segments={line.segments}
        stroke={displayStroke}
        strokeWidth={selected ? 2.8 : 1.8}
        opacity={opacity}
      />
    </g>
  );
}

function MapOverlay({ selectedLineId, onSelect }) {
  const visibleStations = selectedLineId ? STATIONS[selectedLineId] ?? [] : [];

  return (
    <svg
      viewBox={VIEW_BOX}
      className="absolute inset-0 h-full w-full"
      aria-label="Interactive Sydney rail network map"
    >
      {LINE_ORDER.map((lineId) => {
        const line = LINES[lineId];
        return (
          <InteractiveLine
            key={lineId}
            line={line}
            selected={selectedLineId === lineId}
            dimmed={Boolean(selectedLineId) && selectedLineId !== lineId}
            onSelect={onSelect}
          />
        );
      })}

      {selectedLineId && (
        <g>
          {visibleStations.map((station) => (
            <g key={`${selectedLineId}-${station.id}`}>
              <circle
                cx={station.x}
                cy={station.y}
                r="1.55"
                fill="#ffffff"
                stroke="#0F172A"
                strokeWidth="0.45"
              />
              <text
                x={station.x + 1.8}
                y={station.y - 1.8}
                fontSize="3.2"
                fontWeight="700"
                fill="#0F172A"
                style={{
                  paintOrder: "stroke",
                  stroke: "rgba(255,255,255,0.95)",
                  strokeWidth: 1,
                }}
              >
                {station.label}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

function LineChips({ selectedLineId, onSelect }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {LINE_ORDER.map((lineId) => {
        const line = LINES[lineId];
        const active = selectedLineId === lineId;

        return (
          <button
            key={lineId}
            type="button"
            onClick={() => onSelect(lineId)}
            aria-pressed={active}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              active
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            {line.id}
          </button>
        );
      })}
    </div>
  );
}

export default function NSWInteractiveRailMap({
  selectedLineId,
  onLineChange,
}) {
  const selectedLine = useMemo(
    () => (selectedLineId ? LINES[selectedLineId] : null),
    [selectedLineId]
  );

  const handleSelect = (id) => {
    onLineChange(selectedLineId === id ? null : id);
  };

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Selected line
          </p>
          <p className="text-sm font-semibold text-slate-900">
            {selectedLine ? selectedLine.name : "Choose a line from the map"}
          </p>
        </div>

        {selectedLine && (
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: selectedLine.color }}
          >
            {selectedLine.id}
          </span>
        )}
      </div>

      <div className="relative h-[420px] w-full overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
        <MapOverlay selectedLineId={selectedLineId} onSelect={handleSelect} />
      </div>

      <LineChips selectedLineId={selectedLineId} onSelect={handleSelect} />
    </div>
  );
}