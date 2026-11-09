/* Набор нарисованных линейных иконок (вместо эмодзи). ico("cube") даёт готовый <svg>.
   Новая иконка: добавь строку в ICO — внутренности svg в сетке 24×24, линией. */
const ICO={
 cube:'<path d="M12 3 4 7.500v9L12 21l8-4.500v-9z"/><path d="M4 7.500 12 12l8-4.500M12 12v9"/>',
 unwrap:'<path d="M3 6.500 9 4l6 2.500L21 4v13.500L15 20l-6-2.500L3 20z"/><path d="M9 4v13.500M15 6.500V20"/>',
 palette:'<path d="M12 3a9 9 0 1 0 0 18c1.400 0 2-1 2-2 0-1.500-1-1.800-1-3a2 2 0 0 1 2-2h2.500A3.500 3.500 0 0 0 21 10.500C21 6.300 17 3 12 3z"/><circle cx="7.500" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.500" r="1"/>',
 poly:'<path d="M12 3 21 9.500 17.500 20h-11L3 9.500z"/><path d="M12 3v8M12 11 3 9.500M12 11l9-1.500M12 11l-5.500 9M12 11l5.500 9"/>',
 film:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
 eye:'<path d="M2 12s3.500-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 gamepad:'<rect x="2.500" y="7" width="19" height="11" rx="5"/><path d="M7.500 10.500v4M5.500 12.500h4"/><circle cx="15.500" cy="11.500" r=".8"/><circle cx="18" cy="13.500" r=".8"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M5.300 18.700l2.100-2.100M16.600 7.400l2.100-2.100"/>',
 code:'<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
 image:'<rect x="3" y="4" width="18" height="16" rx="2.500"/><circle cx="9" cy="10" r="1.800"/><path d="m21 16-5-5-8 8"/>',
 puzzle:'<path d="M10 4a2 2 0 1 1 4 0v1h4a1 1 0 0 1 1 1v4h-1a2 2 0 1 0 0 4h1v4a1 1 0 0 1-1 1h-4v-1a2 2 0 1 0-4 0v1H6a1 1 0 0 1-1-1v-4h1a2 2 0 1 0 0-4H5V6a1 1 0 0 1 1-1h4z"/>',
 loop:'<path d="M20 11a8 8 0 0 0-14-4.500L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4.500L20 15M20 20v-5h-5"/>',
 search:'<circle cx="11" cy="11" r="6.500"/><path d="m16 16 5 5"/>',
 key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l3 3M14 9l2 2"/>',
 moon:'<path d="M20 14.500A8.500 8.500 0 1 1 9.500 4a7 7 0 0 0 10.500 10.500z"/>',
 doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
 orbit:'<circle cx="12" cy="12" r="2.500"/><ellipse cx="12" cy="12" rx="10" ry="4.500" transform="rotate(-30 12 12)"/>',
 window:'<rect x="3" y="4" width="18" height="16" rx="2.500"/><path d="M3 9h18M6.500 6.500h.01M9.500 6.500h.01"/>',
 book:'<path d="M4 5.500A2.500 2.500 0 0 1 6.500 3H20v16H6.500A2.500 2.500 0 0 0 4 21.500z"/><path d="M4 5.500v16M9 8h7"/>',
 board:'<rect x="3" y="4" width="18" height="16" rx="2.500"/><path d="M9.500 4v16M15 4v16M5.800 8h1.500M12 8h1.500M17.500 8h.7M5.800 12h1.500M12 12h1.500"/>',
 candle:'<path d="M12 2c1.700 2.200 2.200 3.500 0 5.500C9.800 5.500 10.300 4.200 12 2z"/><rect x="8.500" y="9.500" width="7" height="11.500" rx="1.500"/>',
 dice:'<rect x="3.500" y="3.500" width="17" height="17" rx="3.500"/><circle cx="8.500" cy="8.500" r="1"/><circle cx="15.500" cy="8.500" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="8.500" cy="15.500" r="1"/><circle cx="15.500" cy="15.500" r="1"/>',
 grid:'<path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/>',
 fit:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
 expand:'<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>',
 shrink:'<path d="M20 10h-6V4M4 14h6v6M14 10l7-7M3 21l7-7"/>',
 rotate:'<path d="M21 12a9 9 0 1 1-3-6.700L21 8M21 3v5h-5"/>',
 x:'<path d="M6 6l12 12M18 6 6 18"/>'
};
const ico=n=>ICO[n]?`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICO[n]}</svg>`:(n||"");
