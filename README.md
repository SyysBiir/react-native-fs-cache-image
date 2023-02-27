# React Native FS Cache Image

[![npm](https://img.shields.io/npm/v/github-buttons)](https://www.npmjs.com/package/react-native-fs-cache-image)

react-native-fs-cache-image is a library for caching images in React Native applications. It uses the fs package to cache images locally on the device and allows for faster loading times by avoiding downloading the same image multiple times. The library is optimized for optimal caching performance, and provides a declarative API to make it easier to use. It also supports a variety of image formats, including jpeg, png, gif, and webp.

## Features

- Cache remote images in file system
- Uses react-native-fs for file system access
- Image loading indicator

## Installation
Using npm:
```bash
npm i react-native-fs-cache-image --save
```

Using yarn:
```bash
yarn add react-native-fs-cache-image
```

## Usage
Using the library is easy. You can use it in your React Native application like this:
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