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
import axios from 'axios'

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
    img_item: {
        width: (1.2 * W) / 3,
        height: (1.2 * W) / 4,
    },
    field_con: {
        // marginLeft: W / 2,
        position: 'absolute',
        width: (2 * W) / 4,
        left: W / 3.5 + 60,
        paddingVertical: 10,
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
    },
    btn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
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
                <TextView padding={15} color={color2} style={{ fontSize: "16", fontWeight: "bold" }}>
                    {num}
                </TextView>
                <TextView color="gray" h6>
                    {title}
                </TextView>
            </Block>
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

const Item = ({ num, title, color }) => {
    return (
        <Block block centered middle shadow color={color} paddingTop={20} paddingBottom={20} borderRadius={4}>
            <TextView center bold color="#fff">
                {num}
            </TextView>
            <TextView bold center color="#fff">
                {title}
            </TextView>
        </Block>
    );
};

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: {},
            news: {},
            countries: {},
            dataCountry: {},
            selectValue: 0,
            pickerDisplayed: false,
            CountrySlug: '',
            CountryName: ''
        }
        //this.handleChangeLocation = this.handleChangeLocation.bind(this);
    }



    componentDidMount() {
        // console.log(this.props.navigation)
        axios.get('https://api.covid19api.com/summary').then(res => {
            //console.log(res.data)
            if (res.status == 200) {
                this.setState({ summary: res.data })
            }
        })

        axios.get('https://newsapi.org/v2/top-headlines?q=corona&apiKey=16b39cd210e5459fad86af092c6ea9f7').then(res => {
            if (res.status == 200) {
                //console.log(res)
                this.setState({ newsTrend: res.data.articles })
            }
        })
        axios.get('https://api.covid19api.com/countries').then(res => {
            if (res.status == 200) {
                this.setState({ countries: res.data })
            }
        })
    }

    formatDate = (string) => {
        //console.log(string)
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString('en-EN', options);
    }

    information = () => {
        const { summary, dataCountry } = this.state
        //console.log(summary, dataCountry)
        //console.log(dataCountry, summary, summary.Global)

        if (dataCountry.length == undefined || dataCountry.length == 0) {
            if (summary.Global != undefined && summary.Date != undefined) {
                return (
                    <Block padding={10} style={{ marginTop: 10 }}>
                        <Block justifyContent="space-between" direction="row">
                            <Block>
                                <TextView h6>Confirmed Cases by Global</TextView>
                                <TextView>Last update at {this.formatDate(summary.Date)}</TextView>
                            </Block>
                        </Block>

                        <Block
                            color="#fff"
                            borderRadius={8}
                            padding={10}
                            shadow
                            style={{ marginTop: 10 }}
                            direction="row">
                            <ItemDot
                                color1={Colors.carrot_op}
                                color2={Colors.carrot}
                                num={summary.Global.TotalConfirmed}
                                title={'Confirmed'}
                            />
                            <ItemDot
                                color1={Colors.red_op}
                                color2={Colors.red}
                                num={summary.Global.TotalDeaths}
                                title={'Deaths'}
                            />

                            <ItemDot
                                color1={Colors.green_op}
                                color2={Colors.green}
                                num={summary.Global.TotalRecovered}
                                title={'Recovered'}
                            />
                        </Block>
                    </Block>
                )
            }
        } else {

            return (
                <Block padding={10} style={{ marginTop: 10 }}>
                    <Block justifyContent="space-between" direction="row">
                        <Block>
                            <TextView h6>Confirmed Cases {dataCountry[0].Country}</TextView>
                            <TextView>Last update at {this.formatDate(dataCountry[0].Date)}</TextView>
                        </Block>
                    </Block>

                    <Block
                        color="#fff"
                        borderRadius={8}
                        padding={10}
                        shadow
                        style={{ marginTop: 10 }}
                        direction="row">
                        <ItemDot
                            color1={Colors.carrot_op}
                            color2={Colors.carrot}
                            num={dataCountry[0].TotalConfirmed}
                            title={'Confirmed'}
                        />
                        <ItemDot
                            color1={Colors.red_op}
                            color2={Colors.red}
                            num={dataCountry[0].TotalDeaths}
                            title={'Deaths'}
                        />

                        <ItemDot
                            color1={Colors.green_op}
                            color2={Colors.green}
                            num={dataCountry[0].TotalRecovered}
                            title={'Recovered'}
                        />
                    </Block>

                    <Block justifyContent="space-between" direction="row" style={{ marginTop: 20 }}>
                        <Block >
                            <TextView h6>New Cases {dataCountry[0].Country}</TextView>
                            <TextView>Last update at {this.formatDate(dataCountry[0].Date)}</TextView>
                        </Block>
                    </Block>

                    <Block direction="row" paddingVertical={10}>
                        <Item num={dataCountry[0].NewConfirmed} title="NewConfirm" color={Colors.carrot} />
                        <Block width={10} />
                        <Item num={dataCountry[0].NewDeaths} title="NewDeadth" color={Colors.red} />
                        <Block width={10} />
                        <Item num={dataCountry[0].NewRecovered} title="NewRecover" color={Colors.green} />
                    </Block>

                </Block>
            )
        }

    }

    sortCountry = (country) => {
        let sort = null
        let result = null
        if (country.length > 0) {
            let sort = country.sort(function (a, b) {
                if (a.Country > b.Country) {
                    return 1;
                }
                if (a.Country < b.Country) {
                    return -1;
                }
                return 0;
            })
            result = sort.map((country, index) => {
                return <TouchableHighlight key={index}
                    onPress={() => this.setPickerValue(country.Country, country.Slug)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                    <Text style={{ fontSize: 20 }}>{country.Country}</Text>
                </TouchableHighlight>
            })
        }
        return result
    }

    newsTrend = () => {
        const { newsTrend } = this.state
        // console.log(newsTrend)
        if (newsTrend) {
            if (newsTrend.length > 0) {
                //console.log(newsTrend.articles)
                return (
                    <Block padding={10}>
                        <TextView h6>Top News</TextView>
                        <Block>
                            {
                                newsTrend.slice(0, 10).map((item, index) => {
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
                                })
                            }


                            <ItemField
                                title="Wash your hands"
                                desc="These diseases include"
                                icon={require('./images/wash_hands.png')}
                            />
                        </Block>
                    </Block>
                )
            }
        }

    }

    togglePicker() {
        this.setState({
            pickerDisplayed: !this.state.pickerDisplayed
        })
    }

    setPickerValue(name, slug) {
        this.setState({
            CountrySlug: slug,
            CountryName: name
        })
        //console.log(slug)
        if (slug != 0) {
            const urlNews = "https://newsapi.org/v2/everything?q=" + name + "&q=corona&apiKey=16b39cd210e5459fad86af092c6ea9f7"
            axios.get(urlNews).then(res => {
                if (res.status == 200) {
                    // console.log(res.data.articles)
                    this.setState({ newsTrend: res.data.articles })
                } else {
                    this.setState({ newsTrend: {} })
                }
            }).catch(err => { this.setState({ newsTrend: {} }) })

            const DataCountry = this.state.summary.Countries.filter(data => data.Slug == slug)
            //console.log(DataCountry)
            this.setState({ dataCountry: DataCountry })
        } else {
            this.setState({ dataCountry: {} })

            axios.get('https://newsapi.org/v2/top-headlines?q=corona&apiKey=16b39cd210e5459fad86af092c6ea9f7').then(res => {
                if (res.status == 200) {
                    console.log(res)
                    this.setState({ newsTrend: res.data.articles })
                }
            })
        }

        this.togglePicker();
    }


    render() {
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
                    <Block>
                        <Button
                            onPress={() => this.togglePicker()}
                            color="#fff"
                            borderWidth={1}
                            borderColor="#f0f0f0"
                            margin={10}
                            borderRadius={30}>
                            <Block direction="row" paddingHorizontal={15} middle>
                                <Feather name="map-pin" size={16} color={Colors.blue1} />
                                <Block block padding={10}>
                                    <TextView h6>{this.state.CountryName == '' ? 'Global' : this.state.CountryName}</TextView>
                                </Block>
                                <Feather name="chevron-down" size={16} color={Colors.blue1} />

                                <Modal visible={this.state.pickerDisplayed} animationType={"fade"} transparent={true}
                                    swipeToClose={true}
                                    swipeArea={20}
                                    swipeThreshold={50}>
                                    <View style={{
                                        margin: 0, padding: 20,
                                        backgroundColor: '#fafafa',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: 400,
                                        alignItems: 'center',
                                        position: 'absolute'
                                    }}>
                                        <ScrollView showsVerticalScrollIndicator={true}>
                                            <TouchableHighlight
                                                onPress={() => this.setPickerValue('Global', 0)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                                                <Text style={{ fontSize: 20 }}>Global</Text>
                                            </TouchableHighlight>
                                            {this.sortCountry(this.state.countries)}


                                            <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 10 }}>
                                                <Text style={{ color: '#999' }}>Cancel</Text>
                                            </TouchableHighlight>
                                        </ScrollView>
                                    </View>
                                </Modal>

                            </Block>
                        </Button>
                    </Block>
                    {this.information()}
                    {this.newsTrend()}
                </Block>
            </ScrollView >
        );
    }
}