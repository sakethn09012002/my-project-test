# Backend Connection
 
This frontend connects to the Siron Client Assist Backend, So first start the backend service.
 
You can find the backend repository here and follow the setup instructions:
 
https://github.com/imtf-group/siron-client-assist-backend
 
To connect frontend and backend we need backend API_URL so keep it noted so we can use it later in the frontend.

For example:

API_URL=http://localhost:8080/api
 
The frontend and backend must use the same Keycloak realm and clients.



 
# keycloak Configuration
 
Both the frontend and backend uses the same Keycloak for authentication. You can follow the steps given in the link below to setup keycloak.

https://imtf.atlassian.net/wiki/spaces/DEV/pages/edit-v2/1458307093?draftShareId=e880e92d-7ee8-4e92-9288-befd838c08dc#Keycloak-Setup%3A


# Getting Started
 
You can build the project with Docker by running the following command:
 
docker build -t siron-client-assist-fe-image .
 
 
Then, run the Docker container with:
```
docker run -p 3000:3000 \
-e AUTH_SECRET=your_secret \
-e AUTH_OIDC_ISSUER=http://localhost:8080/realms/your_realm \
-e AUTH_OIDC_CLIENT_ID=your_client_id \
-e AUTH_OIDC_CLIENT_SECRET=your_client_secret \
-e AUTH_TRUST_HOST=true \
-e API_URL=http://localhost:8080/api \
--name siron-client-assist-fe siron-client-assist-fe-image
```


# Development

There is a dummy .env file given in the project to follow the structure for the new .env.local file which should be created in the project root.

Follow the steps create .env.local file and run the project in local.
 
Copy the dummy .env file and create a new .env.local file and update it:
```
cp .env .env.local
```
 
**Update the .env.local file values with your keycloak values and your Backend API_URL :**

AUTH_SECRET=cs-tooling  `// No need to change the  value`

AUTH_OIDC_ISSUER= `// Get the value from your keycloak`
AUTH_OIDC_CLIENT_ID= `// Get the value from your keycloak`
AUTH_OIDC_CLIENT_SECRET= `// Get the value from your keycloak`
AUTH_TRUST_HOST=true `// No need to change the value`
 
API_URL=http://localhost:8080 `// Your backend API_URL`


**Install dependencies:**
```
npm install
 
```
**Run the development server:**
```
npm run dev
```
 
Open http://localhost:3000  in your browser to see the result.
 
Once both frontend and backend are running, the application will be fully functional.
 
