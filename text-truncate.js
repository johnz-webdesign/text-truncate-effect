/**
 * Smooth Text Truncation
 * Provides smooth animation when expanding/collapsing truncated text on hover
 */
document.addEventListener("DOMContentLoaded", () => {
  initTruncation();
  // Add window resize handler to recalculate heights
  window.addEventListener(
    "resize",
    debounce(() => {
      initTruncation();
    }, 250)
  );
});

// Debounce function to prevent excessive recalculation on resize
function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

function initTruncation() {
  // Initialize single-line truncation elements
  const singleElements = document.querySelectorAll(".truncate-single");
  singleElements.forEach(setupSingleTruncation);

  // Initialize multi-line truncation elements
  const multiElements = document.querySelectorAll(".truncate-multi");
  multiElements.forEach(setupMultiTruncation);
}

function setupSingleTruncation(element) {
  // Setup initial state - make sure to get exact line height
  const computedStyle = window.getComputedStyle(element);
  const lineHeight = parseInt(computedStyle.lineHeight) || 24;

  // Set precise height for a single line
  element.style.height = lineHeight + "px";

  // Create a hidden clone to measure full content height
  const clone = element.cloneNode(true);
  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.height = "auto";
  clone.style.width = element.offsetWidth + "px";
  clone.style.whiteSpace = "normal";
  document.body.appendChild(clone);

  // Store the full height for later use
  const fullHeight = clone.offsetHeight;
  document.body.removeChild(clone);

  // Create data attribute to store the heights
  element.dataset.collapsedHeight = lineHeight;
  element.dataset.expandedHeight = fullHeight;

  // Add mouseenter event listener with RAF for smoothness
  element.addEventListener("mouseenter", () => {
    requestAnimationFrame(() => {
      element.style.height = fullHeight + "px";
    });
  });

  // Add mouseleave event listener with RAF for smoothness
  element.addEventListener("mouseleave", () => {
    requestAnimationFrame(() => {
      element.style.height = lineHeight + "px";
    });
  });
}

function setupMultiTruncation(element) {
  // Get exact line height from computed style
  const computedStyle = window.getComputedStyle(element);
  const lineHeight = parseInt(computedStyle.lineHeight) || 24;

  // Number of visible lines when collapsed - exactly 6 lines
  const visibleLines = 6;

  // Calculate precise height for exactly 6 lines
  const collapsedHeight = visibleLines * lineHeight;

  // First make sure we apply the collapsed state correctly
  element.style.overflow = "hidden";
  element.style.display = "-webkit-box";
  element.style.webkitBoxOrient = "vertical";
  element.style.webkitLineClamp = "6";
  element.style.height = collapsedHeight + "px";

  // Create a temp clone to measure full content height
  const clone = element.cloneNode(true);
  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.height = "auto";
  clone.style.width = element.offsetWidth + "px";
  clone.style.webkitLineClamp = "unset";
  clone.style.display = "block"; // Change display to measure properly
  document.body.appendChild(clone);

  // Store the full height for later use
  const fullHeight = clone.offsetHeight;
  document.body.removeChild(clone);

  // Store heights for later use
  element.dataset.collapsedHeight = collapsedHeight;
  element.dataset.expandedHeight = fullHeight;

  // Add mouseenter event listener
  element.addEventListener("mouseenter", () => {
    requestAnimationFrame(() => {
      element.style.webkitLineClamp = "unset";
      element.style.height = fullHeight + "px";
    });
  });

  // Add mouseleave event listener
  element.addEventListener("mouseleave", () => {
    requestAnimationFrame(() => {
      element.style.webkitLineClamp = "6";
      element.style.height = collapsedHeight + "px";
    });
  });
}
