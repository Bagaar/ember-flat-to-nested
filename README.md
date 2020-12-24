# Ember Flat to Nested

[![CI](https://github.com/bertdeblock/ember-flat-to-nested/workflows/CI/badge.svg)](https://github.com/bertdeblock/ember-flat-to-nested/actions?query=workflow%3ACI)

Transforms a **flat colocated** component structure to a **nested colocated** component structure.

- Works for projects and addons
- Supports reverting to a flat colocated component structure

> **NOTE:** Use [ember-component-template-colocation-migrator](https://github.com/ember-codemods/ember-component-template-colocation-migrator) if you want to transform a **classic** component structure to a **flat or nested colocated** component structure.

## 👨‍💻 Usage

### Flat to Nested

```shell
cd your/project-or-addon/path
npx github:bertdeblock/ember-flat-to-nested
```

> **NOTE:** Components that are already nested, are left untouched.

#### Before

```
your-project-name
├── app
│   └── components
│       ├── foo
│       │   ├── bar.hbs
│       │   └── bar.js
│       ├── foo.hbs
│       └── foo.js
│   ...
```

#### After

```
your-project-name
├── app
│   └── components
│       └── foo
│           ├── bar
│           │   ├── index.hbs
│           │   └── index.js
│           ├── index.hbs
│           └── index.js
│   ...
```

### Nested to Flat

```shell
cd your/project-or-addon/path
npx github:bertdeblock/ember-flat-to-nested --revert
```

> **NOTE:** Components that are already flat, are left untouched.

#### Before

```
your-project-name
├── app
│   └── components
│       └── foo
│           ├── bar
│           │   ├── index.hbs
│           │   └── index.js
│           ├── index.hbs
│           └── index.js
│   ...
```

#### After

```
your-project-name
├── app
│   └── components
│       ├── foo
│       │   ├── bar.hbs
│       │   └── bar.js
│       ├── foo.hbs
│       └── foo.js
│   ...
```
