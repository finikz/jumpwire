(() => {
  const excluded = (image) => {
    const source = image.currentSrc || image.src || '';
    return image.hasAttribute('data-watermark-exempt') || /(?:brand-logo-jumpwire|logo-jumpwire-stamp)\./i.test(source);
  };

  const states = new Map();
  let frame = 0;

  function sampleIsDark(image) {
    try {
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      const box = image.getBoundingClientRect();
      if (!width || !height || !box.width || !box.height) return true;

      let sx = 0;
      let sy = 0;
      let sw = width;
      let sh = height;
      const style = getComputedStyle(image);
      const fit = style.objectFit;
      if (fit === 'cover') {
        const scale = Math.max(box.width / width, box.height / height);
        sw = box.width / scale;
        sh = box.height / scale;
        const position = style.objectPosition.split(/\s+/);
        const fraction = (value) => {
          if (value?.endsWith('%')) return Math.max(0, Math.min(1, parseFloat(value) / 100));
          if (value === 'left' || value === 'top') return 0;
          if (value === 'right' || value === 'bottom') return 1;
          return 0.5;
        };
        sx = (width - sw) * fraction(position[0], 'x');
        sy = (height - sh) * fraction(position[1], 'y');
      }

      const patchWidth = Math.max(1, sw * 0.18);
      const patchHeight = Math.max(1, sh * 0.18);
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(image, sx + sw - patchWidth, sy + sh - patchHeight, patchWidth, patchHeight, 0, 0, 16, 16);
      const pixels = context.getImageData(0, 0, 16, 16).data;
      let total = 0;
      let count = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] < 32) continue;
        const linear = (value) => {
          const channel = value / 255;
          return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
        };
        total += 0.2126 * linear(pixels[i]) + 0.7152 * linear(pixels[i + 1]) + 0.0722 * linear(pixels[i + 2]);
        count++;
      }
      return !count || total / count < 0.42;
    } catch {
      return true;
    }
  }

  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      for (const [image, state] of states) {
        if (!image.isConnected) {
          state.overlay.remove();
          state.resizeObserver?.disconnect();
          states.delete(image);
          continue;
        }
        const rect = image.getBoundingClientRect();
        if (!image.naturalWidth || !rect.width || !rect.height || getComputedStyle(image).display === 'none') {
          state.overlay.style.display = 'none';
          continue;
        }
        const source = image.currentSrc || image.src;
        if (state.source !== source) {
          if (!image.complete || !image.naturalWidth) {
            state.overlay.style.display = 'none';
            continue;
          }
          state.source = source;
          state.isDark = sampleIsDark(image);
          state.overlay.style.filter = state.isDark
            ? 'brightness(0) invert(1) drop-shadow(0 1px 3px rgba(0,0,0,.75))'
            : 'brightness(0) drop-shadow(0 1px 3px rgba(255,255,255,.65))';
        }
        const size = Math.max(20, Math.min(48, Math.min(rect.width, rect.height) * 0.18));
        const inset = Math.max(5, Math.min(12, size * 0.22));
        state.overlay.style.display = 'block';
        state.overlay.style.width = `${size}px`;
        state.overlay.style.height = `${size}px`;
        state.overlay.style.left = `${rect.right - size - inset}px`;
        state.overlay.style.top = `${rect.bottom - size - inset}px`;
      }
    });
  }

  function watch(image) {
    if (excluded(image) || states.has(image)) return;
    const overlay = document.createElement('span');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = "position:fixed;z-index:30;display:none;background:url('/logo-jumpwire-stamp.png') center/contain no-repeat;opacity:.82;pointer-events:none;";
    document.body.appendChild(overlay);
    const state = { overlay, source: '', resizeObserver: null };
    states.set(image, state);
    image.addEventListener('load', schedule);
    image.addEventListener('error', schedule);
    if ('ResizeObserver' in window) {
      state.resizeObserver = new ResizeObserver(schedule);
      state.resizeObserver.observe(image);
    }
    schedule();
  }

  function scan() {
    document.querySelectorAll('img').forEach(watch);
    schedule();
  }

  new MutationObserver((records) => {
    let shouldScan = false;
    for (const record of records) {
      if (record.type === 'attributes' && record.target instanceof HTMLImageElement) {
        const state = states.get(record.target);
        if (state) state.source = '';
        shouldScan = true;
      } else if (record.type === 'childList' && [...record.addedNodes].some((node) => node.nodeType === 1 && (node.matches('img') || node.querySelector('img')))) {
        shouldScan = true;
      }
      if (shouldScan) break;
    }
    if (shouldScan) scan();
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'srcset', 'class', 'style'] });
  window.addEventListener('scroll', schedule, { passive: true, capture: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', scan, { once: true });
  scan();
})();
