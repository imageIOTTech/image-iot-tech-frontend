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
import { ColorText, FontText, OpacityText, Ratio, TextSize } from '../components/features';
import ToolText from '../components/features/ToolText';
import FooterEdit from '../components/features/FooterEdit';
import ChangeEdit from '../components/features/ChangeEdit';
import { SERVER_PORT } from '../config/env';


type EditScreenProp = StackNavigationProp<MainStackParamList, 'Edit'>;

type EditProps = {
  navigation: EditScreenProp;
};

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
    const response = await fetch(`${SERVER_PORT}/user/refresh-token`, {
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

    // setInterval(getRefreshToken, 5000);

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
          { fontFamily: fontText, color: selectedColor, opacity: opacityValue } // Use current fontText
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

  const handleNoSaveChange = () => {
    setSaveChange(false);
    setIsToolText(false);
    setIsEditText(false)
    itemIsEdit ? removeComponent(itemIsEdit) : null;
    resetText();
    setIsRatio(false);
    setIsActive('')
  }

  const handleSaveChange = () => {
    setSaveChange(false);
    setIsToolText(false);
    editTextStyle(itemIsEdit);
    setItemIsEdit('');
    falseToolText();
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
              <TouchableOpacity style={[styles.btnEditText]} onPress={handleNoSaveChange}>
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
            <TextSize
              value={textSize}
              maxValue={50}
              minValue={16}
              step={2}
              onChangeValue={(value: number) => setTextSize(value)}
            />
            : null
        }
        {
          isOpacityText && isToolText ?
            <OpacityText
              maxValue={1}
              minValue={0}
              value={opacityValue}
              step={0.1}
              onChangeValue={(value: number) => setOpacityValue(value)}
            />
            : null
        }
        {
          isRatio ?
            <Ratio
              onChangeValue={(value: number) => setValueRatio(value)}
            />
            : null
        }
        {
          isColorText && isToolText ?
            <ColorText
              onChangeValue={(value: string) => setSelectedColor(value)}
            />
            : null
        }
        {
          isFontText && isToolText ?
            <FontText
              onChangeValue={(value: string) => setFontText(value)}
            />
            : null
        }
        {
          isToolText ?
            <ToolText
              onChangeValue={(value: string) => handleActiveToolText(value)}
            />
            : null
        }
        {
          saveChange == false ?
            <FooterEdit 
            image={image}
            uriImage={(value : string) => setImage(value)}
            uriLogo={(value : string) => addComponentLogo(value)}
            handleActiveTool={(value:string) =>handleActiveTool(value)}
            />
            :
            <ChangeEdit
            onPressNo={handleNoSaveChange}
            onPressSave={handleSaveChange}
            />
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
