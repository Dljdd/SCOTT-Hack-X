import React from 'react';
import './landing-page.css'; // Import your CSS files
import './styleguide.css';
import './globals.css';

function LandingPage() {
  const isHidden = (e) => {
    if (!(e instanceof HTMLElement)) return false;
    if (getComputedStyle(e).display === "none") return true;
    else if (e.parentNode && isHidden(e.parentNode)) return true;
    return false;
  };

  const loadAsyncSrcForTag = (tag) => {
    const elements = document.getElementsByTagName(tag);
    const toLoad = [];
    for (let i = 0; i < elements.length; i++) {
      const e = elements[i];
      const src = e.getAttribute("src");
      const loaded = src !== undefined && src.length > 0 && src !== "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
      if (loaded) continue;
      const asyncSrc = e.getAttribute("anima-src");
      if (asyncSrc === undefined || asyncSrc.length === 0) continue;
      if (isHidden(e)) continue;
      toLoad.push(e);
    }
    // Top first
    toLoad.sort((a, b) => {
      return getTop(a) - getTop(b);
    });
    for (let i = 0; i < toLoad.length; i++) {
      const e = toLoad[i];
      const asyncSrc = e.getAttribute("anima-src");
      e.setAttribute("src", asyncSrc);
    }
  };

  const pauseHiddenVideos = () => {
    const elements = document.getElementsByTagName("video");
    for (let i = 0; i < elements.length; i++) {
      const e = elements[i];
      const isPlaying = !!(e.currentTime > 0 && !e.paused && !e.ended && e.readyState > 2);
      const isHiddenStatus = isHidden(e);
      if (!isPlaying && !isHiddenStatus && e.getAttribute("autoplay") === "autoplay") {
        e.play();
      } else if (isPlaying && isHiddenStatus) {
        e.pause();
      }
    }
  };

  const loadAsyncSrc = () => {
    loadAsyncSrcForTag("img");
    loadAsyncSrcForTag("iframe");
    loadAsyncSrcForTag("video");
    pauseHiddenVideos();
  };

  const getTop = (e) => {
    let top = 0;
    do {
      top += e.offsetTop || 0;
      e = e.offsetParent;
    } while (e);
    return top;
  };

  // On load
  loadAsyncSrc();

  // On resize
  let old_onResize = window.onresize;
  let new_onResize = undefined;

  const updateOnResize = () => {
    if (new_onResize === undefined || window.onresize !== new_onResize) {
      new_onResize = (x) => {
        if (old_onResize !== undefined) old_onResize(x);
        loadAsyncSrc();
      };
      window.onresize = new_onResize;
      // Make sure not overridden
      setTimeout(() => {
        updateOnResize();
      }, 3000);
    }
  };
  updateOnResize();

  // IE
  setTimeout(() => {
    loadAsyncSrc();
  }, 200);

  return (
    <div className="index">
      <div className="overlap-wrapper">
        <div className="overlap">
          <p className="improve-your">
            Improve Your Business Operations with &#34;SCOTT&#34; to Optimize Your Resources. Our User-Friendly Design
            and Intuitive Navigation Streamline the Process of Accessing Essential Information.
          </p>
          <div className="hero">
            <div className="overlap-group">
              <div className="lllama">
                <div className="div-wrapper">
                  <div className="text-wrapper">Powered by Llama 2⚡️</div>
                </div>
              </div>
              <p className="leverage-the-power">
                Leverage the power of Blockchain &amp; AI <br />
                for Supply Chain
              </p>
              <p className="experience-seamless">
                Experience Seamless Supply Chain Transformation with <br />
                SCOTT:&nbsp;&nbsp;Supply Chain Optimisation using Transparency Technology
              </p>
              <img
                className="wave-transparent"
                alt="Wave transparent"
                src="https://cdn.animaapp.com/projects/64f20d280680a72174ed78c5/releases/65046384563939b650df94ba/img/wave-transparent-background-illustration-free-png-1.png"
              />
            </div>
          </div>
          <div className="navbar">
            <div className="div">
              <div className="rectangle" />
              <div className="text-wrapper-2">Data</div>
              <div className="text-wrapper-3">Optimize</div>
              <div className="text-wrapper-4">Login</div>
              <div className="text-wrapper-5">Sign up</div>
              <img
                className="logolight"
                alt="Logolight"
                src="https://cdn.animaapp.com/projects/64f20d280680a72174ed78c5/releases/65046384563939b650df94ba/img/logolight--1--1.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;