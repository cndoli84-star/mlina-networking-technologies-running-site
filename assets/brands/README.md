# MLINA Technology Carousel Brand Artwork

The carousel loads local SVG files from this folder. This avoids third-party image hotlinks and keeps the artwork under the website's asset paths.

## Files in this folder

There are 24 brand SVG assets. Eight use brand icons sourced from the Simple Icons project (Cisco, MikroTik, Ubiquiti, TP-Link, Juniper Networks, Bosch, Fortinet and Panasonic). The other 16 are custom-coloured typographic brand illustrations created for this website's carousel. They are **not official manufacturer logo files** and should not be represented as official marks or evidence of an authorised partnership.

The brand names and trademarks belong to their respective owners. For a formal partner page or co-branding use, replace each custom illustration with the exact official artwork supplied or published by the manufacturer, and follow that manufacturer's trademark/brand-use rules.

## Replacing an illustration with an official logo

1. Obtain the logo from the manufacturer's official media, press, partner or brand-assets page.
2. Prefer SVG with a transparent background. A transparent PNG is also suitable.
3. Keep the existing filename where possible (for example, `hikvision.svg`, `dahua.svg`, `ruckus.svg`, `aruba.svg`, `zkteco.svg`, `suprema.svg`, `grandstream.svg`, `yeastar.svg`, `avaya.svg`, `commscope.svg`, `panduit.svg`, or `yealink.svg`).
4. Upload the replacement file to this folder in GitHub and commit to `main`. The carousel already references these local filenames, so no HTML change is needed if the filename stays the same.

For PNG, keep the same base filename but update the corresponding `src` in the page HTML to the .png extension. Aim for at least 300 px wide and retain a transparent background.

The custom artwork is designed to make the carousel visually consistent and colourful, but it is not a substitute for approved corporate logo artwork.
