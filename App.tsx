  import React, { useEffect, useRef, useState, useCallback } from 'react';
import { sound } from './audio';
import cover1 from './WhatsApp_Image_2026-11-01_at_14.22.37_bcacd8d0.jpeg';
import cover2 from './WhatsApp_Image_2026-11-01_at_14.31.06_f52eea40.jpeg';
import cover3 from './WhatsApp_Image_2026-11-01_at_17.03.55_94a5660e.jpeg';
import cover4 from './5ed96512-26a5-4c2a-a0e0-626e663c1dc1_7eb0f921.jpeg';
import cover5 from './WhatsApp_Image_2026-11-01_at_14.38.34_deb154a4.jpeg';

// Sheets metadata for original background textures
const SHEETS = {
  covers: {
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010644_837e04ca-2418-45c1-b8e0-0233265c4cd5.png&w=1744&q=85',
    W: 1744,
    H: 2336,
  },
  spines: {
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010738_a3e47ead-18f2-4974-9468-06d16a25edc5.png&w=2688&q=85',
    W: 2688,
    H: 1152,
  },
  fix: {
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010831_3ebb874b-93dc-433e-87ed-6299aba720f0.png&w=1520&q=85',
    W: 1520,
    H: 2688,
  },
  fix2: {
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_092020_f96bc094-db7b-46de-9298-074a24e0a3b8.png&w=1520&q=85',
    W: 1520,
    H: 2688,
  },
} as const;

type SheetKey = keyof typeof SHEETS;

interface CropBox {
  sheet: SheetKey;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Film {
  id: string;
  title: string;
  subtitle: string;
  year: number | string;
  genre: string;
  minutes: number | string;
  synopsis: string;
  points?: string[];
  citation?: string;
  spineCrop?: CropBox;
  coverCrop?: CropBox;
  customCoverUrl?: string;
  customSpineBg?: string;
  accent: string;
  tiltAngle: number;
}

// Exactly 5 books on the shelf in requested order:
// 0: Unlocking High Quality Teaching (2 СЛАЙД)
// 1: Rogers және Farson 1957 Active Listening (6 СЛАЙД)
// 2: Education Endowment Foundation 2017 (7 СЛАЙД)
// 3: Working with parents to Support Childrens Learning (9 СЛАЙД)
// 4: Research Papers in Education (10 СЛАЙД)
const FILMS: Film[] = [
  {
    id: 'unlocking2025',
    title: 'Unlocking High Quality Teaching',
    subtitle: '2 СЛАЙД ПЕДАГОГИКАЛЫҚ ҚАРЫМ ҚАТЫНАС',
    year: 2025,
    genre: 'Education / Педагогика',
    minutes: 'OECD 2025',
    synopsis:
      'Тиімді қарым қатынас ақпарат алмасу өзара түсіністік және бірлескен әрекетке негізделеді',
    points: [
      'Педагогикалық қарым қатынас оқыту мен тәрбиелеудің маңызды құралы',
      'Педагог білім беріп қана қоймай оқушының белсенділігін дамытып қолайлы психологиялық орта қалыптастырады',
      'Мақсаты тиімді педагогикалық қарым қатынас негіздері мен оны орнату жолдарын көрсету',
      'Ғылыми негіз OECD 2025',
      'Педагогикалық қарым қатынас педагог пен білім алушы арасындағы кәсіби өзара әрекеттестік',
      'Коммуникативтік аспект ақпарат алмасу',
      'Интерактивтік аспект бірлескен әрекет пен ынтымақтастық',
      'Перцептивтік аспект бірін бірі түсіну және қабылдау',
    ],
    citation: 'Еңбек атауы:Unlocking High Quality Teaching',
    customCoverUrl: cover1,
    customSpineBg: 'linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 22%, #0A3254 22.5%, #0F4C81 78%, #0A3254 100%)',
    accent: '#0F4C81',
    tiltAngle: -4.2,
  },
  {
    id: 'rogers1957',
    title: 'Rogers және Farson 1957 Active Listening',
    subtitle: '6 СЛАЙД БЕЛСЕНДІ ТЫҢДАУ',
    year: 1957,
    genre: 'Psychology / Психология',
    minutes: 'Classic Paper',
    synopsis:
      'Белсенді тыңдау адамның ойын сезімін және айтқысы келген мағынасын түсінуге бағытталады',
    points: [
      'Негізгі тәсілдері нақтылау парафраз эмоцияны түсіну қорытындылау және бейвербалды қолдау',
      'Белсенді тыңдау түсінбеушілікті азайтып сенімді қарым қатынас қалыптастырады',
    ],
    citation: 'Еңбек атауы:Rogers және Farson 1957 Active Listening',
    customCoverUrl: cover2,
    customSpineBg: 'linear-gradient(to bottom, #321854 0%, #4D2D84 25%, #422472 75%, #23103D 100%)',
    accent: '#7C3AED',
    tiltAngle: -4.8,
  },
  {
    id: 'eef2017',
    title: 'Education Endowment Foundation 2017',
    subtitle: '7 СЛАЙД ДИАЛОГТІК ОҚЫТУ',
    year: 2017,
    genre: 'Education / Педагогика',
    minutes: 'Evaluation Report',
    synopsis:
      'Диалогтік оқыту педагог пен оқушының пікір алмасуы арқылы білімді бірлесіп қалыптастырады',
    points: [
      'Проблемалық және ашық сұрақтар қою пікірталас ұйымдастыру дәлел келтіру және топпен талдау негізгі әдістері',
      'EEF зерттеуінде диалогтік оқыту бағдарламасына қатысқан бастауыш сынып оқушылары ағылшын тілі мен жаратылыстанудан бақылау тобынан орта есеппен екі айлық қосымша ілгерілеу көрсеткен',
    ],
    citation: 'Еңбек атауы:Education Endowment Foundation 2017',
    customCoverUrl: cover3,
    customSpineBg: 'linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 28%, #EA580C 28.5%, #EA580C 72%, #FFFFFF 72.5%, #FFFFFF 100%)',
    accent: '#EA580C',
    tiltAngle: -5.0,
  },
  {
    id: 'parents2019',
    title: 'Working with parents to Support Childrens Learning',
    subtitle: '9 СЛАЙД КЕРІ БАЙЛАНЫС',
    year: 2019,
    genre: 'Education / Педагогика',
    minutes: 'EEF Guidance Report',
    synopsis:
      'Кері байланыс оқушының нәтижесін оқу мақсаттарымен салыстырып жетілдіру жолдарын көрсету',
    points: [
      'Негізгі кезеңдері нәтижені анықтау критериймен салыстыру түсіндіру ұсыныс беру және қайта бағалау',
      'Кері байланыс адамның жеке басын емес нақты әрекеті мен нәтижесін бағалауы керек',
    ],
    citation: 'Еңбек атауы:Working With Parents To Support Childrens Learning',
    customCoverUrl: cover4,
    customSpineBg: 'linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 22%, #0891B2 22.5%, #00838F 75%, #0891B2 75.5%, #0891B2 100%)',
    accent: '#0891B2',
    tiltAngle: -4.0,
  },
  {
    id: 'research2002',
    title: 'Research Papers in Education',
    subtitle: '10 СЛАЙД КОММУНИКАТИВТІК КЕДЕРГІЛЕР',
    year: 2002,
    genre: 'Education / Педагогика',
    minutes: 'Routledge Journal',
    synopsis:
      'Коммуникативтік кедергілер ақпаратты түсінуге және өзара байланысты қиындатады',
    points: [
      'Семантикалық кедергі терминдерді әртүрлі түсіну шешімі нақтылау',
      'Психологиялық кедергі қорқыныш пен сенімсіздік шешімі эмпатия және тыңдау',
      'Әлеуметтік мәдени кедергі құндылықтар айырмашылығы шешімі инклюзивті диалог',
      'Эмоционалдық кедергі ашу мен реніш шешімі эмоцияны реттеу',
      'Ұйымдастырушылық кедергі уақыт тапшылығы шешімі байланысты жоспарлау',
    ],
    citation: 'Еңбек атауы:Research Papers in Education',
    customCoverUrl: cover5,
    customSpineBg: 'linear-gradient(to bottom, #4A0815 0%, #7A1024 25%, #630C1D 75%, #38050E 100%)',
    accent: '#851229',
    tiltAngle: -5.0,
  },
];

// 7 Ink Bleed Blobs for authentic organic poster expansion
const BLOBS = [
  { cx: 150, cy: 330, delay: 0 },
  { cx: 340, cy: 600, delay: 120 },
  { cx: 250, cy: 120, delay: 200 },
  { cx: 90, cy: 760, delay: 280 },
  { cx: 400, cy: 250, delay: 340 },
  { cx: 260, cy: 860, delay: 400 },
  { cx: 230, cy: 470, delay: 160 },
];

function smoothstep(x: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return x * x * (3 - 2 * x);
}

function B(r: number): number {
  if (Math.abs(r) < 1) {
    return (r + Math.sin(Math.PI * r) / Math.PI) / 2;
  }
  return r >= 1 ? 0.5 : -0.5;
}

function getFaceBgStyle(film: Film): React.CSSProperties {
  if (film.customCoverUrl) {
    return {
      backgroundImage: `url('${film.customCoverUrl}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#FFFFFF',
    };
  }

  if (film.coverCrop) {
    const sheet = SHEETS[film.coverCrop.sheet];
    const crop = film.coverCrop;
    const sizeX = (sheet.W / crop.w) * 100;
    const sizeY = (sheet.H / crop.h) * 100;
    const posX = (crop.x / (sheet.W - crop.w)) * 100;
    const posY = (crop.y / (sheet.H - crop.h)) * 100;
    return {
      backgroundImage: `url('${sheet.url}')`,
      backgroundSize: `${sizeX}% ${sizeY}%`,
      backgroundPosition: `${posX}% ${posY}%`,
      backgroundRepeat: 'no-repeat',
    };
  }

  return {};
}

function getSpineBgStyle(film: Film): React.CSSProperties {
  if (film.customSpineBg) {
    return {
      background: film.customSpineBg,
    };
  }

  if (film.spineCrop) {
    const sheet = SHEETS[film.spineCrop.sheet];
    const crop = film.spineCrop;
    const sizeX = (sheet.W / crop.w) * 100;
    const sizeY = (sheet.H / crop.h) * 100;
    const posX = (crop.x / (sheet.W - crop.w)) * 100;
    const posY = (crop.y / (sheet.H - crop.h)) * 100;
    return {
      backgroundImage: `url('${sheet.url}')`,
      backgroundSize: `${sizeX}% ${sizeY}%`,
      backgroundPosition: `${posX}% ${posY}%`,
      backgroundRepeat: 'no-repeat',
    };
  }

  return {};
}

export default function App() {
  const [activeFilmIndex, setActiveFilmIndex] = useState(0); // Start on 1. Unlocking High Quality Teaching
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'spine' | 'btn' | 'open'>('default');
  const [isMuted, setIsMuted] = useState(false);
  const [timecodeDisplay, setTimecodeDisplay] = useState('00:00:00');

  // DOM Refs
  const stageRef = useRef<HTMLDivElement>(null);
  const tapeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spineShadeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coverShadeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coverRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spineSheenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const playRingRef = useRef<HTMLButtonElement>(null);
  const customCursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);

  // Caption refs for animated sliding text masks
  const titleMaskRef = useRef<HTMLDivElement>(null);
  const subtitleMaskRef = useRef<HTMLDivElement>(null);
  const yearMaskRef = useRef<HTMLDivElement>(null);

  // Detail refs
  const detailDialogRef = useRef<HTMLDivElement>(null);
  const blobCircleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const posterImgRef = useRef<SVGImageElement>(null);
  const detailMaskedLinesRef = useRef<(HTMLElement | null)[]>([]);

  // Animation & Motion State Refs (read inside rAF)
  const motionRef = useRef({
    s: 0, // Centered on 1. Unlocking High Quality Teaching (0, 1, 2, 3, 4)
    T: 0,
    hoveredIndex: -1,
    lift: [0, 0, 0, 0, 0],
    targetLift: [0, 0, 0, 0, 0],
    mx: window.innerWidth / 2,
    my: window.innerHeight / 2,
    cx: window.innerWidth / 2,
    cy: window.innerHeight / 2,
    tiltX: 0,
    tiltY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartT: 0,
    dragDistance: 0,
    wheelTimer: null as ReturnType<typeof setTimeout> | null,
    isOpen: false,
    H: 300,
    ws: 50,
    d: 158,
    gap: 9,
    activeFilm: 0,
    lastTime: performance.now(),
    inkRafId: 0,
    currentDetailAnimation: null as Animation | null,
    hasInteracted: false,
    counterTimer: null as ReturnType<typeof setInterval> | null,
  });

  // Preload sheets & uploaded book covers on mount
  useEffect(() => {
    Object.values(SHEETS).forEach((sheet) => {
      const img = new Image();
      img.src = sheet.url;
    });

    FILMS.forEach((film) => {
      if (film.customCoverUrl) {
        const img = new Image();
        img.src = film.customCoverUrl;
      }
    });

    const unlockAudio = () => {
      sound.init();
      motionRef.current.hasInteracted = true;
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  // Update geometry measurements from --H
  const updateGeometry = useCallback(() => {
    const probe = document.createElement('div');
    probe.style.height = 'var(--H)';
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    document.body.appendChild(probe);
    const H = probe.getBoundingClientRect().height || 320;
    document.body.removeChild(probe);

    const ws = (H * 142) / 840;
    const d = (H * 474) / 900;
    const gap = H * 0.03;

    motionRef.current.H = H;
    motionRef.current.ws = ws;
    motionRef.current.d = d;
    motionRef.current.gap = gap;

    if (stageRef.current) {
      stageRef.current.style.setProperty('--ws', `${ws}px`);
      stageRef.current.style.setProperty('--d', `${d}px`);
      stageRef.current.style.setProperty('--H-val', `${H}px`);
    }
  }, []);

  // Caption swap animation (sliding through mask)
  const swapCaption = useCallback((film: Film, dir: number) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const swapLine = (container: HTMLDivElement | null, newText: string, extraClasses = '') => {
      if (!container) return;
      if (prefersReducedMotion) {
        container.innerHTML = `<span class="${extraClasses} inline-block">${newText}</span>`;
        return;
      }

      const existingSpans = Array.from(container.children) as HTMLElement[];
      existingSpans.forEach((oldSpan) => {
        oldSpan.style.position = 'absolute';
        oldSpan.style.top = '0';
        oldSpan.style.left = '0';
        oldSpan.style.right = '0';
        oldSpan.animate(
          [
            { transform: 'translateY(0%)' },
            { transform: `translateY(${-dir * 105}%)` },
          ],
          {
            duration: 650,
            easing: 'cubic-bezier(.2,.8,.2,1)',
            fill: 'both',
          }
        ).onfinish = () => {
          oldSpan.remove();
        };
      });

      const newSpan = document.createElement('span');
      newSpan.className = `${extraClasses} inline-block`;
      newSpan.textContent = newText;
      container.appendChild(newSpan);

      newSpan.animate(
        [
          { transform: `translateY(${dir * 105}%)` },
          { transform: 'translateY(0%)' },
        ],
        {
          duration: 650,
          easing: 'cubic-bezier(.2,.8,.2,1)',
          fill: 'both',
        }
      );
    };

    swapLine(
      titleMaskRef.current,
      film.title,
      'font-serif text-[22px] md:text-[28px] leading-[1.15] tracking-[-0.01em]'
    );
    swapLine(
      subtitleMaskRef.current,
      film.subtitle,
      'lbl font-semibold tracking-wider text-[var(--cobalt)]'
    );
    swapLine(
      yearMaskRef.current,
      `${film.year}`,
      'font-sans font-medium text-[11px] tracking-[0.08em] text-[var(--ink)]'
    );
  }, []);

  // Open Detail View with robust paper growth and organic ink bleed
  const openDetail = useCallback(() => {
    const m = motionRef.current;
    if (m.isOpen) return;
    m.isOpen = true;
    setIsDetailOpen(true);

    sound.playOpenDetail(m.activeFilm);

    // Snap T to integer in [0, 4]
    m.T = Math.max(0, Math.min(4, Math.round(m.T)));
    m.s = m.T;

    const film = FILMS[m.activeFilm];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Restore ink mask on poster image
    posterImgRef.current?.setAttribute('mask', 'url(#poster-ink-mask)');

    // Reset ink blobs radius to 0
    blobCircleRefs.current.forEach((circle) => {
      if (circle) circle.setAttribute('r', '0');
    });

    // Tape reel counter roll animation
    const formattedDuration = typeof film.minutes === 'number' ? `0${Math.floor(film.minutes / 60)}:${film.minutes % 60 < 10 ? '0' : ''}${film.minutes % 60}:00` : '00:45:00';
    let countStep = 0;
    if (m.counterTimer) clearInterval(m.counterTimer);
    m.counterTimer = setInterval(() => {
      countStep++;
      if (countStep < 14) {
        const randH = Math.floor(Math.random() * 2);
        const randM = Math.floor(Math.random() * 59);
        const randS = Math.floor(Math.random() * 59);
        setTimecodeDisplay(
          `0${randH}:${randM < 10 ? '0' : ''}${randM}:${randS < 10 ? '0' : ''}${randS}`
        );
      } else {
        setTimecodeDisplay(formattedDuration);
        if (m.counterTimer) clearInterval(m.counterTimer);
      }
    }, 45);

    // Measure active tape's cover element rect
    const activeCoverEl = coverRefs.current[m.activeFilm];
    const rawRect = activeCoverEl?.getBoundingClientRect();
    const W = window.innerWidth;
    const H = window.innerHeight;

    const coverRect =
      rawRect && rawRect.width > 20
        ? rawRect
        : {
            top: H / 2 - m.H / 2,
            left: W / 2 - m.d / 2,
            right: W / 2 + m.d / 2,
            bottom: H / 2 + m.H / 2,
            width: m.d,
            height: m.H,
          };

    const insetTop = Math.max(0, Math.round(coverRect.top));
    const insetRight = Math.max(0, Math.round(W - coverRect.right));
    const insetBottom = Math.max(0, Math.round(H - coverRect.bottom));
    const insetLeft = Math.max(0, Math.round(coverRect.left));

    const dialog = detailDialogRef.current;
    if (dialog) {
      dialog.style.visibility = 'visible';
      dialog.style.transformOrigin = `${coverRect.left + coverRect.width / 2}px ${
        coverRect.top + coverRect.height / 2
      }px`;

      if (prefersReducedMotion) {
        dialog.style.clipPath = 'none';
        dialog.style.transform = 'none';
        blobCircleRefs.current.forEach((c) => c?.setAttribute('r', '760'));
        posterImgRef.current?.removeAttribute('mask');
      } else {
        if (m.currentDetailAnimation) {
          m.currentDetailAnimation.cancel();
        }

        m.currentDetailAnimation = dialog.animate(
          [
            {
              clipPath: `inset(${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px round 3px)`,
              transform: `rotate(${film.tiltAngle}deg)`,
            },
            {
              clipPath: 'inset(0px 0px 0px 0px round 0px)',
              transform: 'rotate(0deg)',
            },
          ],
          {
            duration: 1000,
            easing: 'cubic-bezier(.76,0,.18,1)',
            fill: 'both',
          }
        );

        m.currentDetailAnimation.onfinish = () => {
          dialog.style.clipPath = 'none';
          dialog.style.transform = 'none';
        };

        // Lines rising: slide from translateY(110%) to 0
        detailMaskedLinesRef.current.forEach((lineEl, idx) => {
          if (!lineEl) return;
          lineEl.animate(
            [
              { transform: 'translateY(110%)' },
              { transform: 'translateY(0%)' },
            ],
            {
              duration: 900,
              delay: 500 + idx * 65,
              easing: 'cubic-bezier(.2,.8,.2,1)',
              fill: 'both',
            }
          );
        });

        // Ink bleed expansion animation
        const inkStartTime = performance.now() + 450;
        cancelAnimationFrame(m.inkRafId);

        const animateInkBleed = (time: number) => {
          if (time < inkStartTime) {
            m.inkRafId = requestAnimationFrame(animateInkBleed);
            return;
          }

          const elapsed = time - inkStartTime;
          let allDone = true;

          BLOBS.forEach((blob, idx) => {
            const circle = blobCircleRefs.current[idx];
            if (!circle) return;

            const t = Math.max(0, elapsed - blob.delay);
            const p = Math.min(1, t / 1200);
            if (p < 1) allDone = false;

            const easeCubic = 1 - Math.pow(1 - p, 3);
            const radius = 760 * easeCubic;
            circle.setAttribute('r', radius.toFixed(1));
          });

          if (!allDone && elapsed < 2200) {
            m.inkRafId = requestAnimationFrame(animateInkBleed);
          } else {
            blobCircleRefs.current.forEach((c) => c?.setAttribute('r', '760'));
            posterImgRef.current?.removeAttribute('mask');
          }
        };

        m.inkRafId = requestAnimationFrame(animateInkBleed);
      }
    }
  }, []);

  // Close Detail View
  const closeDetail = useCallback(() => {
    const m = motionRef.current;
    if (!m.isOpen) return;

    sound.playCloseDetail();
    if (m.counterTimer) clearInterval(m.counterTimer);

    const dialog = detailDialogRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !dialog) {
      m.isOpen = false;
      setIsDetailOpen(false);
      if (dialog) dialog.style.visibility = 'hidden';
      return;
    }

    const film = FILMS[m.activeFilm];
    const activeCoverEl = coverRefs.current[m.activeFilm];
    const rawRect = activeCoverEl?.getBoundingClientRect();
    const W = window.innerWidth;
    const H = window.innerHeight;

    const coverRect =
      rawRect && rawRect.width > 20
        ? rawRect
        : {
            top: H / 2 - m.H / 2,
            left: W / 2 - m.d / 2,
            right: W / 2 + m.d / 2,
            bottom: H / 2 + m.H / 2,
            width: m.d,
            height: m.H,
          };

    const insetTop = Math.max(0, Math.round(coverRect.top));
    const insetRight = Math.max(0, Math.round(W - coverRect.right));
    const insetBottom = Math.max(0, Math.round(H - coverRect.bottom));
    const insetLeft = Math.max(0, Math.round(coverRect.left));

    if (m.currentDetailAnimation) {
      m.currentDetailAnimation.cancel();
    }

    const anim = dialog.animate(
      [
        {
          clipPath: 'inset(0px 0px 0px 0px round 0px)',
          transform: 'rotate(0deg)',
        },
        {
          clipPath: `inset(${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px round 3px)`,
          transform: `rotate(${film.tiltAngle}deg)`,
        },
      ],
      {
        duration: 800,
        easing: 'cubic-bezier(.76,0,.18,1)',
        fill: 'both',
      }
    );

    anim.onfinish = () => {
      dialog.style.visibility = 'hidden';
      dialog.style.clipPath = 'none';
      dialog.style.transform = 'none';
      m.isOpen = false;
      setIsDetailOpen(false);
      anim.cancel();
    };
  }, []);

  // Jump directly to film
  const jumpToFilm = useCallback((targetFilmIdx: number) => {
    const m = motionRef.current;
    m.T = Math.max(0, Math.min(4, targetFilmIdx));
    sound.playShelfSlide(1.2);
  }, []);

  // Handle arrow clicks
  const stepFilm = useCallback((step: number) => {
    const m = motionRef.current;
    m.T = Math.max(0, Math.min(4, Math.round(m.T) + step));
    sound.playShelfSlide(1);
  }, []);

  // Toggle Mute Audio
  const handleToggleSound = useCallback(() => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playFilmSignature(motionRef.current.activeFilm);
    }
  }, []);

  // Main Motion Engine (rAF loop)
  useEffect(() => {
    updateGeometry();
    window.addEventListener('resize', updateGeometry);

    let rafId = 0;
    const m = motionRef.current;

    // Initial setup for film 2: Education Endowment Foundation 2017
    const initialFilm = FILMS[2];
    swapCaption(initialFilm, 1);

    const tick = (now: number) => {
      const rawDt = (now - m.lastTime) / 1000;
      m.lastTime = now;
      const dt = Math.min(rawDt, 0.05);

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Spring physics for scroll s towards T in range [0, 4]
      const k = m.isDragging ? 18 : 5.2;
      const prevS = m.s;
      if (prefersReducedMotion) {
        m.s = m.T;
      } else {
        m.s += (m.T - m.s) * (1 - Math.exp(-k * dt));
        if (Math.abs(m.T - m.s) < 1e-4) {
          m.s = m.T;
        }
      }

      // Clamp strictly within [0, 4] (exactly 5 books!)
      m.s = Math.max(0, Math.min(4, m.s));

      // Play soft friction slide sound when scrolling rapidly
      const vel = Math.abs(m.s - prevS) / dt;
      if (vel > 0.8 && m.hasInteracted) {
        sound.playShelfSlide(Math.min(vel, 3));
      }

      // Detect active film change
      const currentActiveFilm = Math.max(0, Math.min(4, Math.round(m.s)));
      if (currentActiveFilm !== m.activeFilm) {
        const dir = m.T >= m.s ? 1 : -1;
        m.activeFilm = currentActiveFilm;
        setActiveFilmIndex(currentActiveFilm);
        const film = FILMS[currentActiveFilm];
        swapCaption(film, dir);

        if (m.hasInteracted) {
          sound.playFilmSignature(currentActiveFilm);
        }
      }

      // Geometry constants
      const W = window.innerWidth;
      const H = m.H;
      const ws = m.ws;
      const d = m.d;
      const gap = m.gap;
      const cyShelf = window.innerHeight / 2;

      // Mouse smoothing
      m.cx += (m.mx - m.cx) * (1 - Math.exp(-16 * dt));
      m.cy += (m.my - m.cy) * (1 - Math.exp(-16 * dt));

      if (customCursorRef.current) {
        customCursorRef.current.style.transform = `translate3d(${m.cx}px, ${m.cy}px, 0)`;
      }

      // Tilt towards cursor
      const onCoverCondition =
        Math.abs(m.mx - W / 2) < 0.55 * d &&
        Math.abs(m.my - cyShelf) < 0.55 * H &&
        !m.isOpen &&
        Math.abs(m.T - m.s) < 0.3;

      let targetTiltY = 0;
      let targetTiltX = 0;

      if (onCoverCondition) {
        targetTiltY = ((m.mx - W / 2) / (0.55 * d)) * 9;
        targetTiltX = -((m.my - cyShelf) / (H / 2)) * 6;
      } else {
        targetTiltY = ((m.mx - W / 2) / W) * 5;
        targetTiltX = 0;
      }

      m.tiltX += (targetTiltX - m.tiltX) * (1 - Math.exp(-7 * dt));
      m.tiltY += (targetTiltY - m.tiltY) * (1 - Math.exp(-7 * dt));

      // Cursor states
      if (m.isOpen) {
        setCursorState('default');
      } else if (onCoverCondition) {
        setCursorState('open');
      } else if (m.hoveredIndex !== -1) {
        if (m.hoveredIndex !== m.activeFilm) {
          setCursorState('spine');
        } else {
          setCursorState('open');
        }
      }

      // Update EXACTLY 5 TAPES (no more, no less!)
      for (let v = 0; v < 5; v++) {
        const tapeEl = tapeRefs.current[v];
        if (!tapeEl) continue;

        const r = v - m.s;
        const x = r * (ws + gap) + (d - ws + 1.6 * gap) * B(r);

        tapeEl.style.visibility = 'visible';

        // Hover lift
        const isHovered = m.hoveredIndex === v && Math.abs(r) > 0.5;
        m.targetLift[v] = isHovered ? 1 : 0;
        const liftSpeed = prefersReducedMotion ? 1 : 1 - Math.exp(-12 * dt);
        m.lift[v] += (m.targetLift[v] - m.lift[v]) * liftSpeed;

        // Openness o
        const o = smoothstep(Math.max(0, 1 - Math.abs(r)));

        // Film-specific physical stance
        const film = FILMS[v];
        const rotY = -90 * o + m.tiltY * o;
        const rotX = m.tiltX * o;
        const rotZ = film.tiltAngle * o;
        const transZ = o * 0.2 * H;
        const transY = -o * 0.025 * H - m.lift[v] * 0.045 * H;

        tapeEl.style.transform = `translate3d(${x.toFixed(2)}px, ${transY.toFixed(
          2
        )}px, ${transZ.toFixed(2)}px) rotateZ(${rotZ.toFixed(2)}deg) rotateX(${rotX.toFixed(
          2
        )}deg) rotateY(${rotY.toFixed(2)}deg)`;
        tapeEl.style.zIndex = `${Math.round(100 - Math.abs(r) * 10)}`;

        // Shading
        const spineShadeEl = spineShadeRefs.current[v];
        const coverShadeEl = coverShadeRefs.current[v];
        if (spineShadeEl) {
          spineShadeEl.style.opacity = `${(o * 0.55).toFixed(3)}`;
        }
        if (coverShadeEl) {
          coverShadeEl.style.opacity = `${((1 - o) * 0.5).toFixed(3)}`;
        }

        // Specular light reflection on spine as it glides
        const sheenEl = spineSheenRefs.current[v];
        if (sheenEl) {
          const sheenX = ((x / (W * 0.5)) * 100).toFixed(1);
          sheenEl.style.backgroundPosition = `${sheenX}% 0%`;
          sheenEl.style.opacity = `${(1 - o * 0.8).toFixed(2)}`;
        }
      }

      // Play ring
      if (playRingRef.current) {
        const playRingScale = m.isOpen
          ? 0
          : smoothstep(Math.max(0, 1 - Math.abs(m.T - m.s) * 3));
        const playX = W / 2 - 0.5 * d - 6;
        const playY = cyShelf + 0.36 * H;

        playRingRef.current.style.left = `${playX.toFixed(1)}px`;
        playRingRef.current.style.top = `${playY.toFixed(1)}px`;
        playRingRef.current.style.transform = `translate(-50%, -50%) scale(${playRingScale.toFixed(
          3
        )})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateGeometry);
    };
  }, [swapCaption, updateGeometry]);

  // Pointer & Drag handlers on stage
  const onPointerDown = (e: React.PointerEvent) => {
    if (isDetailOpen) return;
    motionRef.current.hasInteracted = true;
    sound.init();

    const m = motionRef.current;
    m.isDragging = false;
    m.dragStartX = e.clientX;
    m.dragStartT = m.T;
    m.dragDistance = 0;

    const onPointerMove = (moveEv: PointerEvent) => {
      const dx = moveEv.clientX - m.dragStartX;
      m.dragDistance = Math.abs(dx);
      if (m.dragDistance > 5) {
        m.isDragging = true;
        const step = m.ws + m.gap;
        m.T = Math.max(0, Math.min(4, m.dragStartT - dx / step));
      }
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (m.isDragging) {
        m.T = Math.max(0, Math.min(4, Math.round(m.T)));
      }
      setTimeout(() => {
        m.isDragging = false;
      }, 50);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Wheel handling bounded strictly [0, 4]
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const m = motionRef.current;
      if (m.isOpen) return;

      m.hasInteracted = true;
      sound.init();

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const step = m.ws + m.gap;
      m.T = Math.max(0, Math.min(4, m.T + (delta / step) * 0.5));

      if (m.wheelTimer) clearTimeout(m.wheelTimer);
      m.wheelTimer = setTimeout(() => {
        m.T = Math.max(0, Math.min(4, Math.round(m.T)));
      }, 160);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const m = motionRef.current;
      m.hasInteracted = true;
      sound.init();

      if (e.key === 'ArrowLeft') {
        m.T = Math.max(0, Math.min(4, Math.round(m.T) - 1));
        sound.playShelfSlide(1);
      } else if (e.key === 'ArrowRight') {
        m.T = Math.max(0, Math.min(4, Math.round(m.T) + 1));
        sound.playShelfSlide(1);
      } else if (e.key === 'Enter') {
        if (!m.isOpen) {
          openDetail();
        }
      } else if (e.key === 'Escape') {
        if (m.isOpen) {
          closeDetail();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openDetail, closeDetail]);

  // Global mousemove for cursor tracking
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      motionRef.current.mx = e.clientX;
      motionRef.current.my = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Handle tape clicking
  const handleTapeClick = (v: number) => {
    const m = motionRef.current;
    if (m.isDragging || m.dragDistance > 5) return;

    if (v === m.activeFilm) {
      openDetail();
    } else {
      m.T = v;
      sound.playShelfSlide(1.1);
    }
  };

  const activeFilm = FILMS[activeFilmIndex];

  // SVG Poster Dimensions for detail view
  let posterImageHref = '';
  let posterX = 0;
  let posterY = 0;
  let posterW = 474;
  let posterH = 900;

  if (activeFilm.customCoverUrl) {
    posterImageHref = activeFilm.customCoverUrl;
    posterX = 0;
    posterY = 0;
    posterW = 474;
    posterH = 900;
  } else if (activeFilm.coverCrop) {
    const coverSheet = SHEETS[activeFilm.coverCrop.sheet];
    const coverCrop = activeFilm.coverCrop;
    posterImageHref = coverSheet.url;
    posterX = (-coverCrop.x * 474) / coverCrop.w;
    posterY = (-coverCrop.y * 900) / coverCrop.h;
    posterW = (coverSheet.W * 474) / coverCrop.w;
    posterH = (coverSheet.H * 900) / coverCrop.h;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[var(--paper)] text-[var(--ink)] select-none">
      {/* 1. Paper grain layer */}
      <div className="paper-grain" aria-hidden="true" />

      {/* 2. Top bar with Serzhan Birzhan Branding */}
      <header className="fixed top-0 left-0 w-full h-[64px] md:h-[84px] px-[16px] md:px-[32px] grid grid-cols-[1fr_auto_1fr] items-center z-30">
        {/* Left: First button & Audio toggle */}
        <div className="justify-self-start flex items-center gap-[8px] md:gap-[12px]">
          <button
            type="button"
            className="box lbl text-[var(--ink)] hover:bg-black/5 transition-colors"
            onPointerEnter={() => setCursorState('btn')}
            onPointerLeave={() => setCursorState('default')}
            onClick={() => jumpToFilm(0)}
          >
            БАСЫ / FIRST
          </button>

          {/* Sound Toggle Button */}
          <button
            type="button"
            className={`box lbl transition-colors ${
              isMuted
                ? 'text-[var(--muted)] border-black/20 hover:border-black/50'
                : 'text-[var(--cobalt)] border-[var(--cobalt)] hover:bg-[var(--cobalt)]/10'
            }`}
            title="Дыбысты қосу / өшіру"
            onPointerEnter={() => setCursorState('btn')}
            onPointerLeave={() => setCursorState('default')}
            onClick={handleToggleSound}
          >
            {isMuted ? 'ДЫБЫС: ӨШІРУ' : 'ДЫБЫС: ҚОСУ'}
          </button>
        </div>

        {/* Center: Serzhan Birzhan Clean Logo */}
        <div className="flex flex-col items-center justify-center gap-[3px] text-[var(--cobalt)]">
          <span className="font-sans font-bold text-[18px] md:text-[22px] tracking-[0.14em] uppercase leading-none">
            SERZHAN BIRZHAN
          </span>
          <span className="lbl font-semibold text-[8px] md:text-[9.5px] tracking-[0.26em] text-[var(--muted)] leading-none">
            КІТАП СӨРЕСІ • БЕЛСЕНДІ ТЫҢДАУ & ДИАЛОГТІК ОҚЫТУ
          </span>
        </div>

        {/* Right: Download ZIP button & 5 Books Badge */}
        <div className="justify-self-end flex items-center gap-[8px] md:gap-[12px]">
          <span className="lbl text-[var(--muted)] hidden lg:inline">
            5 КІТАП
          </span>
        </div>
      </header>

      {/* 3. 3D Shelf Stage with EXACTLY 5 BOOKS */}
      <section
        aria-label="5 Books Shelf"
        className="fixed left-0 w-full z-20 overflow-visible cursor-grab active:cursor-grabbing"
        style={{
          top: 'calc(50% - var(--H) / 2 - 40px)',
          height: 'calc(var(--H) + 80px)',
          perspective: '2200px',
          perspectiveOrigin: '50% 50%',
          touchAction: 'pan-y',
        }}
        onPointerDown={onPointerDown}
      >
        <div
          ref={stageRef}
          className="stage-preserve-3d absolute left-1/2 top-1/2 w-0 h-0"
        >
          {FILMS.map((film, v) => (
            <div
              key={film.id}
              ref={(el) => {
                tapeRefs.current[v] = el;
              }}
              className="stage-preserve-3d absolute left-0 top-0 w-0 h-0 will-change-transform cursor-pointer"
              onPointerEnter={() => {
                motionRef.current.hoveredIndex = v;
                sound.playSpineTick();
              }}
              onPointerLeave={() => {
                if (motionRef.current.hoveredIndex === v) {
                  motionRef.current.hoveredIndex = -1;
                }
              }}
              onClick={() => handleTapeClick(v)}
            >
              {/* Spine face */}
              <div
                className="sp backface-hidden absolute rounded-[2px] overflow-hidden flex flex-col justify-between items-center py-3 text-center"
                style={{
                  height: 'var(--H)',
                  width: 'var(--ws)',
                  left: 'calc(-1 * var(--ws) / 2)',
                  top: 'calc(-1 * var(--H) / 2)',
                  transform: 'translateZ(calc(var(--d) / 2))',
                  ...getSpineBgStyle(film),
                }}
              >
                {/* Custom styling for Working With Parents To Support Childrens Learning spine */}
                {film.id === 'parents2019' ? (
                  <>
                    <div className="flex flex-col items-center gap-0.5 pt-1">
                      <div className="w-4 h-4 rounded-full bg-[#0891B2] flex items-center justify-center text-[7px] text-white font-bold">
                        EEF
                      </div>
                      <span className="text-[6.5px] font-bold text-slate-800 tracking-tighter uppercase leading-none">
                        REPORT
                      </span>
                    </div>

                    <div className="text-white font-bold text-[8px] tracking-[0.14em] uppercase [writing-mode:vertical-rl] select-none py-1 drop-shadow-sm">
                      WORKING WITH PARENTS • FEEDBACK
                    </div>

                    <div className="flex flex-col items-center pb-1">
                      <span className="text-[7px] font-bold text-[#0891B2] tracking-wider">GUIDANCE</span>
                      <span className="text-[5.5px] font-semibold text-slate-700 tracking-tight">EEF 2019</span>
                    </div>
                  </>
                ) : null}

                {/* Custom styling for Rogers & Farson 1957 spine */}
                {film.id === 'rogers1957' ? (
                  <>
                    <div className="flex flex-col items-center gap-0.5 pt-1">
                      <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[7px] text-white font-bold">
                        AL
                      </div>
                      <span className="text-[6.5px] font-bold text-purple-200 tracking-wider uppercase leading-none">
                        1957
                      </span>
                    </div>

                    <div className="text-white font-bold text-[8.5px] tracking-[0.16em] uppercase [writing-mode:vertical-rl] select-none py-1 drop-shadow-sm">
                      ACTIVE LISTENING • ROGERS & FARSON
                    </div>

                    <div className="flex flex-col items-center pb-1">
                      <span className="text-[7px] font-bold text-purple-200 tracking-wider">CLASSIC</span>
                      <span className="text-[5.5px] font-medium text-white/70 tracking-tight">PSYCHOLOGY</span>
                    </div>
                  </>
                ) : null}

                {/* Custom styling for EEF 2017 spine */}
                {film.id === 'eef2017' ? (
                  <>
                    <div className="flex flex-col items-center gap-0.5 pt-1">
                      <div className="w-4 h-4 rounded-full bg-blue-600/90 flex items-center justify-center text-[7px] text-white font-bold">
                        O
                      </div>
                      <span className="text-[6.5px] font-bold text-slate-800 tracking-tighter uppercase leading-none">
                        OECD
                      </span>
                    </div>

                    <div className="text-white font-bold text-[8.5px] tracking-[0.16em] uppercase [writing-mode:vertical-rl] select-none py-1">
                      DIALOGIC TEACHING • 2017
                    </div>

                    <div className="flex flex-col items-center pb-1">
                      <span className="text-[7px] font-bold text-orange-600 tracking-wider">EEF</span>
                      <span className="text-[5.5px] font-semibold text-slate-700 tracking-tight">REPORT</span>
                    </div>
                  </>
                ) : null}

                {/* Custom styling for Unlocking High Quality Teaching spine */}
                {film.id === 'unlocking2025' ? (
                  <>
                    <div className="flex flex-col items-center gap-0.5 pt-1">
                      <div className="w-4 h-4 rounded-full bg-[#0F4C81] flex items-center justify-center text-[7px] text-white font-bold">
                        O
                      </div>
                      <span className="text-[6.5px] font-bold text-slate-800 tracking-tighter uppercase leading-none">
                        OECD
                      </span>
                    </div>

                    <div className="text-white font-bold text-[8px] tracking-[0.14em] uppercase [writing-mode:vertical-rl] select-none py-1 drop-shadow-sm">
                      UNLOCKING HIGH QUALITY TEACHING
                    </div>

                    <div className="flex flex-col items-center pb-1">
                      <span className="text-[7px] font-bold text-[#0F4C81] tracking-wider">TEACHING</span>
                      <span className="text-[5.5px] font-semibold text-slate-700 tracking-tight">REPORT</span>
                    </div>
                  </>
                ) : null}

                {/* Custom styling for Research Papers in Education spine */}
                {film.id === 'research2002' ? (
                  <>
                    <div className="flex flex-col items-center gap-0.5 pt-1">
                      <div className="w-4 h-4 rounded-full border border-cyan-400 bg-black/40 flex items-center justify-center text-[7px] text-cyan-300 font-bold">
                        R
                      </div>
                      <span className="text-[6.5px] font-bold text-cyan-200 tracking-wider uppercase leading-none">
                        ROUTLEDGE
                      </span>
                    </div>

                    <div className="text-white font-bold text-[8px] tracking-[0.14em] uppercase [writing-mode:vertical-rl] select-none py-1 drop-shadow-sm border-x border-cyan-400/30 px-0.5">
                      RESEARCH PAPERS IN EDUCATION
                    </div>

                    <div className="flex flex-col items-center pb-1">
                      <span className="text-[7px] font-bold text-cyan-300 tracking-wider">VOL. 32</span>
                      <span className="text-[5.5px] font-semibold text-rose-200/80 tracking-tight">POLICY</span>
                    </div>
                  </>
                ) : null}

                {/* Spine light shading overlay */}
                <div
                  ref={(el) => {
                    spineShadeRefs.current[v] = el;
                  }}
                  className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-75"
                  style={{ opacity: 0 }}
                />

                {/* Specular sheen across spine cardboard */}
                <div
                  ref={(el) => {
                    spineSheenRefs.current[v] = el;
                  }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.22) 50%, transparent 75%)',
                    backgroundSize: '200% 100%',
                    opacity: 0.5,
                  }}
                />
              </div>

              {/* Cover face */}
              <div
                ref={(el) => {
                  coverRefs.current[v] = el;
                }}
                className="cv backface-hidden absolute rounded-[2px] overflow-hidden shadow-[0_30px_60px_-28px_rgba(20,16,10,0.55)]"
                style={{
                  height: 'var(--H)',
                  width: 'var(--d)',
                  left: 'calc(-1 * var(--d) / 2)',
                  top: 'calc(-1 * var(--H) / 2)',
                  transform: 'rotateY(90deg) translateZ(calc(var(--ws) / 2))',
                  ...getFaceBgStyle(film),
                }}
              >
                {/* Cover light shading overlay */}
                <div
                  ref={(el) => {
                    coverShadeRefs.current[v] = el;
                  }}
                  className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-75"
                  style={{ opacity: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Play ring */}
      <button
        ref={playRingRef}
        type="button"
        aria-label="Open film"
        className="fixed z-25 w-[42px] h-[42px] rounded-full border border-[var(--cobalt)] bg-[#EDEBE6]/75 flex items-center justify-center transition-transform pointer-events-auto group"
        style={{
          transform: 'translate(-50%, -50%) scale(0)',
        }}
        onPointerEnter={() => {
          setCursorState('btn');
          sound.playSpineTick();
        }}
        onPointerLeave={() => setCursorState('default')}
        onClick={openDetail}
      >
        <span className="absolute inset-0 rounded-full border border-[var(--cobalt)]/40 scale-100 group-hover:scale-125 transition-transform duration-300 pointer-events-none" />
        <svg
          viewBox="0 0 24 24"
          className="w-[14px] h-[14px] fill-[var(--cobalt)] ml-[2px]"
          aria-hidden="true"
        >
          <path d="M7 4v16l13-8z" />
        </svg>
      </button>

      {/* 5. Caption */}
      <div
        aria-live="polite"
        className="fixed left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-[9px] pointer-events-none text-center"
        style={{
          top: 'calc(50% + var(--H) / 2 + 30px)',
          width: 'min(92vw, 760px)',
        }}
      >
        {/* Title masked container */}
        <div
          ref={titleMaskRef}
          className="relative h-[36px] md:h-[42px] w-full overflow-hidden flex items-center justify-center"
        >
          <span className="font-serif text-[22px] md:text-[28px] leading-[1.15] tracking-[-0.01em] inline-block">
            {activeFilm.title}
          </span>
        </div>

        {/* Subtitle masked container */}
        <div
          ref={subtitleMaskRef}
          className="relative h-[18px] w-full overflow-hidden flex items-center justify-center"
        >
          <span className="lbl font-semibold tracking-wider text-[var(--cobalt)] inline-block">
            {activeFilm.subtitle}
          </span>
        </div>

        {/* Year masked container */}
        <div
          ref={yearMaskRef}
          className="relative h-[18px] w-full overflow-hidden flex items-center justify-center"
        >
          <span className="font-sans font-medium text-[11px] tracking-[0.08em] text-[var(--ink)] inline-block">
            {activeFilm.year}
          </span>
        </div>
      </div>

      {/* 6. Previous / Next Arrow Buttons (Clamped to 0..4) */}
      <button
        type="button"
        aria-label="Previous film"
        disabled={activeFilmIndex === 0}
        className={`fixed z-20 w-[44px] h-[44px] left-[6px] md:left-[20px] flex items-center justify-center transition-opacity ${
          activeFilmIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'text-[var(--ink)] hover:opacity-75'
        }`}
        style={{
          top: 'calc(50% + var(--H) / 2 + 40px)',
        }}
        onPointerEnter={() => {
          if (activeFilmIndex > 0) {
            setCursorState('btn');
            sound.playSpineTick();
          }
        }}
        onPointerLeave={() => setCursorState('default')}
        onClick={() => stepFilm(-1)}
      >
        <svg
          viewBox="0 0 18 10"
          className="w-[18px] h-[10px] stroke-current fill-none"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 1 L1 5 L5 9" />
          <path d="M1 5 L17 5" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next film"
        disabled={activeFilmIndex === 4}
        className={`fixed z-20 w-[44px] h-[44px] right-[6px] md:right-[20px] flex items-center justify-center transition-opacity ${
          activeFilmIndex === 4 ? 'opacity-20 cursor-not-allowed' : 'text-[var(--ink)] hover:opacity-75'
        }`}
        style={{
          top: 'calc(50% + var(--H) / 2 + 40px)',
        }}
        onPointerEnter={() => {
          if (activeFilmIndex < 4) {
            setCursorState('btn');
            sound.playSpineTick();
          }
        }}
        onPointerLeave={() => setCursorState('default')}
        onClick={() => stepFilm(1)}
      >
        <svg
          viewBox="0 0 18 10"
          className="w-[18px] h-[10px] stroke-current fill-none"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 1 L17 5 L13 9" />
          <path d="M1 5 L17 5" />
        </svg>
      </button>

      {/* 7. Footer */}
      <footer className="fixed bottom-[18px] md:bottom-[26px] left-[16px] md:left-[32px] right-[16px] md:right-[32px] z-30 flex items-center justify-between text-[9px] md:text-[10.5px]">
        <div className="lbl text-[var(--ink)]">
          © SERZHAN BIRZHAN. БАРЛЫҚ ҚҰҚЫҚТАР ҚОРҒАЛҒАН.
        </div>
        <div className="flex items-center gap-[12px]">
          <span className="lbl text-[var(--muted)]">ПЕДАГОГИКАЛЫҚ ЗЕРТТЕУЛЕР</span>
          <span className="lbl text-[var(--muted)]">/</span>
          <span className="lbl text-[var(--cobalt)] font-semibold">2026</span>
        </div>
      </footer>

      {/* 8. Custom Cursor (fine pointers only) */}
      <div
        ref={customCursorRef}
        className="fixed top-0 left-0 w-[58px] h-[58px] -ml-[29px] -mt-[29px] z-[100] pointer-events-none hidden [@media(pointer:fine)]:block"
      >
        {/* Ring */}
        <div
          ref={cursorRingRef}
          className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-400 ease-[var(--ease)] ${
            cursorState === 'open'
              ? 'scale-[1.75] bg-[var(--cobalt)] border-[1.5px] border-[var(--cobalt)]'
              : cursorState === 'spine'
              ? 'scale-[0.72] bg-transparent border-[1.5px] border-[var(--ink)]'
              : cursorState === 'btn'
              ? 'scale-[0.55] bg-transparent border-[1.5px] border-[var(--ink)]'
              : 'scale-100 bg-transparent border-[1.5px] border-[var(--ink)]'
          }`}
        >
          {/* Dot */}
          <div
            ref={cursorDotRef}
            className={`w-[6px] h-[6px] rounded-full bg-[var(--ink)] transition-transform duration-400 ease-[var(--ease)] ${
              cursorState === 'open' || cursorState === 'btn' ? 'scale-0' : 'scale-100'
            }`}
          />

          {/* OPEN / АШУ Label */}
          <div
            ref={cursorLabelRef}
            className={`absolute flex flex-col items-center justify-center text-white font-sans font-semibold text-[10px] leading-[1.25] tracking-[0.1em] uppercase transition-transform duration-450 ease-[var(--ease)] ${
              cursorState === 'open' ? 'scale-100' : 'scale-0'
            }`}
          >
            <span>OPEN</span>
            <span className="text-[8.5px] leading-tight">АШУ</span>
          </div>
        </div>
      </div>

      {/* 9. Detail View Dialog (Paper Sheet & Organic Poster Reveal) */}
      <div
        ref={detailDialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={activeFilm.title}
        className="fixed inset-0 w-full h-full z-[60] bg-[var(--sheet)] text-[var(--ink)] overflow-y-auto md:overflow-hidden select-none"
        style={{
          visibility: 'hidden',
        }}
      >
        {/* Detail Top bar with Close button and centered Serzhan Birzhan logo */}
        <div className="absolute top-0 left-0 w-full h-[64px] md:h-[84px] px-[16px] md:px-[32px] flex items-center justify-between z-20 pointer-events-auto">
          {/* Close button at top left */}
          <button
            type="button"
            className="box lbl text-[var(--ink)] hover:bg-black/5 transition-colors"
            onPointerEnter={() => {
              setCursorState('btn');
              sound.playSpineTick();
            }}
            onPointerLeave={() => setCursorState('default')}
            onClick={closeDetail}
          >
            ЖАБУ / CLOSE
          </button>

          {/* Centered logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-[3px] text-[var(--cobalt)]">
            <span className="font-sans font-bold text-[16px] md:text-[20px] tracking-[0.14em] uppercase leading-none">
              SERZHAN BIRZHAN
            </span>
            <span className="lbl font-semibold text-[7.5px] md:text-[8.5px] tracking-[0.22em] text-[var(--muted)] leading-none">
              ПЕДАГОГИКА ЖӘНЕ ПСИХОЛОГИЯ
            </span>
          </div>

          {/* Timecode / Status LCD counter */}
          <div className="flex items-center gap-[6px] text-[11px] font-mono tracking-wider text-[var(--muted)]">
            <span className="w-[7px] h-[7px] rounded-full bg-red-600 animate-pulse" />
            <span>DOC {timecodeDisplay}</span>
          </div>
        </div>

        {/* Detail main content layout */}
        <div className="w-full h-full pt-[84px] md:pt-[110px] pb-[40px] md:pb-[56px] px-[22px] md:px-[7vw] grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[4vw] items-center">
          {/* Left Column: Masked Typography Lines */}
          <div className="flex flex-col gap-[16px] max-w-[560px] justify-center order-2 md:order-1">
            {/* Line 1: Subtitle / Slide Kicker */}
            <div className="overflow-hidden">
              <div
                ref={(el) => {
                  detailMaskedLinesRef.current[0] = el;
                }}
                className="lbl font-bold tracking-wider"
                style={{ color: activeFilm.accent }}
              >
                {activeFilm.subtitle}
              </div>
            </div>

            {/* Line 2: Title */}
            <div className="overflow-hidden">
              <h1
                ref={(el) => {
                  detailMaskedLinesRef.current[1] = el;
                }}
                className="font-serif text-[clamp(28px,3.8vw,54px)] leading-[1.1] tracking-[-0.02em]"
              >
                {activeFilm.title}
              </h1>
            </div>

            {/* Line 3: Meta */}
            <div className="overflow-hidden">
              <div
                ref={(el) => {
                  detailMaskedLinesRef.current[2] = el;
                }}
                className="lbl text-[var(--muted)]"
              >
                {activeFilm.year} / {activeFilm.genre.toUpperCase()} / {activeFilm.minutes}
              </div>
            </div>

            {/* Line 4: Primary Concept / Synopsis */}
            <div className="overflow-hidden">
              <p
                ref={(el) => {
                  detailMaskedLinesRef.current[3] = el;
                }}
                className="font-serif text-[16px] md:text-[18px] leading-[1.55] max-w-[48ch] text-[var(--ink)] font-normal"
              >
                {activeFilm.synopsis}
              </p>
            </div>

            {/* Line 5: Detailed Bullet Points */}
            {activeFilm.points ? (
              <div className="overflow-hidden">
                <div
                  ref={(el) => {
                    detailMaskedLinesRef.current[4] = el;
                  }}
                  className="space-y-2 max-h-[280px] md:max-h-[320px] overflow-y-auto pr-2"
                >
                  {activeFilm.points.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 md:p-3 bg-black/[0.035] border-l-2 rounded-r-md text-[13px] md:text-[14px] leading-[1.5] text-slate-800"
                      style={{ borderLeftColor: activeFilm.accent }}
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="overflow-hidden">
                <p
                  ref={(el) => {
                    detailMaskedLinesRef.current[4] = el;
                  }}
                  className="font-serif italic text-[15px] text-[var(--muted)]"
                >
                  Авторлық жинақ • Serzhan Birzhan
                </p>
              </div>
            )}

            {/* Line 6: Citation & Action Button */}
            <div className="overflow-hidden pt-[6px]">
              <div
                ref={(el) => {
                  detailMaskedLinesRef.current[5] = el;
                }}
                className="flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <button
                  type="button"
                  className="box lbl h-[44px] px-[20px] transition-colors"
                  style={{
                    borderColor: activeFilm.accent,
                    color: activeFilm.accent,
                  }}
                  onPointerEnter={() => {
                    setCursorState('btn');
                    sound.playSpineTick();
                  }}
                  onPointerLeave={() => setCursorState('default')}
                  onClick={() => {
                    sound.playFilmSignature(activeFilmIndex);
                  }}
                >
                  {activeFilm.points ? 'МАТЕРИАЛДЫ КӨРУ / VIEW CHAPTER' : 'КІТАПТЫ АШУ / READ BOOK'}
                </button>

                {activeFilm.citation && (
                  <span className="font-sans text-[11px] font-medium text-[var(--muted)]">
                    {activeFilm.citation}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Poster with Organic Ink Bleed */}
          <div className="flex items-center justify-center order-1 md:order-2 h-[46svh] md:h-[min(100%,78vh)]">
            <svg
              viewBox="0 0 474 900"
              className="h-full max-h-[78vh] w-auto aspect-[474/900] select-none shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-[4px]"
              aria-hidden="true"
            >
              <defs>
                {/* SVG Filter for ragged ink blot edges */}
                <filter id="ink-bleed-filter" filterUnits="userSpaceOnUse" x="-200" y="-200" width="874" height="1300">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.012"
                    numOctaves="3"
                    seed="7"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="120"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>

                {/* Poster clip rect */}
                <clipPath id="poster-clip-rect">
                  <rect x="0" y="0" width="474" height="900" rx="4" />
                </clipPath>

                {/* 7 Spreading Ink Blobs Mask */}
                <mask
                  id="poster-ink-mask"
                  maskUnits="userSpaceOnUse"
                  x="-200"
                  y="-200"
                  width="874"
                  height="1300"
                >
                  <g filter="url(#ink-bleed-filter)">
                    {BLOBS.map((b, idx) => (
                      <circle
                        key={idx}
                        ref={(el) => {
                          blobCircleRefs.current[idx] = el;
                        }}
                        cx={b.cx}
                        cy={b.cy}
                        r="0"
                        fill="#ffffff"
                      />
                    ))}
                  </g>
                </mask>
              </defs>

              {/* The cover image directly bound with reliable coordinates */}
              <g clipPath="url(#poster-clip-rect)">
                <image
                  ref={posterImgRef}
                  mask="url(#poster-ink-mask)"
                  preserveAspectRatio="none"
                  href={posterImageHref}
                  x={posterX}
                  y={posterY}
                  width={posterW}
                  height={posterH}
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
