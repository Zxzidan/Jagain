import React from 'react';

interface ForestBreezeBackdropProps {
    className?: string;
    variant?: string;
}

/**
 * ForestBreezeBackdrop
 * 
 * Handcrafted pure vector SVG Kalimantan rainforest trees for the Hero section:
 * - Left Tree: Pohon Beringin/Gaharu Kalimantan (shorter, layered horizontal foliage tiers, buttress roots & hanging lianas).
 * - Right Tree: Pohon Tualang / Kayu Raja (much taller emergent giant with towering slender trunk & high majestic umbrella canopy).
 * - Organic wind breeze animations with floating leaf drift.
 */
export default function ForestBreezeBackdrop({ className = '' }: ForestBreezeBackdropProps) {
    return (
        <div
            className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
            aria-hidden="true"
        >
            {/* =========================================================================
                LEFT TREE: POHON BERINGIN / GAHARU RIMBUN (LEBIH RENDAH & MELEBAR)
                Stature: ~60-65% height, layered horizontal shelves, buttress root base, hanging vines
                ========================================================================= */}
            <div
                className="absolute left-0 bottom-0 h-[68%] max-h-[540px] sm:max-h-[580px] w-[150px] sm:w-[210px] md:w-[280px] lg:w-[350px] xl:w-[400px] opacity-90 transition-opacity duration-300"
            >
                <svg
                    viewBox="0 0 380 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    preserveAspectRatio="xMinYMax meet"
                >
                    <defs>
                        <linearGradient id="banyanTrunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#01240f" />
                            <stop offset="50%" stopColor="#03481f" />
                            <stop offset="100%" stopColor="#01240f" />
                        </linearGradient>

                        <linearGradient id="leafShelfGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#045624" />
                            <stop offset="70%" stopColor="#023717" />
                            <stop offset="100%" stopColor="#01210d" />
                        </linearGradient>

                        <linearGradient id="leafShelfGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#067032" />
                            <stop offset="60%" stopColor="#03461e" />
                            <stop offset="100%" stopColor="#01240f" />
                        </linearGradient>
                    </defs>

                    {/* LAYER 1: MISTY BACKGROUND FOLIAGE TIER */}
                    <g className="animate-tree-bg-left" opacity="0.45">
                        {/* Upper background leaf tier */}
                        <path
                            d="M0 240 Q40 180 110 160 Q170 145 220 170 Q240 180 250 195 Q230 215 190 220 Q130 230 70 250 L0 270 Z"
                            fill="#066d34"
                        />
                        <path
                            d="M20 180 Q80 110 160 100 Q210 95 245 125 Q230 145 190 150 Q130 155 60 185 Z"
                            fill="#055b2b"
                        />
                    </g>

                    {/* LAYER 2: MIDGROUND BOTANICAL TIERS */}
                    <g className="animate-tree-left" opacity="0.8">
                        {/* Mid-tier foliage shelf */}
                        <g className="animate-branch-1 origin-[90px_260px]">
                            <path
                                d="M80 265 Q135 240 210 235 Q260 230 295 255 Q285 275 245 285 Q180 295 110 290 Z"
                                fill="url(#leafShelfGrad1)"
                            />
                            {/* Jagged botanical leaf fringe */}
                            <path
                                d="M120 250 Q150 225 185 235 M190 232 Q230 225 270 245 M265 252 Q285 250 292 262"
                                stroke="#088440"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                fill="none"
                                opacity="0.5"
                            />
                        </g>

                        {/* Lower-tier horizontal bough */}
                        <g className="animate-branch-3 origin-[70px_340px]">
                            <path
                                d="M50 350 Q120 320 205 325 Q260 330 280 355 Q250 375 180 380 Q110 385 55 375 Z"
                                fill="url(#leafShelfGrad1)"
                            />
                            <path
                                d="M90 335 Q140 315 195 325 M200 324 Q240 325 275 345"
                                stroke="#088440"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                fill="none"
                                opacity="0.4"
                            />
                        </g>
                    </g>

                    {/* LAYER 3: FOREGROUND STRANGLER FIG / BANYAN TRUNK & BUTTRESS ROOTS */}
                    <g className="animate-tree-left" opacity="0.98">
                        {/* Massive Buttress Trunk (Akar Banir Berpilin) */}
                        <path
                            d="M0 500 L135 500 C120 475 95 440 85 390 C78 340 82 280 75 220 C70 170 82 135 105 90 L88 85 C65 130 52 170 58 230 C64 290 60 350 70 400 C78 440 98 475 110 500 L0 500 Z"
                            fill="url(#banyanTrunkGrad)"
                        />

                        {/* Buttress root flare lines */}
                        <path
                            d="M0 480 Q45 440 62 380 Q72 310 68 240 Q65 170 85 110"
                            stroke="#045625"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.6"
                        />
                        <path
                            d="M35 500 Q65 450 74 395 Q82 330 76 260"
                            stroke="#01240e"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.7"
                        />
                        <path
                            d="M80 500 Q95 465 90 420 Q85 365 82 300"
                            stroke="#067838"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.5"
                        />

                        {/* Top Crown Shelf (Lower Stature ~300px down) */}
                        <g className="animate-branch-2 origin-[105px_90px]">
                            {/* Main upper bough */}
                            <path
                                d="M85 100 Q145 75 210 70 Q270 65 315 95 Q300 120 250 135 Q180 145 100 120 Z"
                                fill="url(#leafShelfGrad2)"
                            />
                            {/* Layered leaf crest */}
                            <path
                                d="M110 82 Q160 55 220 50 Q280 48 330 75 Q345 92 335 110 Q290 125 220 120 Q150 115 95 95 Z"
                                fill="#045624"
                            />
                            {/* Leaf contour fringes */}
                            <path
                                d="M130 65 Q180 45 240 46 M245 46 Q290 48 325 68"
                                stroke="#10e57a"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                fill="none"
                                opacity="0.45"
                            />
                            {/* Botanical leaf lobes */}
                            <ellipse cx="170" cy="70" rx="22" ry="14" fill="#03451e" transform="rotate(-12 170 70)" />
                            <ellipse cx="230" cy="65" rx="26" ry="16" fill="#03451e" transform="rotate(8 230 65)" />
                            <ellipse cx="290" cy="85" rx="24" ry="15" fill="#03451e" transform="rotate(22 290 85)" />
                        </g>

                        {/* Dangling Aerial Vine Lianas (Akar Gantung Berayun) */}
                        <g className="animate-vine-1 origin-[145px_130px]">
                            <path
                                d="M145 130 Q135 200 150 270 Q160 340 142 410 Q130 460 138 495"
                                stroke="#044d21"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                fill="none"
                            />
                            <ellipse cx="140" cy="210" rx="4" ry="7" fill="#088440" transform="rotate(-20 140 210)" />
                            <ellipse cx="152" cy="285" rx="4" ry="7" fill="#088440" transform="rotate(25 152 285)" />
                            <ellipse cx="146" cy="360" rx="3.5" ry="6" fill="#088440" transform="rotate(-15 146 360)" />
                        </g>

                        <g className="animate-vine-2 origin-[220px_130px]">
                            <path
                                d="M220 130 Q205 195 218 260 Q228 320 210 380 Q198 430 205 470"
                                stroke="#033d1a"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                fill="none"
                            />
                            <ellipse cx="212" cy="190" rx="3.5" ry="6.5" fill="#067838" transform="rotate(18 212 190)" />
                            <ellipse cx="222" cy="270" rx="3.5" ry="6.5" fill="#067838" transform="rotate(-25 222 270)" />
                            <ellipse cx="208" cy="350" rx="3" ry="5.5" fill="#067838" transform="rotate(15 208 350)" />
                        </g>

                        {/* Undergrowth Wild Ferns (Pakis Sarang Burung / Paku Harimau) */}
                        <g opacity="0.95">
                            <path
                                d="M0 495 Q40 440 95 425 Q135 420 165 435"
                                stroke="#01240e"
                                strokeWidth="4"
                                strokeLinecap="round"
                                fill="none"
                            />
                            <path
                                d="M25 465 L20 445 M45 450 L42 430 M68 440 L68 418 M90 435 L94 412 M112 432 L120 410 M132 432 L142 414 M148 435 L158 420"
                                stroke="#055b2a"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <path
                                d="M0 500 L160 500 C145 485 130 478 110 475 C90 472 75 480 60 475 C45 470 30 482 0 485 Z"
                                fill="#01240e"
                            />
                        </g>
                    </g>
                </svg>
            </div>

            {/* =========================================================================
                RIGHT TREE: POHON TUALANG / KAYU RAJA (LEBIH TINGGI MENJULANG TINGGI)
                Stature: ~95% height, massive emergent columnar trunk, high umbrella canopy in the sky
                ========================================================================= */}
            <div
                className="absolute right-0 bottom-0 h-[96%] max-h-[750px] sm:max-h-[840px] lg:max-h-[920px] w-[160px] sm:w-[230px] md:w-[310px] lg:w-[390px] xl:w-[450px] opacity-92 transition-opacity duration-300"
            >
                <svg
                    viewBox="0 0 420 700"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    preserveAspectRatio="xMaxYMax meet"
                >
                    <defs>
                        <linearGradient id="tualangTrunkGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#01230e" />
                            <stop offset="45%" stopColor="#03481f" />
                            <stop offset="100%" stopColor="#01230e" />
                        </linearGradient>

                        <linearGradient id="tualangCanopyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                            <stop offset="0%" stopColor="#067838" />
                            <stop offset="50%" stopColor="#034a20" />
                            <stop offset="100%" stopColor="#01240e" />
                        </linearGradient>
                    </defs>

                    {/* LAYER 1: MISTY BACKGROUND EMERGENT CROWN */}
                    <g className="animate-tree-bg-right" opacity="0.45">
                        {/* High misty umbrella crown */}
                        <path
                            d="M420 180 Q350 90 260 85 Q170 80 100 130 Q120 170 190 180 Q290 195 420 230 Z"
                            fill="#066d34"
                        />
                        <path
                            d="M380 120 Q310 40 210 35 Q130 30 70 80 Q100 120 170 125 Q260 130 360 150 Z"
                            fill="#055b2b"
                        />
                    </g>

                    {/* LAYER 2: MIDGROUND BOTANICAL UMBRELLA BRANCHES */}
                    <g className="animate-tree-right" opacity="0.8">
                        {/* High branching boughs spreading leftward */}
                        <g className="animate-branch-2 origin-[310px_230px]">
                            {/* Branching limbs */}
                            <path
                                d="M305 240 Q240 215 170 190 Q110 170 60 185 L56 195 Q115 182 175 202 Q245 228 300 252 Z"
                                fill="#01240e"
                            />
                            {/* Leftmost umbrella leaf crest */}
                            <path
                                d="M120 185 Q75 140 25 155 Q5 180 30 205 Q75 215 125 200 Z"
                                fill="url(#tualangCanopyGrad)"
                            />
                            <path
                                d="M40 160 Q75 150 115 170"
                                stroke="#10e57a"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                fill="none"
                                opacity="0.4"
                            />
                        </g>

                        <g className="animate-branch-3 origin-[330px_320px]">
                            {/* Lower secondary branch */}
                            <path
                                d="M330 325 Q270 310 210 315 Q160 320 125 340 L122 350 Q162 332 215 328 Q275 324 325 340 Z"
                                fill="#01240e"
                            />
                            <path
                                d="M190 320 Q145 285 95 305 Q75 330 100 350 Q145 355 195 335 Z"
                                fill="url(#tualangCanopyGrad)"
                            />
                        </g>
                    </g>

                    {/* LAYER 3: FOREGROUND TALL COLUMNAR TRUNK & GIANT CANOPY */}
                    <g className="animate-tree-right" opacity="0.98">
                        {/* Tall Majestic Columnar Trunk (Menjulang Tinggi) */}
                        <path
                            d="M420 700 L275 700 C290 660 305 600 312 510 C320 420 322 330 318 240 C315 180 320 135 340 70 L358 66 C338 130 332 180 336 240 C340 330 338 420 330 510 C322 600 308 660 295 700 L420 700 Z"
                            fill="url(#tualangTrunkGrad)"
                        />

                        {/* Bark vertical striations showing grand scale */}
                        <path
                            d="M410 700 Q365 640 348 540 Q335 430 334 320 Q332 210 348 100"
                            stroke="#067838"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.55"
                        />
                        <path
                            d="M375 700 Q342 630 330 520 Q322 410 326 290 Q328 190 342 90"
                            stroke="#01210d"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.75"
                        />

                        {/* GIANT HIGH UMBRELLA CANOPY (Puncak Tajuk Tertinggi Di Langit) */}
                        <g className="animate-branch-1 origin-[340px_70px]">
                            {/* Main High Crown Arching across upper boundary */}
                            <path
                                d="M340 85 Q260 20 170 25 Q90 30 35 75 Q20 105 50 125 Q120 135 220 115 Q300 95 350 105 Z"
                                fill="url(#tualangCanopyGrad)"
                            />

                            {/* Upper emergent dome */}
                            <path
                                d="M370 70 Q300 5 210 8 Q130 12 75 48 Q95 80 170 85 Q260 85 345 90 Z"
                                fill="#045624"
                            />

                            {/* Botanical leaf pinnate ridges */}
                            <path
                                d="M280 18 Q200 18 130 40 M195 20 Q120 40 70 70 M330 25 Q270 12 210 18"
                                stroke="#10e57a"
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="none"
                                opacity="0.45"
                            />

                            {/* Foliage lobes */}
                            <ellipse cx="230" cy="45" rx="36" ry="20" fill="#023415" transform="rotate(-6 230 45)" />
                            <ellipse cx="140" cy="65" rx="32" ry="18" fill="#023415" transform="rotate(-16 140 65)" />
                            <ellipse cx="295" cy="55" rx="34" ry="19" fill="#023415" transform="rotate(12 295 55)" />
                            <ellipse cx="80" cy="90" rx="26" ry="16" fill="#023415" transform="rotate(-24 80 90)" />
                        </g>

                        {/* Companion Rainforest Sapling at Base (Anakan Pohon Hutan) */}
                        <g opacity="0.9">
                            <path
                                d="M260 700 Q240 620 215 560 L208 565 Q232 622 250 700 Z"
                                fill="#023717"
                            />
                            {/* Sapling palm/leaf fan */}
                            <path
                                d="M210 560 Q175 515 130 535 Q120 560 150 575 Q185 580 215 568 Z"
                                fill="#045624"
                            />
                            <path
                                d="M215 560 Q200 500 165 485 Q145 505 168 535 Z"
                                fill="#056b2f"
                            />
                        </g>

                        {/* Forest Floor Base Mound and Pakis */}
                        <g opacity="0.95">
                            <path
                                d="M420 690 Q360 635 290 625 Q230 620 180 645"
                                stroke="#01240e"
                                strokeWidth="4"
                                strokeLinecap="round"
                                fill="none"
                            />
                            <path
                                d="M375 660 L382 640 M345 645 L352 625 M315 638 L318 615 M285 632 L280 610 M255 630 L245 608 M225 635 L215 615"
                                stroke="#055b2a"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <path
                                d="M420 700 L180 700 C200 685 225 678 255 675 C285 672 315 682 345 675 C375 670 400 685 420 690 Z"
                                fill="#01240e"
                            />
                        </g>
                    </g>
                </svg>
            </div>

            {/* =========================================================================
                FLOATING WIND DRIFT PARTICLES (Canopy Leaves in Breeze)
                ========================================================================= */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-[6%] top-[22%] animate-floating-leaf-1">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="rotate-12">
                        <path
                            d="M3 12C7 6 17 4 21 3C20 7 18 17 12 21C6 17 4 7 3 12Z"
                            fill="#023a17"
                            opacity="0.75"
                        />
                        <path d="M3 12C12 12 18 6 21 3" stroke="#10e57a" strokeWidth="1" opacity="0.45" />
                    </svg>
                </div>

                <div className="absolute right-[8%] top-[15%] animate-floating-leaf-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="rotate-45">
                        <path
                            d="M3 12C7 6 17 4 21 3C20 7 18 17 12 21C6 17 4 7 3 12Z"
                            fill="#03481f"
                            opacity="0.75"
                        />
                        <path d="M3 12C12 12 18 6 21 3" stroke="#10e57a" strokeWidth="0.9" opacity="0.4" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
