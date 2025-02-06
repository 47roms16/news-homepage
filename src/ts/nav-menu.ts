export default function initListeners() {
  const navOpenBtn = document.querySelector(
    ".js-open-nav-btn",
  ) as HTMLButtonElement;
  const navCloseBtn = document.querySelector(
    ".js-close-nav-btn",
  ) as HTMLButtonElement;
  const mobileNavWrap = document.querySelector(".mobile-nav") as HTMLDivElement;

  navOpenBtn?.addEventListener("click", () =>
    toggleMobileNav(mobileNavWrap, navOpenBtn),
  );
  navCloseBtn?.addEventListener("click", () =>
    toggleMobileNav(mobileNavWrap, navOpenBtn),
  );

  mobileNavWrap.addEventListener("click", (e: MouseEvent) =>
    closeNavOnOutside(e, mobileNavWrap, navOpenBtn),
  );
}

function toggleMobileNav(
  mobileNavWrap: HTMLDivElement,
  navOpenBtn: HTMLButtonElement,
): void {
  mobileNavWrap.classList.toggle("hidden");

  const isNavVisible = !mobileNavWrap.classList.contains("hidden");

  document.body.classList.toggle("overflow-y-hidden", isNavVisible);

  updateAriaAttributes(mobileNavWrap, navOpenBtn, isNavVisible);
}

function closeNavOnOutside(
  e: MouseEvent,
  mobileNavWrap: HTMLDivElement,
  navOpenBtn: HTMLButtonElement,
): void {
  const navElem = mobileNavWrap.querySelector("nav") as HTMLElement;
  const navElemRect = navElem.getBoundingClientRect();

  const isOutsideNavElem = e.clientX < navElemRect.left;

  if (isOutsideNavElem) {
    toggleMobileNav(mobileNavWrap, navOpenBtn);
  }
}

function updateAriaAttributes(
  mobileNavWrap: HTMLDivElement,
  navOpenBtn: HTMLButtonElement,
  isNavVisible: boolean,
): void {
  mobileNavWrap.ariaHidden = isNavVisible ? "false" : "true";
  navOpenBtn.ariaExpanded = isNavVisible ? "true" : "false";
}
