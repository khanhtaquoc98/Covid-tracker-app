import React from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Block, Button, TextView } from './Component';
import { Colors } from './Component/Color';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios'
const W = Dimensions.get('window').width;
const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 300,
    },
    img_logo: {
        width: 100,
        height: 100,
        left: W / 2.65,
    },
    doctor: {
        position: 'absolute',
        top: 100,
        left: 60,

        // width: 50,
        // height: 80,
    },
    wrapperimage: {
        position: 'absolute',
        bottom: 0,

        alignSelf: 'center',
        width: W,
        height: 300,
    },
    bg: {
        position: 'absolute',
        width: 1000,
        height: 1000,
        top: -(930 - W / 2),
        alignSelf: 'center',
        // top: 500 - W / 2,
        // left: 500 - W / 2,
        borderRadius: 1000,
        overflow: 'hidden',
    },
    containerHeader: {
        position: 'relative',
    },
    map: {
        borderRadius: 8,
        marginTop: 15,
        padding: 15,
    },
    img_item: {
        width: (1.2 * W) / 3,
        height: (1.2 * W) / 4,
    },
    img_item_main: {
        position: 'relative',
        width: W * 3 / 3.36,
        height: W,
    },
    field_con: {
        // marginLeft: W / 2,
        position: 'absolute',
        width: (2 * W) / 4,
        left: W / 3.5 + 60,
        paddingVertical: 10,
    },
    field_con_main: {
        width: W,
        paddingVertical: 10,
        paddingRight: 29
    },
    field: {
        // marginLeft: W / 2,
        // position: 'absolute',
        width: W,
        left: 0,
        paddingVertical: 10,
    },
    textDesc: {
        lineHeight: 20,
        marginTop: 10,
        maxWidth: (2 * W) / 5,
    }, textDescMain: {
        lineHeight: 20,
        marginTop: 10,
        maxWidth: W,
    },
    btn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});
const Item = ({ icon, title }) => {
    return (
        <Block block centered>
            <Button middle shadow color="#fff" padding={10} borderRadius={12}>
                <Image source={icon} />
                <TextView bold center>
                    {title}
                </TextView>
            </Button>
        </Block>
    );
};

const ItemField = ({ icon, title, desc, url, navigation }) => {
    return (
        <Button onPress={() => {
            navigation.navigate('WebScreen', {
                url: url
            });
        }}>
            <Block
                direction="row"
                borderRadius={10}
                shadow
                color="#fff"
                padding={6}
                paddingHorizontal={10}
                style={{ marginTop: 10 }}>
                <Image style={styles.img_item} source={{ uri: icon.toString() }} />
                <Block padding={10} style={styles.field_con}>
                    <TextView size={16} bold numberOfLines={2} ellipsizeMode='tail'>
                        {title}
                    </TextView>
                    <TextView style={styles.textDesc} numberOfLines={3} ellipsizeMode='tail'>
                        {desc}
                    </TextView>
                </Block>
                <Button style={styles.btn} >
                    <Feather name="chevron-right" color={Colors.blue} size={30} />
                </Button>
            </Block>
        </Button>
    );
};

const ItemMain = ({ icon, title, desc, url, navigation }) => {
    return (
        <Button onPress={() => {
            navigation.navigate('WebScreen', {
                url: url
            });
        }}>
            <Block
                borderRadius={10}
                shadow
                color="#fff"
                padding={6}
                paddingHorizontal={10}
                style={{ marginTop: 10 }}>
                <Image style={styles.img_item_main} source={{ uri: icon.toString() }} />
                <Block padding={10} style={styles.field_con_main}>
                    <TextView size={16} bold numberOfLines={2} ellipsizeMode='tail'>
                        {title}
                    </TextView>
                    <TextView style={styles.textDescMain} numberOfLines={3} ellipsizeMode='tail'>
                        {desc}
                    </TextView>
                </Block>
            </Block>
        </Button>
    );
};


export default class NewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            News: {},
        }
    }


    componentDidMount() {
        axios.get('https://newsapi.org/v2/everything?q=corona&sources=bbc-news&apiKey=16b39cd210e5459fad86af092c6ea9f7').then(res => {
            //console.log(res.data)
            if (res.status == 200) {
                this.setState({ News: res.data.articles })
            }
        })
    }

    showNews = () => {
        const { News } = this.state
        let result = null
        if (News.length != undefined || News.length > 0) {
            result = News.map((item, index) => {
                if (index != 0) {
                    return (
                        <ItemField
                            key={index}
                            title={item.title ? item.title : ''}
                            desc={item.description ? item.description : ''}
                            icon={item.urlToImage ? item.urlToImage : ''}
                            url={item.url ? item.url : ''}
                            navigation={this.props.navigation}
                        />
                    )
                } else {
                    return (
                        <ItemMain key={index}
                            title={item.title ? item.title : ''}
                            desc={item.description ? item.description : ''}
                            icon={item.urlToImage ? item.urlToImage : ''}
                            url={item.url ? item.url : ''}
                            navigation={this.props.navigation}
                        />
                    )
                }

            })

        }
        return result
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Block block color="#fafafa">
                    <Block height={300} color={Colors.blue} style={styles.bg}>
                        <Block style={styles.wrapperimage}>
                            <Image
                                style={styles.doctor}
                                source={require('./images/coronadr.png')}
                            />
                        </Block>
                    </Block>
                    <Block style={styles.containerHeader}>
                        <Image style={styles.img} source={require('./images/virus.png')} />
                    </Block>

                    <Block >
                        <Image style={styles.img_logo} source={require('./images/bbc.jpg')} />
                    </Block>

                    <Block padding={10}>
                        {this.showNews()}

                    </Block>
                </Block>
            </ScrollView>
        )
    }
}

