
# Pocket Identity Directory Frontend

Pocket Identity Directory is my first Onboarding Dev Task for ROIABLE.
It's purpose is to use SAP Identity Authentication Service Identity Directory API to manage data from IAS Tenant.
And this is the frontend for it, being served through SAP AppRouter.

## Tech Stack

**Server:** https://github.com/Pocket-Hub/PocketIdentityDirectory

**Frontend:** React ^19, Vite ^7, eslint ^9, AppRouter ^20
## Additional Packages

`react-hot-toast`

`react-router-dom`

## How To Run/Build
Install Dependencies:

    npm install

Run in development mode:

    npm run dev

Build for production:

    npm run build

Install SAP Approuter Dependencies:

    npm install (from AppRouter project root)

Start SAP Approuter:
    
    npm start (this runs node node_modules/@sap/approuter/approuter.js)

## Deployment

1. Install React app dependencies - npm install
2. Build React app - npm run build(this generates /dist in the approuter folder)
3. Deploy the Approuter.

## SAP Instances

- Cloud Identity Services application instance

## Authors


- Hyusein Hyuseinov -  [@Pocket-Hub](https://github.com/Pocket-Hub)

