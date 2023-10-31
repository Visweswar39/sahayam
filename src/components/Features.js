/* eslint-disable prettier/prettier */
import { View, Text, Image } from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Features() {
  return (
    <View style={{height : hp(60)}} className="space-y-4">
      <Text style={{fontSize : wp(6.5)}} className="font-semibold text-gray-700">Features</Text>
        <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
            <View className="flex-row items-center">
                <Image source={require('../../assets/images/chatgptIcon.png')} style={{height : hp(4),width : hp(4)}}/>
                <Text style={{fontSize : wp(4.8)}} className="font-semibold text-gray-700"> ChatGpt </Text>
            </View>
            <Text style={{fontSize : wp(3.8)}} className="font-medium text-gray-700">
              ChatGPT is an AI chatbot that uses natural language processing to create humanlike conversational dialogue.
            </Text>
        </View>
        <View className="bg-purple-200 p-4 rounded-xl space-y-2">
            <View className="flex-row items-center">
                <Image source={require('../../assets/images/dalleIcon.png')} style={{height : hp(4),width : hp(4)}}/>
                <Text style={{fontSize : wp(4.8)}} className="font-semibold text-gray-700"> DALL-E </Text>
            </View>
            <Text style={{fontSize : wp(3.8)}} className="font-medium text-gray-700">
            DALL-E 2 is an AI system that can create realistic images and art from a description in natural language.
            </Text>
        </View>
        <View className="bg-cyan-200 p-4 rounded-xl space-y-2">
            <View className="flex-row items-center">
                <Image source={require('../../assets/images/smartaiIcon.png')} style={{height : hp(4),width : hp(4)}}/>
                <Text style={{fontSize : wp(4.8)}} className="font-semibold text-gray-700"> Smart Ai </Text>
            </View>
            <Text style={{fontSize : wp(3.8)}} className="font-medium text-gray-700">
              A poerful voice assistantant with the abilities of chatGPt and Dall-E, providing you the best of worlds.
            </Text>
        </View>
    </View>
  );
}
