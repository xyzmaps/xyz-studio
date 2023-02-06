# HERE Studio 
 
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

 Also refered to as XYZ Studio

 This repository is the code used to power the
 HERE-hosted cloud based application [HERE Studio](https://studio.here.com)
 also reffered to as [HERE XYZ Studio](https://xyz.here.com/studio).
 We are releasing this code to the community
 so that any developer may iterate,
 improve or even recommend features/functionality
 through Pull Requests. You are welcome to raise
 issues and suggestions on our issues page. Please refer
 our [contributing guidelines](./CONTRIBUTING.md)
 
 XYZ Studio is an interactive, visual,
 web-based application for accessing
 [geospatial data](https://developer.here.com/blog/an-introduction-to-geojson)
  and creating maps within minutes.

 Create interactive maps and visualize
 geospatial data.
 Upload large datasets to the cloud that can be
 viewed instantly and edit the data in real-time
 to create maps faster.

## Getting started
 
 Start by reading our [Getting Started Guide](https://www.here.xyz/getting-started/) 
 pages which provides quick tutorial on 
 studio 
 You can use our cloud based [hosted service](https://studio.here.com) which provides
 generous freemium access [limits](https://developer.here.com/pricing)
 for map editing and visualization.
 
 Create an account [here](https://studio.here.com) and get started
 with creating projects. Add GeoJSON Data Layers and style it on the map.

## Development

Follow these steps to build locally.

##### Step1 - Aquire HERE Credentials
Get your `APP_ID` and `APP_CODE` from HERE [Developer Portal](http://developer.here.com/)

##### Step2 - Clone the project locally

```
git clone https://github.com/heremaps/xyz-studio.git`
```

##### Step3 - Run - Build and Install...

```
$ set REACT_APP_APP_ID=YOUR_APP_ID && \
set REACT_APP_APP_CODE=YOUR_APPCODE && \
./build.sh oss

$ npm start
```

##### Pre-requisites

 Install the correct version of [Node](https://nodejs.org/en/download/)

 To be sure to use the right version of node (lts/carbon),
 we suggest to use *nvm*. In *.nvmrc* file is defined the
 right version of Node.

## Studio documentation

| Documentation | URL |
| --- | --- |
|Documentation | https://www.here.xyz/studio/topics/ |
| XYZ Hub API | https://www.here.xyz/api/ |
|Maps Playground| http://xyz.here.com/xyz-maps/latest/playground/ |

# Contributing

 Your contributions are always welcome!
 Please have a look at the [contribution guidelines](CONTRIBUTING.md) first.

# License


Copyright (C) 2017-2020 HERE Europe B.V.

See the [LICENSE](./LICENSE) file in the root of this project for license details.
