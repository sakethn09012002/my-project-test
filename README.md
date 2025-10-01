# Backend Connection
 
This frontend connects to the Siron Client Assist Backend.
 
You can find the backend repository here and follow the setup instructions:
 
https://github.com/imtf-group/siron-client-assist-backend
 
Make sure to set the API_URL environment variable in your .env.local file or Docker run command so the frontend can reach the backend.
 
For example:
 
API_URL=http://localhost:8080/api
 
The frontend and backend must use the same Keycloak realm and clients.



 
# keycloak Configuration
 
The frontend uses Keycloak for authentication. 

Key points:
 
**Realm**– must match the backend realm.
 
**Frontend Client** – a client in the same realm, configured for public or confidential access depending on your setup.
 
**Client Secret** – needed if the frontend client is confidential.
 
**Issuer URL** – points to the Keycloak realm, e.g., http://localhost:8080/realms/siron-client-assist.
 
The frontend uses these Keycloak settings via environment variables:
```
AUTH_OIDC_ISSUER
AUTH_OIDC_CLIENT_ID
AUTH_OIDC_CLIENT_SECRET
AUTH_SECRET
AUTH_TRUST_HOST
```


**Environment Variables**
 
The project includes a dummy .env file. Copy it to .env.local and update it with your values:
```
cp .env .env.local
```
 
Edit .env.local to set:
```
API_URL=http://localhost:8080/api
AUTH_SECRET=your_secret
AUTH_OIDC_ISSUER=http://localhost:8080/realms/your_realm
AUTH_OIDC_CLIENT_ID=your_client_id
AUTH_OIDC_CLIENT_SECRET=your_client_secret
AUTH_TRUST_HOST=true
```


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
 
Copy the dummy .env file and update it:
```
cp .env .env.local
```
 
Install dependencies:
```
npm install
 
```
Run the development server:
```
npm run dev
```
 
Open http://localhost:3000  in your browser to see the result.
 
Once both frontend and backend are running, the application will be fully functional.
 
