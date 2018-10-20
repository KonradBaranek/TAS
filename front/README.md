# Podstawowe komendy

## Postawienie serwera z angularem
```
ng serve -open
```

## Zbildowanie frontu
```
ng build
```
Zbildowana aplikacja znajduje się w folderze backend/public
Mamy wtedy dostęp do niej z node. Routing z widokami np. widok logowania, widok koszyka itd. powinniśmy robić w angularze, a nie w serwerze. Serwer powinien tylko wyrzucać angularową apkę i udostępniać routingi do komunikacji z bazą danych.

## Angular Bootstrap
Do projektu dodałem ngBootsrap/Bootstrap 4 więc nie musicie się bawić w stylowanie wszystkiego samemu w css no i strona jest responsywna
[Strona ngBootstrap](https://ng-bootstrap.github.io/#/getting-started)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
