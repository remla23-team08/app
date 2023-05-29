# App

## **Usage**

There are multiple ways in which you can run the application:
1. Using the docker image published under [ghcr.io](https://github.com/remla23-team08/app/pkgs/container/app)
2. Building the docker image locally and running it (see [Docker Steps](#docker-steps))
3. Running the applicaion locally (see [Running the application(locally)](#running-the-applicationlocally))
4. Using the docker-compose file within the [operation](https://github.com/remla23-team08/operation) repository (**NOTE**: This will also start the `model-service` container)

## **Running the application(locally)**

In order to run the application locally, you need to have the following:
1. Have node.js installed
2. Have NPM installed
3. Create a personal access token for github (see [Creating a personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)) with at least the following permissions:
    - `read:packages`
    - `repo`
4. Export the recently created PAT within your current process by running the following command:
   ```bash
   export NPM_TOKEN=<ghb-token>
   ```
5. Install the dependencies by running the following command:
    ```bash
    npm install
    ```
6. Start the application by running the following command:
    ```bash
    npm run start
    ```
7. The application should now be running on port `8083` on your local machine, more specifically on `http://localhost:8083`

## **Docker Steps**

### Building the Docker image

```bash
# You need to pass the NPM token as a secret to be available
# when building the docker image (it's actually the GITHUB token)
echo "<ghb-token>" > NPM_TOKEN.txt

# You then need to build the docker image by passing the NPM_TOKEN
docker build --secret id=NPM_TOKEN,src=./NPM_TOKEN.txt --tag <tag> .
```

> **NOTE**: The `NPM_TOKEN` is used to install the private packages from the github registry
> and should not be passed to the image via build args, as it will be available in the image
> Be careful not to push the file containing the token to the repository if you 
> created the file within the local repository

### Running the Docker image

```bash
docker run --rm -p 8083:8083 <tag>
```

If all of the steps were followed correctly, the application should now be running on port `8083` on your local machine, more specifically on `http://localhost:8083`. Should the port be already in use, you can change the port mapping to something else, e.g. `-p 8084:8083` 

> Note that the port on the left side of the colon is the port on your local machine, while the port on the right side of the colon is the port on the container - the latter should not be changed)

## **General NPM commands**

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

## **Versioning**

Versioning of this repository is done automatically using GitHub Actions. The versioning is done using the standard Semantic Versioning (SemVer) format. Version bumps are done automatically when a PR is merged to the `main` branch. To achieve this, we are using the GitVersion tool. For more information on how to use GitVersion, see [this link](https://gitversion.net/docs/).

## **Additional Resources**

* [Semantic Versioning](https://semver.org/)
* [NPM](https://docs.npmjs.com/)
* [Release Engineering TU Delft Course Website](https://se.ewi.tudelft.nl/remla/assignments/a1-images-and-releases/)
