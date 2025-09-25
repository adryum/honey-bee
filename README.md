# Honey-bee
Mājaslapa biškopjiem, kas atvieglo darbu ar bišu saistītu datu - dravu, stropu, inventāra - meklēšanu, pierakstu/piezīmju veidošanu, apstrādi un apkopošanu.

# Sistēmas izstrādes rīki
### vue 3 vite
Progresīvs 'single page' mājaslapu veidošanas freimworks, kas atvieglo darbu ar mājaslapu veidošanu.

### SASS
CSS pārveidotājs, kurš būtiski atvieglo elementu stila/dizaina veidošanu.

### dotenv
dotenv palīdz nodrošināt projektu. Katram lietotājam ir jāuzstāda sava 'datu vide', lai palaistu backendu un frontendu.

### nodemon
Komandlīniju instruments, kas ātri restartē serveri uz katras servera koda izmaiņas.

# Kā uzstādīt sistēmu.
Pirms projekta palaišanas, uz sistēmas ir jābūt uzinstalētam Node.js

## Uzstādīt vue 3 vite

```sh
npm install
```

## Uzinstalēt SASS priekš frontenda (Vieglāk saprotamāks un rakstāms CSS)

```sh
npm install -g sass
```
## Uzstādīt dotenv
Šis ir jāinstalē gan backendā, gan frontendā, vai tikai kopējā modulī, kuru izmanto abi divi. 

### Instalēt dotenv
```sh
npm install dotenv
```

### Aizpildīt backend (servera) vidi jeb .env failu
<> - šinīs vietās bez '<>' ir jāizpilda ar vajadzīgajiem datiem

MYSQL_HOST='<Datubāzes IP>' <br>
MYSQL_USER='<Datubāzes users, piemēram, root>'<br>
MYSQL_PASSWORD='<Datubāzes Parole>'<br>
MYSQL_DATABASE='<Datubāzes nosaukums>'<br>

### Aizpildīt frontend vidi jeb .env failu
VITE_API=<Datubāzes API pieprasījumu links ar serverpusē norādīto portu '5000', bija: http://localhost:5000>

# Kā palaist sistēmu

## Ieslēgt serveru
1. terminālī ir jāatver mape/direktorijs ' backend '<br>
2. Jāpalaiž serveris ar komandu 'node server.js'

```sh
cd server
npx nodemon src/server.ts
```

## Ieslēgt frontendu
1. terminālī ir jāatver mape/direktorijs ' frontend '<br>
2. Jāpalaiž mājaslapa ar komandu 'npm run dev'<br>
3. Jāatver terminālī parādītais local http links.

```sh
cd website
npm run dev
```