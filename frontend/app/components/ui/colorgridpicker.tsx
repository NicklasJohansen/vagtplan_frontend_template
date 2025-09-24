import { useEffect, useState } from "react";

const ALL_COLORS: string[][] = [
  // Reds / Oranges
  ["#EB1313", "#EB3E13", "#EB6913", "#EB9513", "#EBC013", "#EBEB13"],
  // Yellow-Greens
  ["#C0EB13", "#95EB13", "#69EB13", "#3EEB13", "#13EB13", "#13EB3E"],
  // Greens / Teals
  ["#13EB69", "#13EB95", "#13EBC0", "#13EBEB", "#13C0EB", "#1395EB"],
  // Blues
  ["#1369EB", "#133EEB", "#1313EB", "#3E13EB", "#6913EB", "#9513EB"],
  // Purples / Magentas
  ["#C013EB", "#EB13EB", "#EB13C0", "#EB1395", "#EB1369", "#EB133E"],
];

type RecentColorsProps = {
  value: string | undefined;
  onChange: (color: string) => void;
};

export function ColorPickerWithRecent({ value, onChange }: RecentColorsProps) {
  const [recent, setRecent] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("recentColors");
    if (stored) {
      setRecent(JSON.parse(stored));
    }
  }, []);

  const handleSelect = (color: string) => {

    onChange(color);

    // Update recent colors array
    const updated = [color, ...recent.filter((c) => c !== color)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentColors", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* valgt farve */}

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium"text-sm>Farve for afsnit:</span>
        <div
          className="w-8 h-8 border rounded"
          style={{ backgroundColor: value || "#EB1313" }}
        />
      </div>
      {/* vis alle farver */}
      {/* <button
        type="button"
        className="text-sm text-blue-600 underline mr-auto mt-2 cursor-pointer"
        onClick={() => setShowAll((s) => !s)}
      >
        {showAll ? "Skjul farver" : "Vælg farve"}
      </button> */}

      <div className="mt-2">
          {ALL_COLORS.map((row, rowindex) => (
            <div key={rowindex} className="flex gap-2 mb-2">
              {row.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded border-2 ${value === color ? "border-black" : "border-transparent"
                    }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleSelect(color)}
                />
              ))}
            </div>
          ))}
        </div>

    
      {/* {showAll && (
        <div className="mt-2">
          {ALL_COLORS.map((row, rowindex) => (
            <div key={rowindex} className="flex gap-2 mb-2">
              {row.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded border-2 ${value === color ? "border-black" : "border-transparent"
                    }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleSelect(color)}
                />
              ))}
            </div>
          ))}
        </div>
      )} */}


      {/* senest brugt  */}
      {/* {recent.length > 0 && (
        <div>
          <span className="text-sm">Senest brugt:</span>
          <div className="flex gap-2 mt-1">
            {recent.map((color) => (
              <button
                type="button"
                key={color}
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: color }}
                onClick={() => handleSelect(color)}
              />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
