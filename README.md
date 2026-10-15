# JUMPWIRE Website

Source for the JUMPWIRE website at [jumpwire.cn](https://jumpwire.cn). The site is built with React and Vite; the published site is static.

## Local development

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
```

The build creates `dist/`, which contains the site ready to serve from a static web root. The prebuild steps generate the English pages and browser-language detection script. Site images, standalone pages, and other public assets live in `public/`.
