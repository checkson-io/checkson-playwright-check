# checkson-playwright-check

This repo open a website using Playwright and makes a screenshot.

## Run check locally

```
npx playwright install chromium
npm start
```

## Run check locally via Docker

```
docker run \
  --env CHECKSON_DIR=/tmp \
  --rm \
  -it \
  ghcr.io/checkson-io/checkson-playwright-check:main
```
