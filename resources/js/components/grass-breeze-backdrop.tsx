import React from 'react';

interface GrassBreezeBackdropProps {
    className?: string;
}

/**
 * GrassBreezeBackdrop
 * 
 * Pure vector SVG tropical wild savanna grass, ilalang, and reeds
 * anchored along the bottom and outer edges of the green footer.
 * Features organic wind-breeze waving animations with cleanly anchored roots.
 */
export default function GrassBreezeBackdrop({ className = '' }: GrassBreezeBackdropProps) {
    return (
        <div
            className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
            aria-hidden="true"
        >
            {/* =========================================================================
                1. CONTINUOUS BOTTOM BASELINE SOD & NATURAL TERRAIN RIDGES
                Layered organic mounds with roots deeply anchored down to y=90
                ========================================================================= */}
            <div className="absolute inset-x-0 bottom-0 h-[60px] sm:h-[80px] opacity-95">
                <svg
                    viewBox="0 0 1440 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="grassBottomGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#01240e" />
                            <stop offset="60%" stopColor="#023a17" />
                            <stop offset="100%" stopColor="#045624" />
                        </linearGradient>

                        <linearGradient id="grassBackMoundGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#011b0b" />
                            <stop offset="100%" stopColor="#02411a" />
                        </linearGradient>
                    </defs>

                    {/* Background Ridge Silhouette for depth */}
                    <path
                        d="M0 90 L1440 90 L1440 56 Q1320 44 1200 52 Q1080 60 960 48 Q840 40 720 50 Q600 60 480 46 Q360 38 240 50 Q120 58 0 54 Z"
                        fill="url(#grassBackMoundGrad)"
                        opacity="0.55"
                    />

                    {/* Left Flank Anchored Grass Tufts (Roots at y=90, deeply buried behind front mound) */}
                    <g
                        className="animate-grass-1"
                        style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
                        opacity="0.85"
                    >
                        <path
                            d="M50 90 L56 46 Q64 28 80 22 Q72 42 66 90 Z M120 90 L128 42 Q138 24 155 18 Q145 40 138 90 Z M200 90 L208 48 Q218 32 235 26 Q225 46 218 90 Z"
                            fill="#03481e"
                        />
                    </g>
                    <g
                        className="animate-grass-2"
                        style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
                        opacity="0.9"
                    >
                        <path
                            d="M80 90 L88 48 Q98 30 115 25 Q105 45 98 90 Z M160 90 L168 46 Q178 30 195 24 Q186 46 178 90 Z"
                            fill="#023616"
                        />
                    </g>

                    {/* Right Flank Anchored Grass Tufts (Roots at y=90, deeply buried behind front mound) */}
                    <g
                        className="animate-grass-1"
                        style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
                        opacity="0.85"
                    >
                        <path
                            d="M1240 90 L1248 48 Q1258 30 1275 25 Q1266 46 1258 90 Z M1320 90 L1328 44 Q1338 26 1355 20 Q1346 42 1338 90 Z M1390 90 L1396 46 Q1404 30 1420 24 Q1412 44 1406 90 Z"
                            fill="#03481e"
                        />
                    </g>
                    <g
                        className="animate-grass-2"
                        style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
                        opacity="0.9"
                    >
                        <path
                            d="M1280 90 L1288 46 Q1298 28 1315 22 Q1305 44 1298 90 Z M1360 90 L1366 48 Q1374 32 1390 26 Q1382 46 1376 90 Z"
                            fill="#023616"
                        />
                    </g>

                    {/* Foreground Rolling Sod Mound Silhouette (Drawn over tuft roots for clean seamless horizon) */}
                    <path
                        d="M0 90 L1440 90 L1440 50 Q1360 42 1280 48 Q1200 56 1120 45 Q1040 38 960 48 Q880 58 800 46 Q720 38 640 50 Q560 60 480 44 Q400 36 320 48 Q240 58 160 45 Q80 38 0 52 Z"
                        fill="url(#grassBottomGrad)"
                    />

                    {/* Subtle Horizon Crest Highlight */}
                    <path
                        d="M0 52 Q80 38 160 45 Q240 58 320 48 Q400 36 480 44 Q560 60 640 50 Q720 38 800 46 Q880 58 960 48 Q1040 38 1120 45 Q1200 56 1280 48 Q1360 42 1440 50"
                        stroke="#067838"
                        strokeWidth="1.2"
                        strokeOpacity="0.4"
                        fill="none"
                    />
                </svg>
            </div>

            {/* =========================================================================
                2. LEFT MEADOW REEDS & ILALANG CLUSTER (Lush Corner Accent)
                Firmly anchored at bottom-left corner with local fill-box transform origin
                ========================================================================= */}
            <div className="absolute left-0 bottom-0 w-[140px] sm:w-[190px] md:w-[240px] lg:w-[290px] h-[140px] sm:h-[180px] md:h-[210px] opacity-90 transition-opacity">
                <svg
                    viewBox="0 0 320 240"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    preserveAspectRatio="xMinYMax meet"
                >
                    {/* Layer 1: Background Misty Reeds */}
                    <g
                        className="animate-grass-3"
                        style={{ transformBox: 'fill-box', transformOrigin: 'bottom left' }}
                        opacity="0.5"
                    >
                        {/* Tall Reeds / Ilalang */}
                        <path
                            d="M10 240 Q30 140 70 60 Q55 130 35 240 Z"
                            fill="#066d34"
                        />
                        <path
                            d="M30 240 Q60 130 115 50 Q95 125 65 240 Z"
                            fill="#066d34"
                        />
                        <path
                            d="M60 240 Q105 135 175 65 Q145 135 105 240 Z"
                            fill="#066d34"
                        />
                        {/* Reed Fluff Seed-Heads */}
                        <ellipse cx="70" cy="58" rx="5" ry="16" fill="#088440" transform="rotate(22 70 58)" />
                        <ellipse cx="115" cy="48" rx="5.5" ry="18" fill="#088440" transform="rotate(32 115 48)" />
                        <ellipse cx="175" cy="64" rx="5" ry="16" fill="#088440" transform="rotate(45 175 64)" />
                    </g>

                    {/* Layer 2: Midground Arched Savanna Grass Blades */}
                    <g
                        className="animate-grass-1"
                        style={{ transformBox: 'fill-box', transformOrigin: 'bottom left' }}
                        opacity="0.8"
                    >
                        {/* Leftward arching wild grass */}
                        <path
                            d="M0 240 Q25 150 90 95 Q65 160 25 240 Z"
                            fill="#045627"
                        />
                        <path
                            d="M20 240 Q60 145 145 90 Q110 160 55 240 Z"
                            fill="#03481f"
                        />
                        <path
                            d="M45 240 Q95 150 195 105 Q150 168 85 240 Z"
                            fill="#045627"
                        />
                        {/* Seed heads */}
                        <ellipse cx="90" cy="93" rx="4.5" ry="14" fill="#067837" transform="rotate(35 90 93)" />
                        <ellipse cx="145" cy="88" rx="4.5" ry="15" fill="#067837" transform="rotate(42 145 88)" />
                        <ellipse cx="195" cy="103" rx="4" ry="14" fill="#067837" transform="rotate(52 195 103)" />
                    </g>

                    {/* Layer 3: Foreground Crisp Dark Emerald Grass Tufts */}
                    <g
                        className="animate-grass-2"
                        style={{ transformBox: 'fill-box', transformOrigin: 'bottom left' }}
                        opacity="0.95"
                    >
                        <path
                            d="M0 240 Q15 165 55 120 Q35 175 10 240 Z"
                            fill="#01240e"
                        />
                        <path
                            d="M15 240 Q45 160 105 130 Q75 180 35 240 Z"
                            fill="#023717"
                        />
                        <path
                            d="M35 240 Q75 165 155 145 Q115 190 60 240 Z"
                            fill="#01240e"
                        />
                        <path
                            d="M50 240 Q105 170 215 160 Q155 200 80 240 Z"
                            fill="#023717"
                        />
                        <path
                            d="M70 240 Q135 185 250 185 Q185 215 110 240 Z"
                            fill="#01240e"
                        />
                    </g>

                    {/* Layer 4: Wild Pakis/Fern Frond Accent */}
                    <g
                        className="animate-grass-4"
                        style={{ transformBox: 'fill-box', transformOrigin: 'bottom left' }}
                        opacity="0.9"
                    >
                        <path
                            d="M0 240 Q40 180 95 165 Q65 200 20 240 Z"
                            stroke="#044d23"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <path
                            d="M25 210 L30 195 M45 195 L52 182 M65 184 L74 172 M85 174 L92 165"
                            stroke="#066d33"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    </g>
                </svg>
            </div>

            {/* =========================================================================
                3. RIGHT MEADOW REEDS & ILALANG CLUSTER (Mirrored Corner Accent)
                Firmly anchored at bottom-right corner with local fill-box transform origin
                ========================================================================= */}
            <div className="absolute right-0 bottom-0 w-[140px] sm:w-[190px] md:w-[240px] lg:w-[290px] h-[140px] sm:h-[180px] md:h-[210px] opacity-90 transition-opacity">
                <svg
                    viewBox="0 0 320 240"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    preserveAspectRatio="xMaxYMax meet"
                >
                    {/* Layer 1: Background Misty Reeds */}
                    <g
                        className="animate-grass-3"
                        style={{ transformBox: 'fill-box', transformOrigin: 'bottom right' }}
                        opacity="0.5"
                    >
                        <path
                            d="M310 240 Q290 140 250 60 Q265 130 285 240 Z"
                            fill="#066d34"
                        />
                        <path
                            d="M290 240 Q260 130 205 50 Q225 125 255 240 Z"
                            fill="#066d34"
                        />
                        <path
                            d="M260 240 Q215 135 145 65 Q175 135 215 240 Z"
                            fill="#066d34"
                        />
                        {/* Reed Fluff Seed-Heads */}
                        <ellipse cx="250" cy="58" rx="5" ry="16" fill="#088440" transform="rotate(-22 250 58)" />
                        <ellipse cx="205" cy="48" rx="5.5" ry="18" fill="#088440" transform="rotate(-32 205 48)" />
                        <ellipse cx="145" cy="64" rx="5" ry="16" fill="#088440" transform="rotate(-45 145 64)" />
                    </g>

                    {/* Layer 2: Midground Savanna Grass Blades */}
                    <g
                        className="animate-grass-1"
                        style={{ transformBox: 'fill-box', transformOrigin: 'bottom right' }}
                        opacity="0.8"
                    >
                        <path
                            d="M320 240 Q295 150 230 95 Q255 160 295 240 Z"
                            fill="#045627"
                        />
                        <path
                            d="M300 240 Q260 145 175 90 Q210 160 265 240 Z"
                            fill="#03481f"
                        />
                        <path
                            d="M275 240 Q225 150 125 105 Q170 168 235 240 Z"
                            fill="#045627"
                        />
                        {/* Seed heads */}
                        <ellipse cx="230" cy="93" rx="4.5" ry="14" fill="#067837" transform="rotate(-35 230 93)" />
                        <ellipse cx="175" cy="88" rx="4.5" ry="15" fill="#067837" transform="rotate(-42 175 88)" />
                        <ellipse cx="125" cy="103" rx="4" ry="14" fill="#067837" transform="rotate(-52 125 103)" />
                    </g>

                    {/* Layer 3: Foreground Crisp Dark Emerald Grass Tufts */}
                    <g
                        className="animate-grass-2"
                        style={{ transformBox: 'fill-box', transformOrigin: 'bottom right' }}
                        opacity="0.95"
                    >
                        <path
                            d="M320 240 Q305 165 265 120 Q285 175 310 240 Z"
                            fill="#01240e"
                        />
                        <path
                            d="M305 240 Q275 160 215 130 Q245 180 285 240 Z"
                            fill="#023717"
                        />
                        <path
                            d="M285 240 Q245 165 165 145 Q205 190 260 240 Z"
                            fill="#01240e"
                        />
                        <path
                            d="M270 240 Q215 170 105 160 Q165 200 240 240 Z"
                            fill="#023717"
                        />
                        <path
                            d="M250 240 Q185 185 70 185 Q135 215 210 240 Z"
                            fill="#01240e"
                        />
                    </g>

                    {/* Layer 4: Wild Pakis/Fern Frond Accent */}
                    <g
                        className="animate-grass-4"
                        style={{ transformBox: 'fill-box', transformOrigin: 'bottom right' }}
                        opacity="0.9"
                    >
                        <path
                            d="M320 240 Q280 180 225 165 Q255 200 300 240 Z"
                            stroke="#044d23"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            fill="none"
                        />
                        <path
                            d="M295 210 L290 195 M275 195 L268 182 M255 184 L246 172 M235 174 L228 165"
                            stroke="#066d33"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    </g>
                </svg>
            </div>

            {/* =========================================================================
                4. FLOATING WIND DRIFT PARTICLES (Pollen / Grass Seed Tufts)
                ========================================================================= */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-[8%] bottom-[35%] animate-floating-leaf-1">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="3" fill="#045624" opacity="0.6" />
                        <path d="M8 2 L8 14 M2 8 L14 8 M4 4 L12 12 M4 12 L12 4" stroke="#087839" strokeWidth="0.8" opacity="0.5" />
                    </svg>
                </div>

                <div className="absolute right-[12%] bottom-[40%] animate-floating-leaf-2">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="2.5" fill="#045624" opacity="0.6" />
                        <path d="M8 3 L8 13 M3 8 L13 8 M5 5 L11 11 M5 11 L11 5" stroke="#087839" strokeWidth="0.7" opacity="0.5" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
