/* eslint-disable prettier/prettier */
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Features from '../components/Features';
import { dummyMessages } from '../constants';
import Voice from '@react-native-community/voice';

export default function HomeScreen() {
    const [messages,setMessages] = useState(dummyMessages);
    const [recording,setRecording] = useState(false);
    const [speaking,setSpeaking] = useState(true);
    const [result,setResult] = useState('');

    const clear = () =>{
        setMessages([]);
    };

    const stopSpeaking = () => {
        setSpeaking(false);
    };

    const speechStartHandler = e => {
        console.log('speech start handler');
    };

    const speechEndHandler = e => {
        setRecording(false);
        console.log('speech end handler');
    };

    const speechResultsHandler = e => {
        console.log('voice event',e);
        const text = e.value[0];
        setResult(text);
    };

    const speechErrorHandler = e => {
        console.log('speech error handler',e);
    };

    const startRecording = async () => {
        if (!recording){
            setRecording(true);
            try {
                await Voice.start('en-GB');
            }
            catch (error){
                console.log('error: ', error);
            }
        }
    };

    const endRecording = async () => {
        try {
            await Voice.stop();
            setRecording(false);
            //fetch data from gpt
        }
        catch (error){
            console.log('error: ', error);
        }
    };

    useEffect(()=> {
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;
        Voice.onSpeechError = speechErrorHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };

    },[]);


    //console.log('result :',result);

  return (
    <View className="flex-1 bg-white">
        <SafeAreaView className="flex-1 flex mx-5">
            <View className="flex-row justify-center">
                <Image source={require('../../assets/images/bot.png')} style={{height: hp(15),width : hp(15)}}/>
            </View>
            {
                messages.length > 0 ? (
                    <View className="space-y-2 flex-1">
                        <Text style={{fontSize : wp(5)}} className="font-semibold text-gray-700 ml-1">Assistant</Text>
                        <View style={{height : hp(58)}} className="bg-neutral-200 rounded-3xl p-4">
                            <ScrollView bounces={false} className="space-y-4" showsVerticalScrollIndicator={false}>
                                {
                                    messages.map((message,index) => {
                                        if (message.role === 'assistant'){
                                            if (message.content.includes('https')){
                                                return (
                                                    <View key={index} className="flex-row justify-start">
                                                        <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                                                            <Image source={{uri : message.content}} className="rounded-2xl" resizeMode="contain" style={{height : wp(60), width : wp(60)}}/>
                                                        </View>
                                                    </View>
                                                );
                                            }
                                            else {
                                                return (
                                                    <View key={index} className="flex-row">
                                                        <View style={{width : wp(70)}} className="bg-emerald-100 rounded-xl p-2 rounded-tl-none">
                                                            <Text className="text-gray-900 font-medium">{message.content}</Text>
                                                        </View>
                                                    </View>
                                                   ); 
                                            }
                                        }
                                        else{
                                           return (
                                            <View key={index} className="flex-row justify-end">
                                                <View style={{width : wp(70)}} className="bg-white rounded-xl p-2 rounded-tr-none">
                                                    <Text className="text-gray-900 font-medium">{message.content}</Text>
                                                </View>
                                            </View>
                                           ); 
                                        }
                                    })
                                }
                            </ScrollView> 
                        </View>
                        {/*recordind,clear and stop*/}
                        <View className="flex justify-center items-center">
                            {
                                recording ? (
                                    <TouchableOpacity onPress={endRecording}>
                                        {/* Recording stop button*/}
                                        <Image source={require('../../assets/images/voiceLoading.gif')} style={{width : hp(13), height: hp(13)}} className="rounded-full" />
                                    </TouchableOpacity>
                                ): (
                                    <TouchableOpacity onPress={startRecording}>
                                        {/* Recording start button */}
                                        <Image source={require('../../assets/images/recordingIcon.png')} style={{width : hp(13), height: hp(13)}} className="rounded-full" />
                                    </TouchableOpacity>
                                )
                            }
                            {
                                messages.length > 0 ? (
                                    <TouchableOpacity className="bg-neutral-400 rounded-2xl p-3 absolute right-10" onPress={clear}>
                                        <Text className="text-white font-semibold">clear</Text>
                                    </TouchableOpacity>
                                ) : null
                            }
                            {
                                speaking ? (
                                    <TouchableOpacity className="bg-red-400 rounded-2xl p-3 absolute left-10" onPress={stopSpeaking}>
                                            <Text className="text-white font-semibold">stop</Text>
                                        </TouchableOpacity>
                                ) : null
                            }
                        </View>
                    </View>
                ) : (
                    <Features  />
                )
            }
        </SafeAreaView>
    </View>
  );
}
