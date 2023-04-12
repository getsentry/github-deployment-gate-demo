# Github Deployment Gate Demo

This is a sample application that demonstrates usage of the Sentry Github Deployment Gate integration application

# Setting up

```
# Copy the env file template to .env
cp .env.tmpl .env

# Modify .env to replace instances of "${VARIABLE}" with your variable values for your configuration
```

# Running the app locally

`npm run run`

# Build and run a container

````
docker build -t mikejihbe/github-deployment-gate-demo:v0.0.1
docker run -it -p 3000:3000 mikejihbe/github-deployment-gate-demo:v0.0.1

````
