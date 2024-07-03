# Roadmap
### Components

- [ ] **ASAP** Redesign approach for `Context Menus`.

### Accessability
[Статья Дока: ARIA-атрибуты](https://doka.guide/a11y/aria-attrs/)

[Статья Дока: Как описывать картинки](https://doka.guide/a11y/how-to-describe-pictures/)

- [ ] Use two languages `ru`, `en`  with `i11n`.
- [ ] Describe `images` and `SVGs` if needed.
- [ ] Provide necessary `aria` attributes.
- [ ] Provide necessary `aria` roles.

### Touch screens
[Статья ХАБР: Как ваш браузер обрабатывает прикосновения к экрану телефона (js touch events)](https://habr.com/ru/articles/592317/).

[Хабр Q&A: Как проверить, что экран сенсорный и не используется мышь?](https://qna.habr.com/q/81952)

- [ ] Provide correct `event listeners`.

  - [ ] Function to detect type of device and support for `touch` events.

  - [ ] `useButtonProps`
    - [ ] `onClick` for mouse.
    - [ ] `onPointer` for touch.
    - [ ] `onTouch` for iOS.

  - [ ] `useContextMenuProps`
    - [ ] `onContextMenu` for mouse.
    - [ ] `onPointerDown` with 1 second delay for touch.
    - [ ] `onTouchStart` with 1 second delay for iOS.

### Adaptive

- [ ] `auth/login`
- [ ] `auth/register`
- [ ] `messenger`
- [ ] `messenger/c`

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
