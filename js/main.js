/* =============================================================
   TOKAMAK GAMES — interactions
   ============================================================= */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  var main = document.getElementById("top");
  var footer = document.querySelector(".footer");

  var themedSections = Array.prototype.slice.call(
    document.querySelectorAll("[data-section-theme]")
  );

  /* ---------- Coalesced, rAF-throttled scroll work ---------- */
  var navProbe = nav ? nav.offsetHeight / 2 + 4 : 36;

  function updateNavTheme() {
    if (!nav) return;
    var current = "dark";
    for (var i = 0; i < themedSections.length; i++) {
      var r = themedSections[i].getBoundingClientRect();
      if (r.top <= navProbe && r.bottom > navProbe) {
        current = themedSections[i].getAttribute("data-section-theme") || "dark";
        break;
      }
    }
    nav.setAttribute("data-theme", current);
  }

  var ticking = false;
  function onScrollFrame() {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 24);
    updateNavTheme();
    ticking = false;
  }
  function requestScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScrollFrame);
    }
  }
  window.addEventListener("scroll", requestScroll, { passive: true });
  window.addEventListener("resize", function () {
    navProbe = nav ? nav.offsetHeight / 2 + 4 : 36;
    requestScroll();
  });

  /* ---------- Mobile menu (with focus management) ---------- */
  function setBackgroundInert(on) {
    [main, footer].forEach(function (el) {
      if (!el) return;
      if (on) {
        el.setAttribute("inert", "");
        el.setAttribute("aria-hidden", "true");
      } else {
        el.removeAttribute("inert");
        el.removeAttribute("aria-hidden");
      }
    });
  }
  function menuFocusables() {
    return mobileMenu
      ? Array.prototype.slice.call(mobileMenu.querySelectorAll("a[href], button"))
      : [];
  }
  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.hidden = false;
    void mobileMenu.offsetWidth; // reflow so the transition runs
    nav.classList.add("is-open");
    mobileMenu.classList.add("is-visible");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
    setBackgroundInert(true);
    var f = menuFocusables();
    if (f.length) f[0].focus();
  }
  function closeMenu() {
    if (!mobileMenu) return;
    nav.classList.remove("is-open");
    mobileMenu.classList.remove("is-visible");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
    setBackgroundInert(false);
    navToggle.focus();
    setTimeout(function () {
      if (!nav.classList.contains("is-open")) mobileMenu.hidden = true;
    }, 300);
  }
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) closeMenu();
      else openMenu();
    });
  }
  if (mobileMenu) {
    mobileMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    // trap Tab within the open menu
    mobileMenu.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = menuFocusables();
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) closeMenu();
  });

  /* ---------- Scroll reveals ---------- */
  var revealTargets = [
    ".games__head",
    ".audit__statement",
    ".audit__lede",
    ".arow",
    ".game",
    ".games__foot",
    ".receipt",
    ".cta__inner"
  ];
  var revealEls = [];
  revealTargets.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      revealEls.push(el);
    });
  });

  if ("IntersectionObserver" in window && !prefersReduced) {
    revealEls.forEach(function (el) {
      el.setAttribute("data-reveal", "");
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- Video playback (respect reduced-motion + offscreen) ---------- */
  var allVideos = Array.prototype.slice.call(document.querySelectorAll("video"));

  function safePlay(v) {
    if (prefersReduced) return;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  if (prefersReduced) {
    // honor WCAG 2.2.2 — no auto-running motion; show the poster frame instead
    allVideos.forEach(function (v) {
      v.removeAttribute("autoplay");
      try {
        v.pause();
        v.currentTime = 0;
      } catch (e) {}
    });
    // freeze SVG (SMIL) data packets, which CSS reduced-motion cannot stop
    var links = document.querySelector(".arch__links");
    if (links && links.pauseAnimations) links.pauseAnimations();
  }

  // Pause each game video while it is offscreen; resume on re-entry.
  if ("IntersectionObserver" in window) {
    var vio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var v = entry.target;
          if (entry.isIntersecting) {
            safePlay(v);
          } else {
            try { v.pause(); } catch (e) {}
          }
        });
      },
      { threshold: 0.05 }
    );
    allVideos.forEach(function (v) {
      vio.observe(v);
    });
  }

  /* ---------- Ethereum L1 conveyor ----------
     A continuous, edge-to-edge chain of blocks glides left, block by block.
     Every few stops a yellow "batch" ball drops from the Tokamak L2 chip; the
     chain holds still while the block beneath it receives the batch and turns
     yellow, then the chain moves on. */
  (function ethConveyor() {
    var track = document.getElementById("ethTrack");
    var flow = document.getElementById("ethFlow");
    var ball = document.getElementById("ethDrop");
    var chip = document.getElementById("l2tok");
    var hero = document.getElementById("hero");
    if (!track || !flow || !chip || !hero) return;
    if (ball) ball.addEventListener("animationend", function () {
      ball.classList.remove("is-dropping");
    });

    var GLIDE = 600;       // ms to glide one block left
    var PAUSE = 170;       // ms hold between ordinary glides
    var PAUSE_DROP = 1150; // ms hold while a batch is received
    var DROP_EVERY = 3;    // a batch drops on every Nth stop
    var DROP_MS = 720;     // ball fall duration
    var BASE = 901;        // first block number

    var pitch = 0, blockW = 0, head = 0, offset = 0, step = 0;
    var running = false, timer = null, recvTimer = null, flashTimer = null;
    var prevLatest = null, animate = false, isVisible = true, io = null, wired = false;
    var RECV_MS = Math.min(DROP_MS * 0.8, PAUSE_DROP - 110); // always lands before resume

    function isMobile() { return window.innerWidth <= 640; }

    function makeBlock(num) {
      var b = document.createElement("span");
      b.className = "eblk";
      var i = document.createElement("i");
      i.textContent = num;
      var tag = document.createElement("span");
      tag.className = "eblk__tag";
      tag.textContent = "Tokamak batch";
      b.appendChild(i);
      b.appendChild(tag);
      return b;
    }

    function chipCenterX() {
      var r = chip.getBoundingClientRect();
      return r.left + r.width / 2;
    }

    function build() {
      clearTimeout(timer);
      running = false;
      flow.innerHTML = "";
      flow.style.transition = "none";
      flow.style.transform = "translateX(0)";
      offset = 0; step = 0; prevLatest = null;

      var probe = makeBlock("000");
      flow.appendChild(probe);
      blockW = probe.getBoundingClientRect().width;
      var cs = getComputedStyle(flow);
      var gap = parseFloat(cs.columnGap || cs.gap) || 16;
      pitch = blockW + gap;
      flow.removeChild(probe);
      if (!pitch || pitch < 1) return false;

      var trackW = track.getBoundingClientRect().width;
      var count = Math.ceil(trackW / pitch) + 8;
      // numbers descend left -> right (newest/highest on the left) so, as the chain
      // flows right, the block reaching the Tokamak drop zone ticks UP over time
      for (var i = 0; i < count; i++) flow.appendChild(makeBlock(BASE + (count - 1 - i)));
      head = BASE + count - 1;

      // align a block centre under the Tokamak chip
      var trackLeft = track.getBoundingClientRect().left;
      var raw = chipCenterX() - trackLeft - blockW / 2;
      offset = raw - Math.round(raw / pitch) * pitch;
      flow.style.transform = "translateX(" + offset + "px)";
      void flow.offsetWidth;

      if (prefersReduced) {
        // static settled chain — sprinkle a few Tokamak batches, no motion
        var kids = flow.children;
        for (var k = 2; k < kids.length - 2; k += 3) kids[k].classList.add("eblk--got");
        return false;
      }
      // pre-shift the spare blocks to the left so the chain enters from the left edge with no gap
      recycle();
      return true;
    }

    function recycle() {
      // chain flows left -> right: blocks that pass the right edge wrap back to the front (left)
      var trackRight = track.getBoundingClientRect().right;
      var guard = 0;
      while (flow.lastElementChild && guard < 50) {
        var last = flow.lastElementChild;
        if (last.getBoundingClientRect().left > trackRight + 4) {
          head++;
          last.querySelector("i").textContent = head;
          last.classList.remove("eblk--got", "eblk--flash", "eblk--latest");
          flow.insertBefore(last, flow.firstElementChild);
          offset -= pitch;
          flow.style.transition = "none";
          flow.style.transform = "translateX(" + offset + "px)";
          void flow.offsetWidth;
          guard++;
        } else break;
      }
    }

    function blockUnderChip() {
      var x = chipCenterX(), best = null, bestD = Infinity;
      var kids = flow.children;
      for (var i = 0; i < kids.length; i++) {
        var r = kids[i].getBoundingClientRect();
        var d = Math.abs(r.left + r.width / 2 - x);
        if (d < bestD) { bestD = d; best = kids[i]; }
      }
      return best;
    }

    function markReceived(blk) {
      if (!blk) return;
      if (prevLatest && prevLatest !== blk) prevLatest.classList.remove("eblk--latest");
      blk.classList.add("eblk--got", "eblk--latest", "eblk--flash");
      prevLatest = blk;
      clearTimeout(flashTimer);
      flashTimer = setTimeout(function () { blk.classList.remove("eblk--flash"); }, 620);
      // a record just settled to L1 — let the canopy Record node pulse in sync (batch === Record)
      document.dispatchEvent(new CustomEvent("tkg:settle"));
    }

    function dropBatch() {
      var blk = blockUnderChip();
      if (!blk) return;
      if (ball && !isMobile()) {
        var chipR = chip.getBoundingClientRect();
        var heroR = hero.getBoundingClientRect();
        var blkR = blk.getBoundingClientRect();
        var startX = chipR.left + chipR.width / 2 - heroR.left;
        var startY = chipR.bottom - heroR.top;
        var dist = Math.max(24, blkR.top + blkR.height / 2 - heroR.top - startY);
        ball.style.left = startX + "px";
        ball.style.top = startY + "px";
        ball.style.setProperty("--drop-dist", dist + "px");
        ball.style.setProperty("--drop-ms", DROP_MS + "ms");
        ball.classList.remove("is-dropping");
        void ball.offsetWidth;
        ball.classList.add("is-dropping");
      }
      // the batch lands part-way through the fall — then the block turns yellow.
      // RECV_MS is clamped below PAUSE_DROP so receipt always precedes the next glide.
      clearTimeout(recvTimer);
      recvTimer = setTimeout(function () { markReceived(blk); }, isMobile() ? 0 : RECV_MS);
    }

    function glide() {
      step++;
      offset += pitch; // chain flows left -> right
      flow.style.transition = "transform " + GLIDE + "ms cubic-bezier(.42,0,.2,1)";
      flow.style.transform = "translateX(" + offset + "px)";
      timer = setTimeout(afterGlide, GLIDE);
    }

    function afterGlide() {
      recycle();
      if (step % DROP_EVERY === 0) {
        dropBatch();
        timer = setTimeout(tick, PAUSE_DROP);
      } else {
        timer = setTimeout(tick, PAUSE);
      }
    }

    function tick() { if (running) glide(); }

    function start() {
      if (running || !animate || !isVisible || document.hidden) return;
      running = true;
      timer = setTimeout(tick, PAUSE);
    }
    function stop() {
      running = false;
      clearTimeout(timer);
      clearTimeout(recvTimer);
      clearTimeout(flashTimer);
    }

    // (Re)build the chain geometry only; observers/listeners are wired once below.
    function rebuild() {
      stop();
      animate = build();
      if (animate) start();
    }

    // Wire viewport + tab-visibility gating exactly once, so resize never leaks them.
    function wire() {
      if (wired) return;
      wired = true;
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            isVisible = e.isIntersecting;
            isVisible ? start() : stop();
          });
        }, { threshold: 0.01 });
        io.observe(track);
      }
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stop();
        else if (isVisible) start();
      });
      // honor a live prefers-reduced-motion toggle (WCAG 2.2.2)
      if (window.matchMedia) {
        var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        var onMq = function (e) { if (e.matches) { animate = false; stop(); } };
        if (mq.addEventListener) mq.addEventListener("change", onMq);
        else if (mq.addListener) mq.addListener(onMq);
      }
    }

    animate = build();
    wire();
    if (animate && !("IntersectionObserver" in window)) start();

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(rebuild, 250);
    });
  })();

  /* ---------- Spine: Record (canopy) ⇄ Tokamak L2 chip ----------
     Draws the dotted thread connecting the minted Record down to the Tokamak L2 chip
     (which then settles to L1), and pulses the Record on every L1 settlement so the
     "the batch IS the Record" identity reads visually. Active only on the wide radial
     canopy layout (>1024px); below that the canopy is a static grid and the thread is hidden. */
  (function heroSpine() {
    var hero = document.getElementById("hero");
    var svg = document.getElementById("heroSpine");
    var path = document.getElementById("spinePath");
    var cap = document.getElementById("spineCap");
    var feeds = document.getElementById("spineFeeds");
    var record = document.getElementById("recordCore");
    var chip = document.getElementById("l2tok");
    var canopy = document.querySelector(".canopy");
    if (!hero || !svg || !path || !record || !chip) return;

    // The meta-games connect to the Record via the in-canopy "creation" web; the Record's
    // single prominent strand then carries the whole record set down into the L2 ledger
    // (storage). No per-meta feed lines — keeps the funnel from over-crowding the canopy.
    var feedItems = [];

    // S-curve that leaves the source heading down, then sweeps into the shared apex
    function curveTo(x1, y1, x2, y2) {
      var dy = y2 - y1;
      return "M" + x1 + " " + y1 +
        " C" + x1 + " " + (y1 + dy * 0.42) +
        " " + (x1 + (x2 - x1) * 0.62) + " " + (y1 + dy * 0.82) +
        " " + x2 + " " + y2;
    }

    function layout() {
      if (window.innerWidth <= 1024) { svg.style.display = "none"; return; }
      svg.style.display = "block";
      var heroR = hero.getBoundingClientRect();
      svg.setAttribute("viewBox", "0 0 " + hero.clientWidth + " " + hero.clientHeight);
      var cr = chip.getBoundingClientRect();
      var tx = cr.left + cr.width / 2 - heroR.left;   // funnel apex = the L2 ledger intake (top-centre)
      var ty = cr.top - heroR.top;
      // Record — the prominent strand
      var rr = record.getBoundingClientRect();
      var rx = rr.left + rr.width / 2 - heroR.left;
      var ry = rr.bottom - heroR.top;
      if (ty > ry) { path.setAttribute("d", curveTo(rx, ry, tx, ty)); path.style.display = ""; }
      else { path.style.display = "none"; }
      if (cap) { cap.setAttribute("cx", tx); cap.setAttribute("cy", ty); }
      // meta-games — each funnels its record to the same apex
      for (var i = 0; i < feedItems.length; i++) {
        var nr = feedItems[i].node.getBoundingClientRect();
        var nx = nr.left + nr.width / 2 - heroR.left;
        var ny = nr.bottom - heroR.top;
        if (ty > ny + 8) { feedItems[i].path.setAttribute("d", curveTo(nx, ny, tx, ty)); feedItems[i].path.style.display = ""; }
        else { feedItems[i].path.style.display = "none"; }
      }
    }

    var raf = null;
    function schedule() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () { raf = null; layout(); });
    }

    schedule();
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);

    // each L1 settlement pulses the canopy Record — same event the conveyor fires on receipt
    var pulseTimer = null;
    document.addEventListener("tkg:settle", function () {
      if (window.innerWidth <= 1024) return;
      record.classList.add("is-minting");
      clearTimeout(pulseTimer);
      pulseTimer = setTimeout(function () { record.classList.remove("is-minting"); }, 720);
    });
  })();
})();
