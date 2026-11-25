# MLINA Technology Carousel Brand Logos

Place brand logo image files in this folder. The carousel uses local assets so it does not depend on third-party image hosts.

## Logos already installed

- cisco.svg
- mikrotik.svg
- ubiquiti.svg
- tplink.svg
- junipernetworks.svg
- bosch.svg
- fortinet.svg
- panasonic.svg

These eight icon SVGs were sourced from the Simple Icons project: https://github.com/simple-icons/simple-icons . Brand names and trademarks remain the property of their respective owners.

## Add the remaining manufacturer logos

For each additional brand:
1. Download its official logo from the manufacturer's website, preferably its press, media, or brand-assets page.
2. Prefer SVG with a transparent background. A transparent PNG is also suitable.
3. Save it in this folder using a short lowercase filename, for example `hikvision.svg`, `dahua.svg`, `axis.svg`, `zkteco.svg`, `suprema.svg`, `ruckus.svg`, `aruba.svg`, `ruijie.svg`, `sophos.svg`, `grandstream.svg`, `yeastar.svg`, `avaya.svg`, `commscope.svg`, `panduit.svg`, or `yealink.svg`.
4. In the corresponding card in the page HTML, replace the letter tile (`<span class="brand-mark">...</span>`) with:
   `<img class="brand-logo" src="assets/brands/your-file.svg" alt="Brand name logo" loading="lazy">`
5. Commit the file and HTML change to the `main` branch. Use the exact filename and extension.

If you use PNG, change the image source to the .png filename. Keep the logo image transparent and use a reasonably high-resolution image (ideally at least 300 px wide). Do not hotlink logos from search-result preview URLs.

The carousel CSS automatically sizes local logos. If you send the logo files here, they can be added to this folder and wired into the carousel for you.
