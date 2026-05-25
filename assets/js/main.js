document.documentElement.classList.add("js-enabled");

const initMenu = () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".siteNav");

  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");

    hamburger.classList.toggle("is-active", !isOpen);
    nav.classList.toggle("is-open", !isOpen);

    hamburger.setAttribute("aria-expanded", String(!isOpen));
    hamburger.setAttribute(
      "aria-label",
      !isOpen ? "メニューを閉じる" : "メニューを開く"
    );
  });
};

const initFvAnimation = () => {
  const fvTexts = document.querySelectorAll(".js-fvText");

  fvTexts.forEach((item, index) => {
    item.animate(
      [
        {
          opacity: 0,
          transform: "translateY(18px)",
        },
        {
          opacity: 1,
          transform: "translateY(0)",
        },
      ],
      {
        duration: 900,
        delay: 300 + index * 180,
        easing: "cubic-bezier(.22, .61, .36, 1)",
        fill: "forwards",
      }
    );
  });
};

const initMarkerAnimation = () => {
  const markers = document.querySelectorAll(".markerText");

  if (!markers.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-active");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.5,
    }
  );

  markers.forEach((marker) => {
    observer.observe(marker);
  });
};

const initSectionAnimation = () => {
  const sections = document.querySelectorAll(".js-animateSection");

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const items = entry.target.querySelectorAll(".js-fadeUp");

        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("is-active");
          }, index * 140);
        });

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.25,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
};

const initServiceLineAnimation = () => {
  const serviceSection = document.querySelector(".service");
  const serviceDot = document.querySelector(".service__dot");

  if (!serviceSection || !serviceDot) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        serviceDot.classList.add("is-active");
        observer.unobserve(serviceSection);
      });
    },
    {
      threshold: 0.4,
    }
  );

  observer.observe(serviceSection);
};

const initDemoForm = () => {
  const form = document.querySelector("[data-demo-form]");

  if (!form) return;

  const message = form.querySelector(".formMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!message) return;

    message.hidden = false;
    message.textContent = "送信デモが完了しました。静的サイトのため、入力内容は実際には送信されていません。";
    form.reset();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initFvAnimation();
  initMarkerAnimation();
  initSectionAnimation();
  initServiceLineAnimation();
  initDemoForm();
});
