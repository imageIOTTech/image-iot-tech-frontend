import { RouteProp } from '@react-navigation/native';
import React, { Children, useEffect, useId, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Platform, StatusBar, TouchableOpacity, FlatList, ScrollView, Button, Dimensions, Alert, Modal, TextInput } from 'react-native';
import { MainStackParamList } from '../navigation/MainNavigator';
import { Draggable, Footer, Header } from '../components';
import { Constants } from '../utils';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles';
import Slider from '@react-native-community/slider';
import ViewShot, { CaptureOptions } from 'react-native-view-shot';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import RNFS, { copyFile } from 'react-native-fs'
import { PERMISSIONS, request } from 'react-native-permissions';
import ImageZoom from 'react-native-image-pan-zoom';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';


type EditScreenProp = StackNavigationProp<MainStackParamList, 'Edit'>;

type EditProps = {
  navigation: EditScreenProp;
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

const DataColor: string[] = [
  "#FF0000", // Đỏ đậm
  "#FF4500", // Cam đỏ
  "#FF6347", // Cà chua
  "#FF7F50", // San hô
  "#FFA07A", // Cam nhạt
  "#FFD700", // Vàng đậm
  "#FFFF00", // Vàng
  "#FFFFE0", // Vàng nhạt
  "#00FF00", // Xanh lá đậm
  "#32CD32", // Xanh lá chanh
  "#98FB98", // Xanh nhạt
  "#00FFFF", // Xanh cyan
  "#4682B4", // Xanh dương đậm
  "#1E90FF", // Xanh dương
  "#87CEFA", // Xanh da trời nhạt
  "#0000FF", // Xanh dương đậm
  "#8A2BE2", // Tím xanh
  "#9400D3", // Tím đậm
  "#BA55D3", // Màu hoa cà
  "#DDA0DD", // Tím nhạt
  "#FF1493", // Hồng đậm
  "#FF69B4", // Hồng tươi
  "#FFB6C1", // Hồng nhạt
  "#800000", // Nâu đậm
  "#A52A2A", // Nâu
  "#D2691E", // Nâu đất
  "#F4A460", // Nâu nhạt
  "#FFF5EE", // Trắng hồng
  "#708090", // Xám đậm
  "#D3D3D3"  // Xám nhạt
];

const Edit: React.FC<EditProps> = ({ navigation }) => {

  const [isSaving, setIsSaving] = useState(false);

  const [image, setImage] = useState<string | undefined>('');
  const viewShotLogoRef = useRef<ViewShot>(null);
  const viewShotRef = useRef<ViewShot>(null);
  const [imageLogo, setImageLogo] = useState<string>('');
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>({ width: 0, height: 0 });
  const [dimensionsScaled, setDimensionsScaled] = useState<{ width: number; height: number } | null>({ width: Constants.WIDTH_DEVICE - 10, height: 700 });
  const [components, setComponents] = useState<JSX.Element[]>([]);

  const [saveChange, setSaveChange] = useState(false);
  const [isFontText, setIsFontText] = useState(false);
  const [isRatio, setIsRatio] = useState(false);
  const [valueRatio, setValueRatio] = useState(0);
  const [isColorText, setIsColorText] = useState(false);
  const [isActive, setIsActive] = useState<String>('');
  const [fontText, setFontText] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<String>(colors.black)
  const [isOpacityText, setIsOpacityText] = useState(false)
  const [opacityValue, setOpacityValue] = useState(1);
  const [isTextSize, setIsTextSize] = useState(false);
  const [textSize, setTextSize] = useState(30);
  const [isToolText, setIsToolText] = useState(false);
  const [toolText, setToolText] = useState<String>('');
  const [isEditText, setIsEditText] = useState<boolean>(false);
  const [valueText, setValueText] = useState<string>('Logo');

  const [widthLogo, setWidthLogo] = useState(100);
  const [heightLogo, setHeightLogo] = useState(100);

  //Edit Text Logo
  const [itemIsEdit, setItemIsEdit] = useState('');
  const [componentStyles, setComponentStyles] = useState<{ [key: string]: any }>({});
  const [isItemFocus, setIsItemFocus] = useState<string | null>('');

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);

  const options: CaptureOptions = {
    format: 'png',
    quality: 0.9
  }

  const getRefreshToken = async () => {
    const response = await fetch('http://10.0.2.2:9090/api/user/refresh-token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        { accessToken }
      )
    });

    const json = response.json();

    if (response.status === 200) {
      //Save user and token
      json.then((data) => {
        console.log(data);
      })
    }
  }

  //get refresh token
  useEffect(() => {

    setInterval(getRefreshToken, 5000);

  }, [])


  //Get width, height image
  useEffect(() => {

    if (!image) return

    if (image) {
      Image.getSize(image, (width, height) => {
        if (width > Constants.WIDTH_DEVICE || height > Constants.HEIGHT_DEVICE) {
          console.log('set 1')
          setDimensions({ width: Constants.WIDTH_DEVICE - 10, height: 700 })
        }
        else {
          // setDimensions({ width: width /1.1, height: height /1.1});
          console.log('set 2')
          setDimensions({ width: width, height: height });
        }
      }, (error) => {
        console.error('Failed to get image size:', error);
      });
    }

    return () => {
      console.log("Không có ảnh để lấy kích thước")
    }

  }, [image]);

  const resetText = () => {
    setFontText('');
    setTextSize(30);
    setSelectedColor(colors.black);
    setOpacityValue(1)
  }

  const falseToolText = () => {
    setIsColorText(false);
    setIsFontText(false);
    setIsOpacityText(false);
    setIsTextSize(false);
    setIsEditText(false);
    setIsItemFocus('');
  }

  const handleActiveTool = (edit: String) => {
    try {
      if (isActive == '' || isActive != edit) {
        setIsActive(edit);
        falseToolText()
        switch (edit) {
          case 'Text': {
            console.log(isToolText)
            setIsRatio(false);
            if (isToolText) {
              setIsToolText(false)
            } else {
              setIsToolText(true);
              setIsEditText(true);
              setSaveChange(true)
              setIsActive('')
            }
          };
            break;
          case 'Ratio': {
            console.log("ratio")
            setIsRatio(true);
          }
            break;
          default:
            console.log('Eror: Không có tool');
            break;
        }
      }
      else {
        setIsActive('');
        setIsToolText(false);
        setIsRatio(false)
      }
    } catch (error) {
      console.log("Error handle active tool: " + error);
    }
  }

  const handleActiveToolText = (tool: String) => {
    try {
      if (toolText == '' || toolText != tool) {
        setToolText(tool);
        falseToolText();
        switch (tool) {
          case 'font': { setIsFontText(true) } break;
          case 'color': { setIsColorText(true) } break;
          case 'size': { setIsTextSize(true) } break;
          case 'opacity': { setIsOpacityText(true) } break;
          case 'edit': { setIsEditText(true); } break;
          case 'download': { captureLogo() } break;
          default:
            console.log("đang cập nhật")
            break;
        }
      }
      else {
        setToolText('');
        falseToolText()
      }
    } catch (error) {
      console.log("Error handle active tool text: " + error);
    }
  }

  const handleActiveColor = (color: String) => {
    try {
      if (selectedColor == '' || selectedColor != color) {
        setSelectedColor(color);
        console.log(color)
      } else {
        setSelectedColor('');
      }
    } catch (error) {
      console.log("Error handle active color: " + error);
    }
  };

  const renderItemFont = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity style={styles.boxFontItem} onPress={() => { setFontText(item); }}>
        <Text style={[styles.textFont, { fontFamily: item }]}>Aa</Text>
      </TouchableOpacity>
    )
  }

  const renderItemColor = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        style={[styles.boxColorItem,
        { backgroundColor: item },
        { borderWidth: selectedColor == item ? 0.5 : 0 }]}
        onPress={() => handleActiveColor(item)} />
    )
  }

  const captureLogo = () => {
    setItemIsEdit('');
    if (viewShotLogoRef.current) {
      viewShotLogoRef.current.capture().then((uri: string) => {
        console.log('Image saved to', uri);
        saveImage(uri);
      }).catch((error: Error) => {
        console.error('Capture failed', error);
      });
    } else {
      console.error('viewShotRef is null or undefined');
    }
  };

  const captureImageWithWatermark = () => {
    setItemIsEdit('');
    falseToolText();
    if (!image) {
      Alert.alert('No Image', 'Please add image and edit to save images.');
    }
    else {
      if (viewShotRef.current) {
        viewShotRef.current.capture().then((uri: string) => {
          console.log('Image saved to', uri);
          saveImage(uri);
        }).catch((error: Error) => {
          console.error('Capture failed', error);
        });
      } else {
        console.error('viewShotRef is null or undefined');
      }
    }
  };

  const saveImage = async (pathUri: string) => {
    try {

      const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (result !== 'granted') {
        Alert.alert('Permission Denied', 'Storage permission is required to save images.');
      }

      const date = Date.now();
      setIsSaving(true);
      const path = `${RNFS.PicturesDirectoryPath}/${date}.png`;
      const coppy = RNFS.moveFile(pathUri, path);
      await coppy;
      setIsSaving(false);

      Alert.alert("Success", "Image has been saved successfully! " + path);

    } catch (error) {
      console.error("Error saving image:", error);
      setIsSaving(false);
      Alert.alert("Error", "There was an issue saving the image.");
    }
  }

  // useEffect(() => {
  //   if (!image) openImageLibrary('Photos');
  //   return () => { }
  // }, [])


  // Mở thư viện ảnh
  const openImageLibrary = async (text: string) => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (text == 'Photos') {
          setImage(uri)
        }
        else {
          addComponentLogo(uri)
        }
      } else {
        console.log('No assets found in response');
      }
    });
  };

  const editTextValue = () => {
    setIsEditText(false);
    const item = components.find(item => {
      return item.key == itemIsEdit;
    });
    console.log(item);
    if (item != undefined) {
      editComponentText()
    } else {
      addComponentText();
    }
    // addComponentText();
  }

  // Edit logo text 
  const editComponentText = () => {
    setComponents(prevComponents =>
      prevComponents.map(component =>
        component.key === itemIsEdit
          ? { ...component, props: { ...component.props, children: valueText } }
          : component
      )
    );
  };

  const addComponentLogo = (uri: string | undefined) => {
    const key = Date.now().toString();
    setItemIsEdit(key);
    setComponents([...components, {
      key: key,
      type: 'Image',
      props: {
        style: [
          { width: 100, height: 100, },
          { width: widthLogo, height: heightLogo }
        ],
        children: uri
      }
    }]);
    setComponentStyles(prevStyles => ({
      ...prevStyles,
      [key]: { width: 100, height: 100, }
    }));
  }



  const addComponentText = () => {
    const key = Date.now().toString();
    setItemIsEdit(key);
    setComponents([...components, {
      key: key,
      type: 'Text',
      props: {
        style: [
          { fontSize: 30, color: colors.black },
          { fontFamily: fontText, color: selectedColor, opacity: opacityValue } // Sử dụng fontText hiện tại
        ],
        children: valueText
      }
    }]);
    setComponentStyles(prevStyles => ({
      ...prevStyles,
      [key]: { fontSize: 30, color: colors.black, opacity: 1 }
    }));
  };


  const removeComponent = (key: string | null) => {
    setComponents(components.filter(component => {
      console.log('Comparing', component.key, 'with', key);
      return component.key !== key;
    }));
  };

  const editTextStyle = (key: string) => {
    setItemIsEdit(key);
    updateComponentStyle(key, { fontFamily: fontText, color: selectedColor, opacity: opacityValue });
  };

  const updateComponentStyle = (key: string, newStyle: any) => {
    setComponentStyles(prevStyles => ({
      ...prevStyles,
      [key]: {
        ...prevStyles[key],
        ...newStyle,
      }
    }));
  };

  const noSaveChange = () => {
    setSaveChange(false);
    setIsToolText(false);
    setIsEditText(false)
    itemIsEdit ? removeComponent(itemIsEdit) : null;
    resetText();
    setIsRatio(false);
    setIsActive('')
  }

  const handleProfile = () => {
    isAuthenticated ?
      navigation.navigate("Profile") : navigation.navigate("Login")
  };

  const undo = () => { };

  const redo = () => { };

  const shareImage = () => { };

  return (
    <View style={styles.container}>
      <Header
        edit={true}
        undo={() => undo}
        redo={() => redo}
        saveImage={captureImageWithWatermark}
        shareImage={shareImage}
        profile={handleProfile}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ViewShot ref={viewShotRef} style={[styles.boxImage, { width: dimensions?.width, height: dimensions?.height }]} options={options} >
          {
            image ?
              <ImageZoom
                cropWidth={dimensionsScaled?.width}
                cropHeight={dimensionsScaled?.height}
                imageWidth={dimensions?.width}
                imageHeight={dimensions?.height}
                enableDoubleClickZoom={false}>
                <View style={{
                  justifyContent: 'center', alignItems: 'center',
                }}>
                  {components.map((component) => {
                    if (component.type === 'Text') {
                      return (
                        <Draggable
                          onDown={() => {
                            setIsItemFocus(component.key);
                            // setIsToolText(true);
                            // setSaveChange(true);
                          }}
                          key={component.key}>
                          <View style={{ marginBottom: 10, borderWidth: component.key == isItemFocus ? 1 : 0, zIndex: 1 }}>
                            {
                              component.key == isItemFocus ?
                                <TouchableOpacity style={styles.btnDeleteLogo}
                                  onPress={() => { removeComponent(component.key); falseToolText() }}>
                                  <IonIcon name="close-outline" size={24} color={colors.black} />
                                </TouchableOpacity>
                                : null
                            }
                            {
                              component.key == isItemFocus ?
                                <TouchableOpacity style={styles.btnHideFocus}
                                  onPress={() => setIsItemFocus('')}>
                                  <IonIcon name="eye-off" size={20} color={colors.black} />
                                </TouchableOpacity>
                                : null
                            }
                            <ViewShot ref={viewShotLogoRef} options={options} >
                              <Text style={[
                                componentStyles[component.key],
                                component.key === itemIsEdit ? {
                                  fontFamily: fontText,
                                  color: selectedColor,
                                  opacity: opacityValue,
                                } : {},]}
                              >
                                {component.props.children}
                              </Text>
                            </ViewShot>
                          </View>
                        </Draggable>
                      );
                    }
                    else {
                      return (
                        <Draggable
                          onDown={() => { setIsItemFocus(component.key) }}
                          key={component.key}>
                          <View style={{ marginBottom: 10, borderWidth: component.key == isItemFocus ? 1 : 0, }}>
                            {
                              component.key == isItemFocus ?
                                <TouchableOpacity style={styles.btnDeleteLogo}
                                  onPress={() => removeComponent(component.key)}>
                                  <IonIcon name="close-outline" size={24} color={colors.black} />
                                </TouchableOpacity>
                                : null
                            }
                            {
                              component.key == isItemFocus ?
                                <TouchableOpacity style={styles.btnHideFocus}
                                  onPress={() => setIsItemFocus('')}>
                                  <IonIcon name="eye-off" size={20} color={colors.black} />
                                </TouchableOpacity>
                                : null
                            }
                            <Image source={{ uri: component.props.children }}
                              style={[
                                componentStyles[component.key],
                                component.key === itemIsEdit ? {
                                  width: widthLogo,
                                  height: heightLogo
                                } : {},]}
                            />
                          </View>
                        </Draggable>
                      );
                    }
                  })}
                  <Image source={{ uri: image }}
                    style={[{
                      // width: dimensions?.width,
                      // height: dimensions?.height,
                      width: valueRatio > 0 ? '100%' : dimensions?.width,
                      height: valueRatio > 0 ? null : dimensions?.height,
                      resizeMode: valueRatio > 0 ? 'cover' : 'contain',
                      aspectRatio: valueRatio > 0 ? valueRatio : undefined,
                    },]} />
                </View>
              </ImageZoom>
              : null
          }
        </ViewShot>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Modal visible={isEditText}>
          <View style={styles.boxEditText}>
            <Text style={styles.textEditText}>Edit text</Text>
            <TextInput
              multiline
              focusable
              style={styles.textInput}
              value={valueText}
              onChangeText={(text) => { setValueText(text) }} />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.btnEditText]} onPress={noSaveChange}>
                <IonIcon name="close-outline" size={30} color={colors.black} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnEditText} onPress={editTextValue}>
                <IonIcon name="checkmark" size={30} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {
          isTextSize && isToolText ?
            <View style={styles.boxTextSize}>
              <FontIcon name='text-height' size={30} color={colors.gray} />
              <Slider
                style={styles.sliderTextSize}
                minimumValue={16}
                maximumValue={50}
                step={2}
                value={textSize}
                onValueChange={(value) => setTextSize(value)}
                minimumTrackTintColor={colors.gray}
                maximumTrackTintColor={colors.silver}
                thumbTintColor={colors.gray}
              />
            </View>
            : null
        }
        {
          isOpacityText && isToolText ?
            <View style={styles.boxOpacityText}>
              <MaterialIcon name='opacity' size={30} color={colors.gray} />
              <Slider
                style={styles.sliderOpacityText}
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                value={opacityValue}
                onValueChange={(value) => setOpacityValue(value)}
                minimumTrackTintColor={colors.gray}
                maximumTrackTintColor={colors.silver}
                thumbTintColor={colors.gray}
              />
            </View>
            : null
        }
        {
          isRatio ?
            <View style={styles.boxRatio}>
              <ScrollView horizontal style={styles.scrollRotio}>
                {/* <TouchableOpacity style={styles.boxRatioItem}>
                  <MaterialIcon name="crop-free" size={30} color={colors.gray} />
                  <Text>Free size</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.boxRatioItem} onPress={() => setValueRatio(0)}>
                  <MaterialIcon name="crop-original" size={30} color={colors.gray} />
                  <Text>Original</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem} onPress={() => setValueRatio(1 / 1)}>
                  <MaterialIcon name="crop-din" size={30} color={colors.gray} />
                  <Text>1:1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem} onPress={() => setValueRatio(16 / 9)}>
                  <MaterialIcon name="crop-16-9" size={30} color={colors.gray} />
                  <Text>16:9</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem} onPress={() => setValueRatio(3 / 2)}>
                  <MaterialIcon name="crop-3-2" size={30} color={colors.gray} />
                  <Text>3:2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem} onPress={() => setValueRatio(5 / 4)}>
                  <MaterialIcon name="crop-5-4" size={30} color={colors.gray} />
                  <Text>5:4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem} onPress={() => setValueRatio(7 / 5)}>
                  <MaterialIcon name="crop-7-5" size={30} color={colors.gray} />
                  <Text>7:5</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            : null
        }
        {
          isColorText && isToolText ?
            <View style={styles.boxColor}>
              <FlatList
                horizontal
                data={DataColor}
                keyExtractor={(item) => item}
                renderItem={renderItemColor}
              />
            </View>
            : null
        }
        {
          isFontText && isToolText ?
            <View style={styles.boxFont}>
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
          isToolText ?
            <View style={styles.boxToolText}>
              <ScrollView horizontal style={styles.scrollToolText} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.boxToolTextItem} onPress={() => { handleActiveToolText('download') }}>
                  <MaterialIcon name="download" size={30} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxToolTextItem} onPress={() => { handleActiveToolText('font') }}>
                  <IonIcon name="text" size={30} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxToolTextItem} onPress={() => { handleActiveToolText('color') }}>
                  <IonIcon name="color-palette-outline" size={30} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxToolTextItem} onPress={() => { handleActiveToolText('edit') }}>
                  <MaterialIcon name="edit" size={30} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxToolTextItem} onPress={() => { handleActiveToolText('opacity') }}>
                  <MaterialIcon name='opacity' size={30} color={colors.gray} />
                </TouchableOpacity>
              </ScrollView>
            </View>
            : null
        }
        {
          saveChange == false ?
            <View style={styles.boxFooterEdit}>
              <TouchableOpacity id='Photos' style={[styles.itemBoxEdit]} onPress={() => { openImageLibrary("Photos") }}>
                <FontIcon name="photo" size={18} color={isActive == 'Photos' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Photos' ? { color: colors.black } : { color: colors.gray }]}>Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity id='Logos' style={[styles.itemBoxEdit,]} onPress={() => { openImageLibrary("Logos") }}>
                <FontIcon name="file-image-o" size={18} color={isActive == 'Logos' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Logos' ? { color: colors.black } : { color: colors.gray }]} >Logos</Text>
              </TouchableOpacity>
              <TouchableOpacity id='Text' style={[styles.itemBoxEdit,]} onPress={() => { handleActiveTool('Text') }}>
                <IonIcon name="text" size={18} color={isActive == 'Text' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Text' ? { color: colors.black } : { color: colors.gray }]} >Text</Text>
              </TouchableOpacity>
              <TouchableOpacity id='Ratio' style={[styles.itemBoxEdit,]} onPress={() => handleActiveTool('Ratio')}>
                <MaterialIcon name="photo-size-select-large" size={18} color={isActive == 'Ratio' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Ratio' ? { color: colors.black } : { color: colors.gray }]} >Ratio</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={[styles.boxFooterEdit, { padding: 5 }]}>
              <TouchableOpacity style={[styles.boxSaveChange,]}
                onPress={() => {
                  // setSaveChange(false);
                  // setIsToolText(false);
                  // removeComponent(itemIsEdit);
                  // resetText();
                  noSaveChange()
                }}>
                <IonIcon name="close-outline" size={30} color={colors.black} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.boxSaveChange,]} onPress={() => {
                setSaveChange(false);
                setIsToolText(false);
                editTextStyle(itemIsEdit);
                setItemIsEdit('');
                falseToolText();
                setIsRatio(false);
                setIsActive('')
              }}>
                <IonIcon name="checkmark" size={30} color={colors.black} />
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  //Box image
  boxImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  //Box logo
  boxLogo: {
    position: 'absolute',
    bottom: 0,
    zIndex: 100
  },

  //Footer
  footer: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxFooterEdit: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderTopWidth: 0.2,
  },
  itemBoxEdit: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBoxEdit: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.gray,
  },
  boxSaveChange: {

  },
  boxToolText: {
    position: 'absolute',
    top: 0,
    marginTop: -65,
    height: 65,
    backgroundColor: colors.white,
  },
  scrollToolText: {
    height: 100,
  },
  boxToolTextItem: {
    width: 100,
    height: 65,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxFont: {
    position: 'absolute',
    top: 0,
    marginTop: -130,
    height: 75,
  },
  boxFontItem: {
    width: 100,
    height: 65,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFont: {
    fontSize: 16,
  },
  scrollRotio: {
    height: 100,
  },
  boxRatio: {
    position: 'absolute',
    top: 0,
    marginTop: -75,
    height: 75,
    backgroundColor: colors.white,
  },
  boxRatioItem: {
    width: 100,
    height: 65,
    margin: 5,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxColor: {
    height: 75,
    backgroundColor: colors.white,
    position: 'absolute',
    top: 0,
    marginTop: -130,
  },
  boxColorItem: {
    width: 50,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxOpacityText: {
    position: 'absolute',
    top: 0,
    marginTop: -140,
    width: '100%',
    height: 75,
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sliderOpacityText: {
    width: '90%',
  },
  boxTextSize: {
    position: 'absolute',
    top: 0,
    marginTop: -75,
    width: '100%',
    height: 75,
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sliderTextSize: {
    width: '90%'
  },
  btnDeleteLogo: {
    width: 24,
    height: 24,
    borderRadius: 90,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -15,
    left: -15,
    backgroundColor: colors.white,
    zIndex: 100
  },
  btnHideFocus: {
    width: 24,
    height: 24,
    borderRadius: 90,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -15,
    right: -15,
    backgroundColor: colors.white,
    zIndex: 100
  },
  boxEditText: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  textEditText: {
    textAlign: 'center',
    fontSize: 40,
    color: colors.black,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    width: '90%',
    marginBottom: 10,
    borderRadius: 10,
  },
  btnEditText: {
    width: 100,
    height: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
});

export default Edit;
