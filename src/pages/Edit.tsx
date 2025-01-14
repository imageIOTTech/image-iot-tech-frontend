import { RouteProp } from '@react-navigation/native';
import React, { useId, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Platform, StatusBar, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { MainStackParamList } from '../navigation/MainNavigator';
import { Footer, Header } from '../components';
import { Constants } from '../utils';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles';


type EditScreenRouteProp = RouteProp<MainStackParamList, 'Edit'>;

type EditProps = {
  route: EditScreenRouteProp;
};

const DataFont: string[] = ['Audiowide-Regular',
  'DMSeriText-Italic',
  'DMSeriText-Regular',
  'PlayfairDisplay-Black',
  'PlayfairDisplay-BlackItalic',
  'PlayfairDisplay-Bold',
  'PlayfairDisplay-BoldItalic',
  'PlayfairDisplay-ExtraBold',
  'PlayfairDisplay-ExtraBoldItalic',
  'PlayfairDisplay-Italic',
  'PlayfairDisplay-Medium',
  'PlayfairDisplay-MediumItalic',
  'PlayfairDisplay-Regular',
  'PlayfairDisplay-SemiBold',
  'PlayfairDisplay-SemiBoldItalic',
  'PlaywriteAUSA-ExtraLight',
  'PlaywriteAUSA-Light',
  'PlaywriteAUSA-Regular',
  'PlaywriteAUSA-Thin',
  'PlaywriteIN-ExtraLight',
  'PlaywriteIN-Light',
  'PlaywriteIN-Regular',
  'PlaywriteIN-Thin',
  'PlaywriteVN-ExtraLight',
  'PlaywriteVN-Light',
  'PlaywriteVN-Regular',
  'PlaywriteVN-Thin',
]

const Edit: React.FC = () => {
  const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRskj3r2ATEfE6v_BYTPGfW0oxSb4w1R7YEGA&s';

  const [saveChange, setSaveChange] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isRatio, setIsRatio] = useState(true);
  const [isActive, setIsActive] = useState<String>('');
  const [fontText, setFontText] = useState<String>('')

  const handleFont = () => {
    return (
      <View>

      </View>
    )
  }

  const handleActive = (edit: String) => {
    try {
      if (isActive == '' || isActive != edit) {
        setIsActive(edit);
      }
      else {
        setIsActive('');
      }
    } catch (error) {
      console.log("Error handle active: " + error);
    }
  }

  const renderItemFont = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity style={styles.boxFont}>
        <Text style={[styles.textFont, { fontFamily: item }]}>Aa</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Header />
      <View style={styles.boxImage}>
        {/* <Image style= {styles.image} source={{uri:img}}/> */}
        <Text style={{
          fontSize: 30,
          fontFamily: 'DMSerifText-Regular',
        }}>
          Hihihieeee</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {
          isRatio ?
            <View style = {styles.boxRatio}>
              <ScrollView horizontal style = {styles.scrollRotio}>
                <TouchableOpacity style={styles.boxRatioItem}>
                    <MaterialIcon name="crop-free" size={30} color={colors.gray}/>
                    <Text>Free size</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem}>
                    <MaterialIcon name="crop-original" size={30} color={colors.gray}/>
                    <Text>Original</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem}>
                    <MaterialIcon name="crop-din" size={30} color={colors.gray}/>
                    <Text>1:1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem}>
                    <MaterialIcon name="crop-16-9" size={30} color={colors.gray}/>
                    <Text>16:9</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem}>
                    <MaterialIcon name="crop-3-2" size={30} color={colors.gray}/>
                    <Text>3:2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem}>
                    <MaterialIcon name="crop-5-4" size={30} color={colors.gray}/>
                    <Text>5:4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem}>
                    <MaterialIcon name="crop-7-5" size={30} color={colors.gray}/>
                    <Text>7:5</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            : null
        }
        {
          isText ?
            <View style={styles.boxTool}>
              <FlatList
                data={DataFont}
                horizontal
                keyExtractor={(item) => item}
                renderItem={renderItemFont}
              />
            </View>
            : null
        }
        {
          saveChange == false ?
            <View style={styles.boxFooterEdit}>
              <TouchableOpacity id='Photos' style={[styles.itemBoxEdit]} onPress={() => handleActive('Photos')}>
                <FontIcon name="photo" size={24} color={isActive == 'Photos' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Photos' ? { color: colors.black } : { color: colors.gray }]}>Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity id='Logos' style={[styles.itemBoxEdit,]} onPress={() => handleActive('Logos')}>
                <FontIcon name="file-image-o" size={24} color={isActive == 'Logos' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Logos' ? { color: colors.black } : { color: colors.gray }]} >Logos</Text>
              </TouchableOpacity>
              <TouchableOpacity id='Text' style={[styles.itemBoxEdit,]} onPress={() => handleActive('Text')}>
                <IonIcon name="text" size={24} color={isActive == 'Text' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Text' ? { color: colors.black } : { color: colors.gray }]} >Text</Text>
              </TouchableOpacity>
              <TouchableOpacity id='Ratio' style={[styles.itemBoxEdit,]} onPress={() => handleActive('Ratio')}>
                <MaterialIcon name="photo-size-select-large" size={24} color={isActive == 'Ratio' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Ratio' ? { color: colors.black } : { color: colors.gray }]} >Ratio</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={styles.boxEdit}>
              <TouchableOpacity style={[styles.boxSaveChange,]}>
                <IonIcon name="checkmark" size={30} color={colors.black} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.boxSaveChange,]}>
                <IonIcon name="close-outline" size={30} color={colors.black} />
              </TouchableOpacity>
            </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxImage: {
    height: Constants.HEIGHT_DEVICE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Constants.WIDTH_DEVICE - 50,
    height: Constants.HEIGHT_DEVICE - 100,
    resizeMode: 'contain',
  },


  //Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'orange'
  },
  boxFooterEdit: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white
  },
  itemBoxEdit: {
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBoxEdit: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.gray,
  },
  boxEdit: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white
  },
  boxSaveChange: {},
  boxTool: {
    height: 75,
  },
  boxFont: {
    width: 100,
    height: 65,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    margin: 5,
  },
  textFont: {
    fontSize: 16,
  },
  scrollRotio: {
    height: 100,
  },
  boxRatio: {
    height: 65,
  },
  boxRatioItem: {
    height: 100,
    backgroundColor: 'blue'
  }
});

export default Edit;
