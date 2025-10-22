# Getting Started

## Overview

This project includes the Client Assist Frontend (FE), which is designed to connect with the Client Assist Backend (BE).
Currently, the frontend and backend can be run independently, but in future updates, the frontend will be configured to communicate directly with the backend via REST APIs.

## Backend Connection

This frontend connects to the **Client Assist Backend**, so you must start the backend service **before running the frontend**.

You can find the backend repository and setup instructions here:  
https://github.com/imtf-group/client-assist-api

---

### Start the Backend

Follow the backend setup guide to start the backend service locally.  
Once it’s running, note down the backend API URL — it will be needed for frontend configuration.

**Example:**

API_URL=http://localhost:9098/api

## Keycloak Configuration

Both the **frontend** and **backend** use **Keycloak** for authentication. Follow the steps provided in the link below to **download the Keycloak image**, **run it in Docker Desktop**, and **set up Keycloak**:

https://imtf.atlassian.net/wiki/spaces/DEV/pages/edit-v2/1458307093?draftShareId=e880e92d-7ee8-4e92-9288-befd838c08dc#Keycloak-Setup%3A

Make sure that:
- Both frontend and backend use the same **realm**.
- The **client IDs**, **client secrets**, and **issuer URLs** are consistent across both services.

## Running the Frontend with Docker

You can build and run the frontend project using Docker.

### Build the Docker Image
```
docker build -t siron-client-assist-web-ui-image .
```

### Run the Docker Container :

**For Linux/macOS :**
```
docker run -p 3000:3000 \
--add-host host.docker.internal:host-gateway \
--add-host localhost:host-gateway \
-e AUTH_SECRET=your_secret \
-e AUTH_OIDC_ISSUER=http://localhost:8080/realms/your_realm \
-e AUTH_OIDC_CLIENT_ID=your_client_id \
-e AUTH_OIDC_CLIENT_SECRET=your_client_secret \
-e AUTH_TRUST_HOST=true \
-e API_URL=http://localhost:9098/api \
--name siron-client-assist-web-ui \
siron-client-assist-web-ui-image:latest
```
**For Windows powerShell :**
```
docker run -p 3000:3000 `
--add-host host.docker.internal:host-gateway `
--add-host localhost:host-gateway `
-e AUTH_SECRET=your_secret `
-e AUTH_OIDC_ISSUER=http://localhost:8080/realms/your_realm `
-e AUTH_OIDC_CLIENT_ID=your_client_id `
-e AUTH_OIDC_CLIENT_SECRET=your_client_secret `
-e AUTH_TRUST_HOST=true `
-e API_URL=http://localhost:9098/api `
--name siron-client-assist-web-ui `
siron-client-assist-web-ui-image:latest
```

Replace the placeholder values (your_realm, your_client_id, etc.) with your actual Keycloak configuration and Backend API URL.

## Local Development Setup
A dummy .env file is provided in the project. You must create a new .env.local file in the project root to run the frontend locally.

**Step 1: Create .env.local from .env**
```
cp .env .env.local
```
**Step 2: Update .env.local Values
Update the Keycloak and backend connection values as shown below:**
> ```
> AUTH_SECRET=client-assist       # No need to change this value
> 
> AUTH_OIDC_ISSUER=(Issuer URL)   # Get from your Keycloak realm
> 
> AUTH_OIDC_CLIENT_ID=            # Get from your Keycloak client
> 
> AUTH_OIDC_CLIENT_SECRET=        # Get from your Keycloak client
> 
> AUTH_TRUST_HOST=true            # No need to change this value
> 
> API_URL=                        # Your backend API URL
> ```

Example:
> ```
> AUTH_SECRET=client-assist
> 
> AUTH_OIDC_ISSUER=http://localhost:8080/realms/siron-client-assist
> 
> AUTH_OIDC_CLIENT_ID=siron-client-assist-web-ui
> 
> AUTH_OIDC_CLIENT_SECRET=VwiUXGpeTceeWITekU8ci3AZanifgvuq
> 
> AUTH_TRUST_HOST=true
> 
> API_URL=http://localhost:9098/api
> ```


**Step 3: Install Dependencies**
```
npm install
```

**Step 4: Run the Development Server**
```
npm run dev
```

Once the server starts, open your browser and navigate to:
http://localhost:3000

**Notes:**
Trying out semantic release version .
This is example readme file .
Trying with major release.
