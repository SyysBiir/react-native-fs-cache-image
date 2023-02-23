import React from 'react';
import {Image, Platform, ActivityIndicator, StyleSheet} from 'react-native';
const RNFS = require('react-native-fs');

class CacheImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: require('../res/images/no_item.png'),
            loading: true,
            imageSize: {
                width: 'auto',
                height: 'auto'
            }
        };
    }

    loadFile = (path) => {
        this.setState({
            source: {
                uri: path
            },
            loading: false
        });
    };

    getImageSize = async () => {
        return new Promise((resolve, reject) => {
            var imageUri = this.props.source.uri ? this.props.source.uri : Image.resolveAssetSource(this.props.source).uri;
            Image.getSize(imageUri, (imgWidth, imgHeight) => {
                this.setState({
                    imageSize: {
                        width: imgWidth,
                        height: imgHeight
                    },
                }, () => {
                    resolve(1)
                })
            }, (error) => {
                reject(error)
            });
        });
    }

    downloadFile = (uri, path) => {
        this.getImageSize().then(() => {
            RNFS.downloadFile({fromUrl: uri, toFile: path})
                .promise.then((res) => this.loadFile(path))
                .catch((error) => {
                    this.loadFile(uri);
                });
        });
    };

    init = () => {
        if (this.props.source.uri) {
            const {uri} = this.props.source;
            const name = uri.replaceAll('/', '').replaceAll('?', '').replaceAll(':', '').replaceAll('&', '').replaceAll('=', '').replaceAll('.', '').replaceAll('https', '').replaceAll('http', '');
            const extension = Platform.OS === 'android' ? 'file://' : '';
            const path = `${ extension }${ RNFS.CachesDirectoryPath }/${ name }.png`;
            RNFS.exists(path).then((exists) => {
                if (exists) this.loadFile(path);
                else this.downloadFile(uri, path);
            });
            return;
        }
        if (this.props.source) {
            if (this.props.source.uri === null) {
                this.setState({
                    source: require('../res/images/no_item.png'),
                    loading: false
                });
                return;
            }
            this.setState({
                source: this.props.source,
                loading: false
            });
            return;
        }
    }

    componentDidMount() {
        this.init()
    }

    componentDidUpdate(prevProps) {
        if (this.props.source !== prevProps.source) {
            this.init()
        }
    }

    renderLoader() {
        const imageStyle = [this.props.style, styles.loaderPlaceholder];
        return (
            <ActivityIndicator style={[imageStyle, styles.loader]} />
        );
    }

    render() {
        if (this.state.loading) {
            return this.renderLoader();
        }
        return (
            <Image
                style={this.props.style}
                resizeMode={this.props.resizeMode}
                source={this.state.source}
            />
        );
    }
}

const styles = StyleSheet.create({
    loaderPlaceholder: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loader: {
        backgroundColor: 'transparent',
    },
});

export default CacheImage;
