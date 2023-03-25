# Getting started
This was made with npm `9.4.2` and might not work for earlier or later major versions.

## Set up
1. setup public key and private key information for JWT authentication.

Run the following and note that you'll need to enter the same password three times:
```
mkdir keypair
ssh-keygen -t rsa -b 4096 -m PEM -f keypair/private.pem
openssl rsa -in keypair/private.pem -pubout -outform PEM -out keypair/public.pem
```

2. Setup terraform. See the README at the route of this project for information on how to do this
3. Run `npm install` to setup dependencies, then run the app with `npm run start`. **<i>Note: If you're reciving a ResourceNotFoundException that means that either terraform is not setup or the terminal running this backend is not setup with your AWS credentials. Be sure to source the .env file from the previous directory if needed</i>**

The app will run on `localhost:3000`.