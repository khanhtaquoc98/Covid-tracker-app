import React from 'react';
import {
    View,
    Text,
    Picker,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    Modal, TouchableHighlight
} from 'react-native';
import { Block, Button, TextView } from './Component';
import { Colors } from './Component/Color';
const W = Dimensions.get('window').width;
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select'
import axios from 'axios'
import { createNoSubstitutionTemplateLiteral } from 'typescript';

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 300,
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
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 16,
        right: 5,
    },
});

const ItemDot = ({ color1, color2, num, title }) => {
    return (
        <Block block>
            <Block middle>
                <Block
                    width={30}
                    height={30}
                    middle
                    centered
                    borderRadius={30}
                    color={color1}>
                    <Block
                        width={20}
                        height={20}
                        borderWidth={4}
                        borderRadius={20}
                        borderColor={color2}
                    />
                </Block>
                <TextView padding={15} color={color2} h3>
                    {num}
                </TextView>
                <TextView color="gray" h6>
                    {title}
                </TextView>
            </Block>
        </Block>
    );
};


export default class Rank extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            summary: {},
            selectValue: 0,
            pickerDisplayed: false,
        }
    }

    componentDidMount() {
        axios.get('https://api.covid19api.com/summary').then(res => {
            //console.log(res.data)
            if (res.status == 200) {
                this.setState({ summary: res.data.Countries })
                //console.log(this.state.summary)
            }
        })
    }



    showTop10Confi = () => {
        const { summary } = this.state
        let results = null
        if (summary != undefined || summary != {}) {
            if (summary.length > 0) {
                //console.log(summary.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(0, 10))
                results = summary.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(0, 10).map((item, index) => {
                    //console.log(item.Country)
                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text style={{ textAlign: 'left' }}>{item.Country}</Text>
                            <Text style={{ textAlign: 'right' }}>{item.TotalConfirmed} people</Text>
                        </View>
                    )
                })

            }

        }

        return results
    }

    showTop10Ded = () => {
        const { summary } = this.state
        let results = null
        let sort = null
        if (summary != undefined || summary != {}) {
            if (summary.length > 0) {
                results = summary.sort((a, b) => b.TotalDeaths - a.TotalDeaths).slice(0, 10).map((item, index) => {
                    //console.log(item.Country)
                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text style={{ textAlign: 'left' }}>{item.Country}</Text>
                            <Text style={{ textAlign: 'right' }}>{item.TotalDeaths} people</Text>
                        </View>
                    )
                })

            }

        }

        return results
    }

    showTop10Reco = () => {
        const { summary } = this.state
        let results = null
        if (summary != undefined || summary != {}) {
            if (summary.length > 0) {
                //console.log(summary.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(0, 10))
                results = summary.sort((a, b) => b.TotalRecovered - a.TotalRecovered).slice(0, 10).map((item, index) => {
                    //console.log(item.Country)
                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text style={{ textAlign: 'left' }}>{item.Country}</Text>
                            <Text style={{ textAlign: 'right' }}>{item.TotalRecovered} people</Text>
                        </View>
                    )
                })

            }

        }

        return results
    }

    formatDate = (string) => {
        //console.log(string)
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString('en-EN', options);
    }

    render() {
        const { summary } = this.state
        return (
            <ScrollView style={{ flex: 1 }}>
                <Block block color="#fafafa">
                    <Block height={300} color={Colors.blue} style={styles.bg}>
                        <Block style={styles.wrapperimage}>
                            <Image
                                style={styles.doctor}
                                source={require('./images/Drcorona.png')}
                            />
                        </Block>
                    </Block>
                    <Block style={styles.containerHeader}>
                        <Image style={styles.img} source={require('./images/virus.png')} />
                    </Block>

                    <Block padding={10} style={{ marginTop: 10 }}>
                        <Block justifyContent="space-between" direction="row">
                            <Block>
                                <TextView h6>Top 10 country confirmed</TextView>
                                <TextView>Newest update {this.formatDate(summary.length > 0 ? summary[0].Date : 0)}</TextView>
                            </Block>
                        </Block>
                        <Block
                            color="#fff"
                            borderRadius={8}
                            shadow
                            style={{ marginTop: 10 }}
                        >
                            {this.showTop10Confi()}
                        </Block>

                    </Block>
                    <Block padding={10} style={{ marginTop: 10 }}>
                        <Block justifyContent="space-between" direction="row">
                            <Block>
                                <TextView h6>Top 10 country deaths</TextView>
                                <TextView>Newest update {this.formatDate(summary.length > 0 ? summary[0].Date : 0)}</TextView>
                            </Block>
                        </Block>
                        <Block
                            color="#fff"
                            borderRadius={8}
                            shadow
                            style={{ marginTop: 10 }}
                        >
                            {this.showTop10Ded()}
                        </Block>

                    </Block>
                    <Block padding={10} style={{ marginTop: 10 }}>
                        <Block justifyContent="space-between" direction="row">
                            <Block>
                                <TextView h6>Top 10 country recovered</TextView>
                                <TextView>Newest update {this.formatDate(summary.length > 0 ? summary[0].Date : 0)}</TextView>
                            </Block>
                        </Block>
                        <Block
                            color="#fff"
                            borderRadius={8}
                            shadow
                            style={{ marginTop: 10 }}
                        >
                            {this.showTop10Reco()}
                        </Block>

                    </Block>
                </Block>
            </ScrollView>
        );
    }
}