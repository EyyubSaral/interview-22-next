import { useEffect, useState } from "react";

export default function App() {
  return <Timers />;
}

const Timers = () => {
  // KODUNUZ BURAYA GELECEK
  const [input, setInput] = useState("");
  const [timers, setTimers] = useState([]);

  // Yeni zamanlayıcı ekleme
  const addTimer = () => {
    const seconds = parseInt(input);
    if (isNaN(seconds) || seconds <= 0) return;
    const id = Date.now(); // eşsiz ID
    setTimers((prev) => [...prev, { id, remaining: seconds }]);
    setInput("");
  };

  // Zamanlayıcıları her saniye azalt
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev
          .map((timer) => ({
            ...timer,
            remaining: timer.remaining - 1,
          }))
          .filter((timer) => timer.remaining > 0)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="w-full flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <input
            type="number"
            className="border px-4 py-2 rounded text-center"
            placeholder="Saniye gir"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={addTimer}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Timer
          </button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mt-6">
          {timers.map((timer) => (
            <div
              key={timer.id}
              className="bg-white border rounded shadow px-6 py-4 text-lg font-semibold text-gray-700"
            >
              {timer.remaining}s
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
