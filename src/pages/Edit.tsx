
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal, TextInput, UIManager, findNodeHandle } from 'react-native';
import { MainStackParamList } from '../navigation/MainNavigator';
import { Draggable, Header } from '../components';
import { Constants } from '../utils';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles';
import ViewShot, { CaptureOptions } from 'react-native-view-shot';
import RNFS from 'react-native-fs'
import { PERMISSIONS, request } from 'react-native-permissions';
import ImageZoom from 'react-native-image-pan-zoom';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { ColorText, ComponentImage, ComponentText, Element, FontText, LogoSize, OpacityText, Ratio, TextSize } from '../components/features';
import ToolText from '../components/features/ToolText';
import FooterEdit from '../components/features/FooterEdit';
import ChangeEdit from '../components/features/ChangeEdit';
import { SERVER_PORT } from '../config/env';
import Draw from '../components/features/Draw';
import ComponentModel from '../models/Component';
import ProjectModel from '../models/Project';
import ImageEditModel from '../models/ImageEdit';
import TextEditModel from '../models/TextEdit';
import StrokeEditModel from '../models/StrokeEdit';
import { addComponent, deleteComponent, updatePositionComponent, updateStyleComponent, updateValueComponent } from '../store/projectSlice';
import { fetchRefreshToken } from '../hooks/fetchUser';

type TestScreenProp = StackNavigationProp<MainStackParamList, 'Test'>;

type TestProps = {
  navigation: TestScreenProp;
};

const Test: React.FC<TestProps> = ({ navigation }) => {

  const dataComponent = useSelector((state: RootState) => state.project.components);

  const dispatch = useDispatch<AppDispatch>();

  const [isSaving, setIsSaving] = useState(false);

  const [image, setImage] = useState<string | undefined>('');
  const [imageLogo, setImageLogo] = useState<string | undefined>('');
  const viewShotLogoRef = useRef<ViewShot>(null);
  const viewShotRef = useRef<ViewShot>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>({ width: 0, height: 0 });
  const [dimensionsScaled, setDimensionsScaled] = useState<{ width: number; height: number } | null>({ width: Constants.WIDTH_DEVICE - 10, height: 700 });
  const [components, setComponents] = useState<ComponentModel[]>(dataComponent);

  const [isEdit, setIsEdit] = useState(false);
  const [isActive, setIsActive] = useState<String>('');

  //Font text
  const [isFontText, setIsFontText] = useState(false);
  const [fontText, setFontText] = useState<string>('Aria');

  //Ratio image
  const [isRatio, setIsRatio] = useState(false);
  const [valueRatio, setValueRatio] = useState(0);

  //Color text
  const [isColorText, setIsColorText] = useState(false);
  const [colorText, setColorText] = useState<String>(colors.black)

  //Opacity text
  const [isOpacityText, setIsOpacityText] = useState(false)
  const [opacityText, setOpacityText] = useState(1);

  //Size text
  const [isSizeTest, setIsSizeTest] = useState(false);
  const [sizeText, setSizeText] = useState(30);

  //Tool text
  const [isToolText, setIsToolText] = useState(false);
  const [toolText, setToolText] = useState<String>('');

  //Edit text
  const [isEditText, setIsEditText] = useState<boolean>(false);
  const [valueText, setValueText] = useState<string>('Text');

  //Element
  const [isElement, setIsElement] = useState<boolean>(false);


  //Edit Text Logo
  const [componentStyles, setComponentStyles] = useState<{ [key: string]: any }>({});
  const [isItemFocus, setIsItemFocus] = useState<string | null>('');

  //Edit Image Logo
  const [isZoomImage, setIsZoomImage] = useState(false);
  const [dimensionsLogo, setDimensionsLogo] = useState<{ width: number; height: number }>({ width: 100, height: 100 });
  const [zoomValue, setZoomValue] = useState<number>(100);
  const [positionValue, setPositionValue] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  //Get and Refesh Token
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);

  //Get Offset of draw
  const [isDraw, setIsDraw] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const containerRef = useRef(null);
  const [sizeDraw, setSizeDraw] = useState<{ width: number; height: number }>({ width: 100, height: 100 });

  //List components
  const [listComponent, setListComponent] = useState<ComponentModel[]>([]);
  const componentRef = useRef(null);

  //Type component focus
  const [typeComponent, setTypeComponent] = useState('');

  //Style stroke
  const [widthStroke, setWidthStroke] = useState<number>(3);
  const [coloStroke, setColorStroke] = useState(colors.black);

  useEffect(() => {
    setComponents(dataComponent); // Async data with Redux
  }, [dataComponent]);


  const options: CaptureOptions = {
    format: 'png',
    quality: 0.9
  }

  //get refresh token
  useEffect(() => {
    if (isAuthenticated) {
      setInterval(() => {
        dispatch(fetchRefreshToken(refreshToken ? refreshToken : ''));
      }, 5000);
    }
  }, [])


  //Get width, height image
  useEffect(() => {

    if (image == '') return

    if (image) {
      Image.getSize(image, (width, height) => {
        if (height < 700 || height > 700) {
          setDimensions({ width: Constants.WIDTH_DEVICE - 10, height: height });
        }
        else if (width < Constants.WIDTH_DEVICE - 10 || width > Constants.WIDTH_DEVICE - 10) {
          setDimensions({ width: width, height: height });
        }
        else {
          setDimensions({ width: Constants.WIDTH_DEVICE - 10, height: 700 });
        }
      }, (error) => {
        console.error('Failed to get image size:', error);
      });
    }

    return () => {
      console.log("No image get dimension ");
    }

  }, [image]);

  const resetText = () => {
    setValueText('Text')
    setFontText('Aria');
    setSizeText(30);
    setColorText(colors.black);
    setOpacityText(1)
  }

  const cancelToolText = () => {
    setIsFontText(false);
    setIsColorText(false);
    setIsEditText(false);
    setIsSizeTest(false);
    setIsOpacityText(false);
  }

  const cancelTool = () => {
    setIsSaving(false);
    setIsToolText(false);
    setIsRatio(false);
    setIsElement(false);
    setIsDraw(false);
    setIsActive('');
  }

  const handleActiveTool = (edit: String) => {
    try {
      cancelTool();
      cancelToolText();
      cancelOptionText();
      cancelOptionImage();
      if (isActive == '' || isActive != edit) {
        setIsActive(edit);
        switch (edit) {
          case 'Text': {
            if (isToolText) {
              setIsToolText(false)
            } else {
              setIsEditText(true);
              setIsActive('');
            }
          };
            break;
          case 'Ratio': {
            setIsRatio(true);
          }
            break;
          case 'Element': {
            setIsElement(true);
          }
            break;
          case 'Draw': {
            setIsDraw(true)
          }
            break;
          default:
            break;
        }
      }
      else {
        setIsActive('');
        setIsToolText(false);
        setIsRatio(false)
        setIsElement(false);
        setIsDraw(false);
      }
    } catch (error) {
      console.log("Error handle active tool: " + error);
    }
  }

  const handleActiveToolText = (tool: String) => {
    try {
      if (toolText == tool) {
        setToolText('');
        cancelToolText();
        return;
      }
      if (toolText == '' || toolText != tool) {
        cancelToolText();
        setToolText(tool);
        switch (tool) {
          case 'download': { captureLogo() } break;
          case 'font': { setIsFontText(true) } break;
          case 'color': { setIsColorText(true) } break;
          case 'edit': { setIsEditText(true); } break;
          case 'size': { setIsSizeTest(true) } break;
          case 'opacity': { setIsOpacityText(true) } break;
          default:
            break;
        }
      }
      else {
        return new Error('Tool test is fail')
      }
    } catch (error) {
      console.log("Error handle active tool text: " + error);
    }
  }


  const captureLogo = () => {
    setIsItemFocus('');
    if (viewShotLogoRef.current) {
      if (viewShotLogoRef.current.capture) {
        viewShotLogoRef.current.capture().then((uri: string) => {
          console.log('Image saved to', uri);
          saveImage(uri);
        }).catch((error: Error) => {
          console.error('Capture failed', error);
        });
      }
    } else {
      console.error('viewShotRef is null or undefined');
    }
  };

  const captureImageWithWatermark = () => {
    setIsItemFocus('');
    cancelToolText();
    cancelOptionText();
    if (!image) {
      Alert.alert('No Image', 'Please add image and edit to save images.');
    }
    else {
      if (viewShotRef.current) {
        if (viewShotRef.current.capture) {
          viewShotRef.current.capture().then((uri: string) => {
            console.log('Image saved to', uri);
            saveImage(uri);
          }).catch((error: Error) => {
            console.error('Capture failed', error);
          });
        }
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
    const item = components.find(item => item.id == isItemFocus);
    if (item || item != undefined) {
      editComponentText();
    } else {
      addComponentText(valueText);
    }
  }

  // Edit logo text 
  const editComponentText = () => {
    dispatch(updateValueComponent({
      id: isItemFocus,
      value: valueText
    }))
  };

  const zoomLogo = (value: number) => {
    setDimensionsLogo({
      width: value,
      height: value,
    })
    editImageStyle();
  };

  const addComponentStroke = (path: string) => {
    const key = Date.now().toString();
    const originPath: StrokeEditModel = {
      path: path
    }

    const originStyle = {
      width: widthStroke,
      color: coloStroke,
    }

    setIsItemFocus(key);

    dispatch(addComponent(
      {
        id: key,
        type: 'Stroke',
        component: originPath,
        style: originStyle
      }
    ))
  };

  const addComponentLogo = (uri: string | undefined) => {
    const key = Date.now().toString();
    const originLogo: ImageEditModel = {
      uri: uri ? uri : '',
      positionX: 0,
      positionY: 0,
    }
    const originStyle = {
      width: 100,
      height: 100,
    }
    dispatch(addComponent(
      {
        id: key,
        type: 'Image',
        component: originLogo,
        style: originStyle,
      }
    ))
  }

  const editImageStyle = () => {
    const newStyle = {
      width: dimensionsLogo.width,
      height: dimensionsLogo.height,
    }

    dispatch(updateStyleComponent({ id: isItemFocus, style: newStyle }));
  };

  const addComponentText = (value: string | undefined) => {
    const key = Date.now().toString();
    const originText: TextEditModel = {
      value: value ? value : '',
      positionX: 0,
      positionY: 0,
    };
    const originStyle = {
      fontFamily: 'Aria',
      fontSize: 30,
      color: colors.black,
      opacity: 1,
    };
    dispatch(addComponent(
      {
        id: key,
        type: 'Text',
        component: originText,
        style: originStyle
      }
    ));
    cancelOptionText();
    cancelToolText();
    cancelOptionEdit();
  };

  const editTextStyle = () => {
    const newStyle = {
      fontFamily: fontText,
      fontSize: sizeText,
      color: colorText,
      opacity: opacityText,
    }

    dispatch(updateStyleComponent({
      id: isItemFocus,
      style: newStyle
    }))
  };

  const editPositionComponent = (key: string, x: number, y: number) => {
    setIsItemFocus(key);

    dispatch(updatePositionComponent({
      id: isItemFocus, x, y
    }))
  }

  const removeComponent = (key: string) => {
    if (!key) { return };

    dispatch(deleteComponent({ id: key }));
  };

  const handleProfile = () => {
    isAuthenticated ?
      navigation.navigate("Profile") : navigation.navigate("Login")
  };

  const unFocusItem = () => {
    setIsItemFocus('');
    cancelOptionEdit();
    cancelOptionImage();
    cancelOptionText();
    cancelTool();
    cancelToolText();
  }

  const selectedItem = (id: string) => {
    if (!id) {
      return;
    }
    if (id == isItemFocus) {
      return;
    }
    setIsItemFocus(id);
    const item = components.find(item => {
      if (item.id == id) {
        return item.style
      }
    });
    if (!item) {
      return;
    }
    setTypeComponent(item.type);
    item.type == 'Text' ? selectedItemText(item.style) : selectedItemImage(item.style);
  }

  const selectedItemText = (item: any) => {

    //Cancel option image
    cancelOptionImage();

    setIsEdit(true); //Open save or cancel change

    //Get style form component
    setFontText(item?.fontFamily); //Get font text
    setColorText(item?.color); //Get color text
    setSizeText(item?.fontSize); //Get font size text
    setOpacityText(item?.opacity); //Get opacity text

    //Visilbe tool text
    setIsToolText(true);
  };

  const selectedItemImage = (item: any) => {
    //Cancel option text
    cancelOptionText();

    //Open save or cancel change
    setIsEdit(true);

    //Get style from component
    setDimensionsLogo({ width: item?.width, height: item?.height }); //Get wight, height image

    const zoom = item?.width;
    setZoomValue(zoom);

    //Visible tool zoom image
    setIsZoomImage(true);
  };

  const saveProject = () => {
    const key = Date.now().toString();
    const project: ProjectModel = {
      id: key,
      name: 'Project',
      image: image ? image : '',
      style: {
        height: sizeDraw.height,
        width: sizeDraw.width,
      },
      component: listComponent,
    };
  }

  const handleNoSaveChange = () => {
    //Cancel option edit text
    cancelOptionEdit();

    resetText();
  }

  const handleSaveChange = () => {

    if (!isItemFocus) {
      return;
    }

    //Save style change
    typeComponent == 'Text' ? editTextStyle() : editImageStyle();

    //Cancel option edit text
    cancelOptionEdit();
  }

  const cancelOptionEdit = () => {
    setIsEdit(false); //Hiden save or cancel change
    setIsItemFocus(''); //Delete item focus 

    //Cacel of text
    cancelOptionText();

    //Cancel of image
    cancelOptionImage();
  }

  const cancelOptionText = () => {
    setIsToolText(false); //Hiden tool text
    cancelToolText(); //Cancel all tool text
  };

  const cancelOptionImage = () => {
    setIsZoomImage(false);
    setDimensionsLogo({ width: 100, height: 100 });
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

      <View
        style={{
          flex: 1, justifyContent: 'center', alignItems: 'center',
        }}>
        <ViewShot ref={viewShotRef} style={[styles.boxImage, { width: dimensions?.width, height: dimensions?.height }]} options={options} >
          {
            image ?
              <ImageZoom
                cropWidth={dimensionsScaled?.width}
                cropHeight={dimensionsScaled?.height}
                imageWidth={dimensions?.width}
                imageHeight={dimensions?.height}
                enableDoubleClickZoom={false}
              >
                <View
                  ref={containerRef}
                  style={{
                    justifyContent: 'center', alignItems: 'center',
                  }}
                  onLayout={(event) => {
                    if (containerRef.current) {
                      UIManager.measure(findNodeHandle(containerRef.current), (x, y, w, h, pageX, pageY) => {
                        setOffsetY(pageY);
                      });
                    }
                  }}
                >

                  <Draw
                    clearDraw={() => { }}
                    isDraw={isDraw}
                    offerY={offsetY}
                    width={sizeDraw.width}
                    height={sizeDraw.height}
                    addStroke={(stroke) => { addComponentStroke(stroke) }}
                    component={components.filter(item => item.type == 'Stroke')}
                  />

                  {components.map((component) => {
                    if (component.type === 'Text') {
                      return (
                        <ComponentText
                          component={component}
                          onDown={() => {
                            selectedItem(component.id);
                            console.log(component)
                          }}
                          newPosition={(x: number, y: number) => {
                            (component.id, x, y)
                          }}
                          onRemove={() => { removeComponent(component.id) }}
                          itemFocus={isItemFocus ? isItemFocus : ''}
                          unItemFocus={unFocusItem}
                          styleEdit={{
                            fontFamily: fontText,
                            fontSize: sizeText,
                            color: colorText,
                            opacity: opacityText,
                          }}
                          key={component.id}
                        />
                      );
                    }
                    else if (component.type === 'Image') {
                      return (
                        <ComponentImage
                          key={component.id}
                          onDown={() => {
                            selectedItem(component.id);
                            console.log(component);
                          }}
                          onRemove={() => { removeComponent(component.id) }}
                          component={component}
                          newPosition={(x: number, y: number) => {
                            editPositionComponent(component.id, x, y)
                          }}
                          itemFocus={isItemFocus ? isItemFocus : ''}
                          unItemFocus={unFocusItem}
                          styleEdit={{
                            width: dimensionsLogo.width,
                            height: dimensionsLogo.height,
                          }}
                        />
                      );
                    }
                  }
                  )}
                  <Image source={{ uri: image }}
                    onLayout={(event) => {
                      const { x, y, height, width } = event.nativeEvent.layout;
                      setSizeDraw({ width: width, height: height });
                    }}
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
              <TouchableOpacity style={styles.btnEditText} onPress={() => { editTextValue() }}>
                <IonIcon name="checkmark" size={30} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {
          isZoomImage ?
            <LogoSize
              value={zoomValue}
              maxValue={dimensions?.width ? dimensions.width : 100}
              minValue={100}
              step={20}
              onChangeValue={(value) => zoomLogo(value)}
            /> : null
        }
        {
          isElement ?
            <Element onPress={(uri: any) => {
              addComponentLogo(uri);
              setIsElement(false);
            }}
            /> : null
        }
        {
          isSizeTest && isToolText ?
            <TextSize
              value={sizeText}
              maxValue={50}
              minValue={16}
              step={2}
              onChangeValue={(value: number) => setSizeText(value)}
            />
            : null
        }
        {
          isOpacityText && isToolText ?
            <OpacityText
              maxValue={1}
              minValue={0}
              value={opacityText}
              step={0.1}
              onChangeValue={(value: number) => { setOpacityText(value) }}
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
          isColorText ?
            <ColorText
              onChangeValue={(value: string) => setColorText(value)}
            />
            : null
        }
        {
          isFontText ?
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
          !isEdit ?
            <FooterEdit
              image={image}
              imageLogo={imageLogo}
              uriImage={(value: string) => setImage(value)}
              uriLogo={(value: string) => { addComponentLogo(value) }}
              handleActiveTool={(value: string) => handleActiveTool(value)}
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

export default Test;
