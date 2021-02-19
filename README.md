docker build . -t credit-request-ui
docker container run -p 8080:8080 --rm -it -v "$(pwd)":/usr/src/app credit-request-ui npm run serve

docker container run --rm -it -v "$(pwd)":/usr/src/app credit-request-ui bash


# app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
