import React, { useState } from "react";
import { getDemonstrations } from "../services/demonstrationsService";

export default function Demonstrations() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function load(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await getDemonstrations(location || undefined);
      setData(res);
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "Failed to load demonstrations");
    } finally {
      setLoading(false);
    }
  }

  const events = Array.isArray(data?.upcomingEvents) ? data.upcomingEvents : [];
  const videos = Array.isArray(data?.videos) ? data.videos : [];
  const reels = Array.isArray(data?.reels) ? data.reels : [];
  const techs = Array.isArray(data?.technologies) ? data.technologies : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Modern Farming Demonstrations</h2>
      <p className="text-gray-600 mb-6">Find upcoming events and watch educational videos on modern techniques like drone spraying and vermicompost.</p>

      <form onSubmit={load} className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
          <div>
            <label className="block mb-1 font-medium">Location (optional)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Ludhiana"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded px-4 py-2"
          >
            {loading ? "Loading..." : "Load"}
          </button>
        </div>
      </form>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4">{error}</div>}

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-3">Upcoming Events</h3>
          {events.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-4 text-gray-600">No events available. Click Load to fetch.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((ev, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{ev.title || "Event"}</h4>
                    <span className="text-sm text-gray-700">{ev.date}</span>
                  </div>
                  <p className="text-gray-700 mb-1">
                    <strong>Location:</strong> {ev.location}
                  </p>
                  {ev.description && <p className="text-gray-700 mb-2">{ev.description}</p>}
                  {ev.registration && <p className="text-sm text-gray-600"><strong>Registration:</strong> {ev.registration}</p>}
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Videos</h3>
          {videos.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-4 text-gray-600">No videos available. Click Load to fetch.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((v, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4 border">
                  <h4 className="font-semibold mb-1">{v.title || "Video"}</h4>
                  <p className="text-sm text-gray-700 mb-1">
                    {v.duration ? `Duration: ${v.duration}` : ""} {v.language ? `• Language: ${v.language}` : ""}
                  </p>
                  {v.url ? (
                    <>
                      {/* Prefer inline playback. YouTube -> iframe, MP4 -> HTML5 video, otherwise external link */}
                      {/youtube\.com|youtu\.be/.test(String(v.url)) ? (
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-green-700 hover:underline"
                        >
                          Watch on YouTube →
                        </a>
                      ) : (/\.mp4($|\?)/i.test(String(v.url)) ? (
                        <div className="w-full rounded overflow-hidden">
                          <video
                            src={v.url}
                            controls
                            playsInline
                            className="w-full h-auto bg-black rounded"
                          />
                        </div>
                      ) : (
                        <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                          Watch video →
                        </a>
                      ))}
                    </>
                  ) : (
                    <p className="text-gray-600">Video link not available</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Short Reels</h3>
          {reels.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-4 text-gray-600">No reels available. Click Load to fetch.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reels.map((r, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-3 border">
                  <p className="font-semibold mb-2">{r.title || "Reel"}</p>
                  {r.url ? (
                    /\.mp4($|\?)/i.test(String(r.url)) ? (
                      <div className="rounded overflow-hidden">
                        <video
                          src={r.url}
                          poster={r.poster}
                          controls
                          playsInline
                          className="w-full h-64 object-cover bg-black rounded"
                        />
                      </div>
                    ) : (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-700 hover:underline"
                      >
                        Watch video →
                      </a>
                    )
                  ) : (
                    <p className="text-gray-600">Reel link not available</p>
                  )}
                  <p className="text-xs text-gray-600 mt-2">{r.duration ? `Duration: ${r.duration}` : ""}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {techs.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold mb-3">Technologies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {techs.map((t, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4 border">
                  <h4 className="font-semibold mb-1">{t.name}</h4>
                  {t.benefits && <p className="text-gray-700 mb-1"><strong>Benefits:</strong> {t.benefits}</p>}
                  {t.cost && <p className="text-gray-700 mb-1"><strong>Cost:</strong> {t.cost}</p>}
                  {t.subsidy && <p className="text-gray-700"><strong>Subsidy:</strong> {t.subsidy}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
