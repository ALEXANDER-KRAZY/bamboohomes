# Bamboo Homes

Created using React, Next.js 14 app router, TypeScript, JavaScript, TailwindCSS, MongoDB, Node.JS(JavaScript runtime engine), JSX(HTML), Prisma and Cloudinary.

## Setup  the environment

/*create your app with the following command*/
/*or you can use the second command*/
/*first cmd*/
```bash
npx create-next-app --typescript
```
/*second cmd*/
/*and name the name of your project*/
```bash
npx create-next-app@latest ./
```

## Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Installing packages
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-icons
npm install zustand
npm install axios
npm install react-hook-form
npm install react-hot-toast
npm install -D prisma
npx prisma init
```
## Using MOngoDB
in mongodb add ip add 0.0.0.0/0 /*--add entry for easy access from anywhere*/

```bash
npx prisma db push
npm install next-auth @prisma/client @next-auth/prisma-adapter
npm install bcrypt mongodb mongoose next-auth
npm install bcrypt
npm install -D @types/bcrypt
```

## add more packages
```bash
npm install query-string
npm install react-select
npm install leaflet
npm install next-cloudinary
npm install react-date-range
npm install -D @types/react-date-range
```

## add more packages
```bash
npm install world-countries
npm install -D @types/leaflet
npm install react-leaflet
npm install date-fns
```

## Accesory Commands

```bash
npm i next@latest{/*Had to update nextjs along the development period*/}
npm run lint{/*to ensure there are no errrors*/}
{/*PrismaClientInitializationError: Prisma has detected that this project was built on Vercel, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the `prisma generate` command during the build process.*/}
{/*Prisma Client Cache: Sometimes, stale cache or temporary files related to the Prisma client generation process can cause issues. Try clearing the cache or deleting the generated client files (node_modules/@prisma/client) and regenerating the Prisma client*}
npx prisma generate
npm i --save-dev prisma@latest
npm i @prisma/client@latest
```

## Social Logins
* Github
settings/Devsettings/OAuthapps/NewAuthApp

* google
googledeveloperconsole/newproject/api/enableapiandservices/oauthconsentscreen/external/credentials/oauthclientid/authorisedredircturl will be http://localhost:3000/api/auth/callback/google

* cloudinary
settings/upload/add upload preset/signing mode-unsigned/copypresetname

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Files with errors
- .gitignore
- getListingById.ts
- bamboo.ico favicon
- rentmodal.tsx
- trips/page
