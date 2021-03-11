import React, { Component } from "react";
import { WebView, StyleSheet, Text } from "react-native-webview";
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Block, TextView } from "./Component";
import { Colors } from './Component/Color';
import { Button } from "react-native-paper";


export default class Web extends Component {

    constructor(props) {
        super(props);
    }

    GoBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        let uri = this.props.route.params.url;
        console.log(uri)
        return (
            <Block style={{ height: "100%" }}>
                <Block style={{ height: "10%" }} color={Colors.blue} >
                    <TextView color={"#fff"} center h3 style={{ marginTop: 30 }}>News</TextView>
                    <Button onPress={this.GoBack}
                        style={{
                            position: 'absolute',
                            bottom: -6,
                            left: 0,
                        }}>
                        <Feather name="arrow-left" size={32} style={{ color: "#fff" }} />
                    </Button>
                </Block>
                <WebView
                    source={{
                        uri: uri
                    }}
                />
            </Block>

        )
    }
}
