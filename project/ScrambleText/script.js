const el = document.querySelector(".scramble");
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

el.addEventListener("mouseover", () => {
  const text = el.dataset.text;
  let i = 0;

  const interval = setInterval(() => {
    el.textContent = text
      .split("")
      .map((char, index) =>
        index < i
          ? char
          : chars[Math.floor(Math.random() * chars.length)]
      )
      .join("");

    i++;

    if (i > text.length) clearInterval(interval);
  }, 50);
});
