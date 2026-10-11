(function () {
  const config = window.CSD_DOWNLOADS || {};
  const appFile = config.appFile || "Crypto-Signal-Desk-1.2.0.exe";
  const sourceFile = config.sourceFile || "CryptoSignalDesk-source.zip";
  const base = (config.releaseBase || "").trim();
  const isPlaceholder = base.includes("YOUR_GITHUB_USERNAME");
  const isRelease = base.startsWith("https://github.com/") && !isPlaceholder;
  const baseUrl = isRelease ? base.replace(/\/+$/, "") + "/" : "downloads/";
  const buttons = [
    [document.getElementById("windows-download"), appFile],
    [document.getElementById("windows-download-bottom"), appFile],
    [document.getElementById("source-download"), sourceFile]
  ];

  buttons.forEach(function (item) {
    const anchor = item[0];
    if (!anchor) return;
    anchor.href = baseUrl + encodeURIComponent(item[1]);
    anchor.setAttribute("download", item[1]);
  });

  const version = config.version || "1.2.0";
  const versionLabel = document.getElementById("version-label");
  const bottomVersion = document.getElementById("bottom-version");
  const sizeLabel = document.getElementById("download-size");
  if (versionLabel) versionLabel.textContent = "Version " + version;
  if (bottomVersion) bottomVersion.textContent = "Version " + version + " · Windows 64-bit";
  if (sizeLabel) sizeLabel.textContent = config.sizeLabel || "Portable download";

  if (isPlaceholder) {
    const note = document.getElementById("config-note");
    if (note) {
      note.hidden = false;
      note.textContent = "Before publishing, update releaseBase in download-config.js with your GitHub username and repository name.";
    }
    buttons.forEach(function (item) {
      if (item[0]) {
        item[0].href = "#download";
        item[0].classList.add("download-unavailable");
        item[0].setAttribute("aria-disabled", "true");
        item[0].setAttribute("aria-label", "Configure the GitHub release link before publishing");
        item[0].addEventListener("click", function (event) { event.preventDefault(); });
      }
    });
  }
}());
