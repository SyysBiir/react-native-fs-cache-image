# react-native-fs-cache-image
## React Native Image Cache on File System

[![npm](https://img.shields.io/npm/v/github-buttons)](https://www.npmjs.com/package/react-native-fs-cache-image)

## Features

- Cache remote images in file system
- Uses react-native-fs for file system access
- Image loading indicator

## Install
To install the module, run the following in the command line:
```bash
npm i react-native-fs-cache-image --save
```

## Usage

```js
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CacheImage from 'react-native-fs-cache-image';

export default class App extends Component {
  render() {
    return (
      <>
        <CacheImage
          source={{uri: 'http://placehold.it/350x150'}}
        />
      </>
    );
  }
}