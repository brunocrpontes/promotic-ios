import React from 'react'
import { Video, ScreenOrientation } from 'expo'
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native'
import background from '../../assets/images/video-background.jpg'
import offlineBanner from '../../assets/images/promotic-live-offline.png'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  video: {
    flex: 1,
  },
  imageError: {
    flex: 1
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class LiveStreamScreen extends React.PureComponent {

  state = {
    error: false,
    loading: false
  }

  componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
  }

  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  renderContent = () => {

    const { error } = this.state;

    if (error) {
      return (
        <Image style={styles.imageError} source={offlineBanner} resizeMode="cover" width={null} height={null} />
      )
    }

    return (
      <Video
        source={{ uri: "http://wz4.dnip.com.br/nrcvideo/nrcvideo.sdp/playlist.m3u8" }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        useNativeControls
        style={styles.video}
        posterSource={background}
        fullscreenOrientation='landscape'
        onError={(error) => this.setState({ error, loading: false })}
        onLoadStart={() => this.setState(({ loading }) => ({ loading: !loading }))}
        onLoad={() => this.setState(({ loading }) => ({ loading: !loading }))}
        shouldPlay
      />
    )
  }

  render() {
    const { error, loading } = this.state
    return (
      <View style={styles.container}>
        {this.renderContent()}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" />
          </View>
        )}
      </View>
    )
  }
}
