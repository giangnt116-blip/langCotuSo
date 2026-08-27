import React, { useState } from 'react';
import { CulturalImageAsset } from '../types';
import { FallbackIllustration } from './FallbackIllustration';
import { CheckCircle2, AlertCircle, Sparkles, ZoomIn, X } from 'lucide-react';

interface CulturalImageProps {
  asset: CulturalImageAsset;
  className?: string;
  showCaption?: boolean;
  allowZoom?: boolean;
  priority?: boolean;
}

export const CulturalImage: React.FC<CulturalImageProps> = ({
  asset,
  className = '',
  showCaption = true,
  allowZoom = true,
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(!priority);
  const [isZoomed, setIsZoomed] = useState(false);

  const focalStyle: React.CSSProperties = asset.focalPoint
    ? { objectPosition: `${asset.focalPoint.x}% ${asset.focalPoint.y}%` }
    : { objectPosition: 'center' };

  const getAspectClass = (ratio: string) => {
    switch (ratio) {
      case '16:9':
        return 'aspect-video';
      case '4:3':
        return 'aspect-[4/3]';
      case '3:2':
        return 'aspect-[3/2]';
      case '1:1':
        return 'aspect-square';
      case '4:5':
        return 'aspect-[4/5]';
      default:
        return 'aspect-video';
    }
  };

  return (
    <>
      <figure id={`cultural-figure-${asset.id}`} className={`group relative flex flex-col ${className}`}>
        <div
          className={`relative w-full overflow-hidden rounded-2xl bg-[#EFECE6] border border-[#DDD5C7] shadow-2xs ${getAspectClass(
            asset.aspectRatio
          )}`}
        >
          {/* Loading Skeleton */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 bg-[#EAE4D9] animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#B35C44]/30 border-t-[#B35C44] rounded-full animate-spin" />
            </div>
          )}

          {/* Fallback View */}
          {hasError ? (
            <FallbackIllustration type={asset.id} />
          ) : (
            <img
              src={asset.src}
              alt={asset.alt}
              referrerPolicy="no-referrer"
              loading={priority ? 'eager' : 'lazy'}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setHasError(true);
                setIsLoading(false);
              }}
              style={focalStyle}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
            />
          )}

          {/* Cultural Status & Illustration Label Badge - Mandated by Y1 & Y5 */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
            {asset.culturalStatus === 'illustration' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#2F2F2F]/75 backdrop-blur-xs text-[#FAF8F5] border border-white/20 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#E2A76F]" />
                Hình ảnh minh họa
              </span>
            )}
            {asset.culturalStatus === 'verified' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#2D4232]/85 backdrop-blur-xs text-[#FAF8F5] border border-emerald-400/30 shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                Đã kiểm chứng
              </span>
            )}
            {asset.culturalStatus === 'needsReview' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#7A4E38]/85 backdrop-blur-xs text-[#FAF8F5] border border-amber-400/30 shadow-xs">
                <AlertCircle className="w-3 h-3 text-amber-300" />
                Cần thẩm định
              </span>
            )}
          </div>

          {/* Quick Zoom Button */}
          {allowZoom && !hasError && (
            <button
              type="button"
              id={`btn-zoom-${asset.id}`}
              onClick={() => setIsZoomed(true)}
              className="absolute bottom-3 right-3 p-2 rounded-xl bg-[#2F2F2F]/65 hover:bg-[#2F2F2F]/85 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 cursor-pointer shadow-xs"
              title="Phóng to ảnh"
              aria-label="Phóng to ảnh"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Caption & Reference Credit */}
        {showCaption && (asset.caption || asset.credit) && (
          <figcaption className="mt-2 px-1 flex flex-col text-xs text-[#736B60]">
            {asset.caption && (
              <span className="font-normal leading-relaxed text-[#555047]">
                {asset.caption}
              </span>
            )}
            {asset.credit && (
              <span className="text-[11px] text-[#8C8478] mt-0.5 flex items-center gap-1">
                <span className="opacity-75">Nguồn tham chiếu:</span>
                {asset.sourceUrl ? (
                  <a
                    href={asset.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-[#B35C44] transition-colors"
                  >
                    {asset.credit}
                  </a>
                ) : (
                  <span>{asset.credit}</span>
                )}
              </span>
            )}
          </figcaption>
        )}
      </figure>

      {/* Modal Zoom View */}
      {isZoomed && (
        <div
          id="modal-image-zoom"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              id="btn-close-zoom"
              onClick={() => setIsZoomed(false)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
              aria-label="Đóng xem ảnh"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={asset.src}
              alt={asset.alt}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto rounded-lg object-contain shadow-2xl border border-white/10"
            />
            <div className="mt-3 text-center text-white/90 max-w-2xl px-4">
              <p className="text-sm font-medium">{asset.alt}</p>
              {asset.credit && (
                <p className="text-xs text-[#D4A373] mt-1">Nguồn: {asset.credit}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
