# App

### Requirements
- NodeJS
- NPM

### Installing dependencies

```bash
npm install
```

### Building

```bash
npm run build
```

### Running

```bash
npm run start
```

### Formatting code

```bash
npm run format
```

### UI Endpoint

`http://localhost:8083`

### Docker Build

```bash
# You need to pass the NPM token as a secret to be available
# when building the docker image (it's actually the GITHUB token)
echo "<ghb-token>" > NPM_TOKEN.txt

# You then need to build the docker image by passing the NPM_TOKEN
docker build --secret id=NPM_TOKEN,src=./NPM_TOKEN.txt --tag <tag> .
```

> **NOTE**: The NPM_TOKEN is used to install the private packages from the github registry
> and should not be passed to the image via build args, as it will be available in the image
> Be careful not to push the file containing the token to the repository if you 
> created the file within the local repository

### Docker Run

```bash
docker run --rm -p8083:8083 <tag>
```
