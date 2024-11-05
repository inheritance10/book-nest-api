

## Book Nest Api

[Repo](https://github.com/inheritance10/book-nest-api) 
github

## Kullanılan Teknolojiler
- Node js
- Nest js
- Prisma
- Postgresql
- JWT
- Swagger

## Neden Nest js?
NestJS, Node.js üzerinde çalışan ve TypeScript ile geliştirilmiş bir back-end framework'üdür. Modüler yapısı, Dependency Injection (bağımlılık enjeksiyonu) desteği ve MVC (Model-View-Controller) yapısı ile organize ve ölçeklenebilir projeler oluşturmayı kolaylaştırır.


## Neden Prisma?
Prisma, veritabanı yönetimi için modern bir ORM (Object-Relational Mapping) aracıdır. Veritabanı yapısını kodda modelleyerek veritabanı sorgularını daha okunabilir ve TypeScript desteği ile güvenli hale getirir. Otomatik veri modellemesi ve migrasyon desteği sunar.

## Neden Postgresql?
PostgreSQL, güçlü ve açık kaynaklı bir ilişkisel veritabanı yönetim sistemidir. ACID uyumlu yapısı ve zengin veri tipleri ile yüksek performanslı ve güvenilir bir veritabanı çözümüdür.

## JWT (JSON Web Token)
JWT, kullanıcı kimlik doğrulama süreçlerinde yaygın olarak kullanılan bir JSON formatında token yapısıdır. Kullanıcı oturumlarını güvenli ve taşınabilir bir şekilde yönetmek için kullanılır. JWT, kullanıcıya verilen yetkilerin doğrulanmasını sağlar ve yeniden oturum açmayı gerektirmeden doğrulama yapılmasını mümkün kılar.

## Swagger
Swagger, API dokümantasyonunu otomatik olarak oluşturmak ve test etmek için kullanılan bir araçtır. NestJS ile entegre edilebilir ve proje geliştirilirken API'lerin nasıl çalıştığını anlamayı kolaylaştırır. Swagger, özellikle Rest API'lerin nasıl kullanılacağı konusunda geliştiricilere rehberlik eder.

## Tablo Diagramı

![image](https://github.com/user-attachments/assets/a368cb79-a0e4-438e-a7d8-b0ce0fc00d73)

Bu iki tablo arasında bir "birden çoğa" (one-to-many) ilişkisi bulunuyor. Yani bir User birden fazla Book ile ilişkilendirilebilir, ancak her Book sadece bir User ile ilişkilidir.

İlişki Açıklaması
Birden Çoğa İlişki:
User tablosundaki her bir kayıt, Book tablosunda birden fazla kitap kaydıyla ilişkili olabilir.
Book tablosundaki her kayıt, User tablosunda yalnızca bir kullanıcıya (userId yabancı anahtar (FK) alanı ile) bağlıdır.

## Prisma Kod Açıklaması
User tablosunda, books alanı Book[] türünde tanımlanmış, yani bir kullanıcı birden fazla kitap ile ilişkilendirilebilir.
Book tablosunda userId alanı, User tablosunun id alanına referans olarak tanımlanmıştır. Bu, her kitabın bir kullanıcıya ait olduğunu belirtir.
@relation(fields: [userId], references: [id]) ifadesi, userId alanını User tablosundaki id alanına bağlayarak iki tablo arasındaki ilişkiyi tanımlar.
Bu ilişki, veri tabanında her Book kaydının yalnızca bir User kaydına ait olmasını sağlar ve User kaydının birden fazla Book kaydıyla ilişkili olmasına izin verir.

## Akış Diyagramı

![image](https://github.com/user-attachments/assets/172eb40c-c6d6-493b-9e48-dbaa0b40b08e)

## Diyagram Detayları
Frontend Kullanıcı Girişi:
Kullanıcı adı ve şifre bilgileri, giriş yapmak için frontend arayüzünden backend’e gönderilir.
Backend Kimlik Doğrulama:
Backend, gelen bilgileri doğrular.
Bilgiler doğruysa, JWT oluşturur ve frontend’e gönderir.
JWT ile Yetkilendirilmiş İstek:
Frontend, JWT'yi alır ve daha sonraki yetkilendirilmiş isteklerde (örneğin, kitap listesi alma gibi) bu token'ı backend’e gönderir.
Backend JWT Doğrulama ve Veritabanı İşlemleri:
Backend, gelen JWT token'ı doğrular.
Token geçerliyse, istenilen veritabanı işlemi gerçekleştirilir (örneğin, Prisma kullanarak Book tablosundan veri çekilir).
Yanıt Gönderimi:
Backend, veritabanından aldığı yanıtı frontend’e döner ve frontend bu yanıtı kullanıcıya gösterir.


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





