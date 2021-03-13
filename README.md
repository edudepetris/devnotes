# 💻 Devnotes

* Ruby version 3.0.0

## Setup

```sh-session
bundle
yarn
bin/rails db:create
bin/rails db:migrate
bin/rails db:seed
```

## Starting Up

```sh-session
docker-compose up -d
bin/rails s
bin/webpack-dev-server # optional
```

#### Run tests

```sh-session
docker-compose up -d
bin/rails test
bin/rails test:system
```

#### React HMR

- Not working with ssr at the moment. [#985](https://github.com/reactjs/react-rails/issues/985)
- [↗](https://github.com/gaearon/react-hot-loader#getting-started) Make sure react-hot-loader is required before react and react-dom. [e.g](https://github.com/edelgado/react-rails-hmr/blob/b224230804643a31e31cb48122eced0e1feb0b91/app/javascript/components/HelloWorld.js#L1)
