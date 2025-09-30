This is the front-end for the Siron Client Assist project. It is built using Next.js and TypeScript.

## Getting Started

You can simply build the project with docker by running the following command:

```bash
docker build -t siron-client-assist-fe-image .
```

Then, you can run the docker container with the following command:
```
docker run -p 3000:3000 \
-e AUTH_SECRET=secret \
-e AUTH_OIDC_ISSUER=issuer \
-e AUTH_OIDC_CLIENT_ID=client_id \
-e AUTH_OIDC_CLIENT_SECRET=secret \
-e AUTH_TRUST_HOST=true \
-e API_URL=api_url \
--name siron-client-assist-fe siron-client-assist-fe-image
```

## Development

First, create a `.env.local` file in the root of the project and set the variables defined in the `.env` file.

Then, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend Connection

This frontend connects to the Siron Client Assist Backend.

You can find the backend repository here and follow the setup instructions:
https://github.com/imtf-group/siron-client-assist-backend

Make sure to set the API_URL environment variable in your .env.local file or Docker run command so the frontend can reach the backend.

For example:
API_URL=http://localhost:8080/api

Once both frontend and backend are running, the application will be fully functional.