

## Book Nest Api

[Repo](https://github.com/inheritance10/book-nest-api) 
github

## Gereksinimler
Node js,
Postgresql,
Prisma CLI (npm install -g prisma)

## Kurulum
Depoyu klonlayın
```bash
git clone <repo-url>
cd <proje-dizini>
```

```bash
$ npm install
```

## .env dosyası oluşturun
```bash
touch .env
```

## .env dosyasına aşağıdaki bilgileri ekleyin
```bash
DATABASE_URL="postgresql://<kullanıcı-adı>:<şifre>@localhost:5432/<veritabanı-adı>?schema=public"

JWT_SECRET_KEY="jwt-secret-key"
JWT_EXPIRES_IN=1
JWT_EXPIRES_IN_UNIT=hours
JWT_REFRESH_SECRET_KEY="jwt-refresh-secret-key"
JWT_REFRESH_EXPIRES_IN=7
JWT_REFRESH_EXPIRES_IN_UNIT=days
```

## Veritabanını oluşturun
```bash
npx prisma generate

npx prisma migrate dev

```

## Seed verileri oluşturun
```bash
npx prisma db seed
```

## Çalıştırma

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



