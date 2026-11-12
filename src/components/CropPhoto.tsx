import React from "react";
import { SHEETS, SheetKey } from "../data/kolibrieData";

interface CropPhotoProps {
  crop: string;
  alt: string;
  className?: string;
}

export const CropPhoto: React.FC<CropPhotoProps> = ({ crop, alt, className = "" }) => {
  const [sheetKey, cellStr] = crop.split(":") as [SheetKey, string];
  const sheet = SHEETS[sheetKey];
  const cellIndex = Number(cellStr) || 0;
  const raw = sheet.cells[cellIndex];

  const cx = raw[0] + 4;
  const cy = raw[1] + 4;
  const cw = raw[2] - 8;
  const ch = raw[3] - 8;
  const ar = cw / ch;

  return (
    <div className={`crop ${className}`.trim()} data-crop={crop}>
      <div
        className="cell"
        style={{ ["--ar" as string]: ar } as React.CSSProperties}
      >
        <img
          src={sheet.url}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          style={{
            width: `${(sheet.width / cw) * 100}%`,
            height: `${(sheet.height / ch) * 100}%`,
            left: `${(-cx / cw) * 100}%`,
            top: `${(-cy / ch) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};
