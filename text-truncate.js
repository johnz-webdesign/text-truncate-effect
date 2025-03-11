/**
 * Smooth Text Truncation
 * Provides smooth animation when expanding/collapsing truncated text
 */
document.addEventListener("DOMContentLoaded", () => {
  initTruncation();
});

function initTruncation() {
  // Initialize single-line truncation elements
  const singleElements = document.querySelectorAll(".truncate-single");
  singleElements.forEach(setupSingleTruncation);

  // Initialize multi-line truncation elements
  const multiElements = document.querySelectorAll(".truncate-multi");
  multiElements.forEach(setupMultiTruncation);
}

function setupSingleTruncation(element) {
  // Store original content
  const content = element.textContent;

  // Setup initial state
  element.style.height = "24px"; // Initial collapsed height

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

  // If content fits without truncation, add the 'fits-content' class
  if (fullHeight <= 24) {
    element.classList.add("fits-content");
  }

  // Toggle expanded state on click
  element.addEventListener("click", () => {
    if (element.classList.contains("expanded")) {
      // Collapse
      element.style.height = "24px";
      element.classList.remove("expanded");
    } else {
      // Expand
      element.style.height = fullHeight + "px";
      element.classList.add("expanded");
    }
  });
}

function setupMultiTruncation(element) {
  // Number of visible lines when collapsed
  const visibleLines = 6;
  const lineHeight = parseInt(getComputedStyle(element).lineHeight) || 20;
  const collapsedHeight = visibleLines * lineHeight;

  // Set initial height
  element.style.height = collapsedHeight + "px";

  // Create a temp clone to measure full content height
  const clone = element.cloneNode(true);
  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.height = "auto";
  clone.style.width = element.offsetWidth + "px";
  document.body.appendChild(clone);

  // Store the full height for later use
  const fullHeight = clone.offsetHeight;
  document.body.removeChild(clone);

  // If content fits without truncation, add the 'fits-content' class
  if (fullHeight <= collapsedHeight) {
    element.classList.add("fits-content");
  }

  // Handle click to toggle expansion
  element.addEventListener("click", () => {
    if (element.classList.contains("expanded")) {
      // Collapse
      element.style.height = collapsedHeight + "px";
      element.classList.remove("expanded");
    } else {
      // Expand
      element.style.height = fullHeight + "px";
      element.classList.add("expanded");
    }
  });
}
