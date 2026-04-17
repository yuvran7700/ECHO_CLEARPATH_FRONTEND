export default function RoutePlannerCard({
  from = "Parramatta",
  to = "Central",
  lineId = "T1",
  risk = 0,
}) {
  const highRisk = risk >= 70;

  // Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    from
  )}&destination=${encodeURIComponent(
    to
  )}&travelmode=transit`;

  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <header>
        <h3 className="text-sm font-semibold text-slate-900">
          Plan alternative route
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Compare safer travel options for tomorrow
        </p>
      </header>

      <div className="mt-4 space-y-3">
        {/* Context message */}
        {highRisk && (
          <p className="text-sm text-red-600 font-medium">
            High disruption expected on {lineId}. Consider an alternative route.
          </p>
        )}

        {!highRisk && (
          <p className="text-sm text-slate-600">
            You can still explore alternative routes if needed.
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            Open in Google Maps
          </a>

          <a
            href="https://transportnsw.info/trip#/trip"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white transition"
          >
            Open TfNSW planner
          </a>
        </div>

        {/* Route info */}
        <p className="text-xs text-slate-400">
          From {from} → {to}
        </p>
      </div>
    </article>
  );
}