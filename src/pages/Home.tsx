import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/MainNavigator';
import { useNavigation } from '@react-navigation/native';
import { DataFolder, DataImage } from '../utils/data';
import { colors } from '../styles';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { Footer } from '../components';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FolderModel from '../models/Folder';

type HomeScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
}

type ImageRecent = {
  id: number;
  uri: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {


  const [parentFolder, setPasrentFolder] = useState(0);
  const [dataFolder, setDataFolder] = useState(DataFolder);

  const user = useSelector((state: RootState) => state.auth.name);

  const renderItemRecent = ({ item }: { item: ImageRecent }) => {
    return (
      <Pressable style={styles.boxItemImage}>
        <Image source={item.uri} style={styles.imgItem} />
      </Pressable>
    )
  };

  const renderItemFolder = ({ item }: { item: FolderModel }) => {
    return (
      <Pressable style={styles.boxItemFolder} key={item.id}
        onPress={() => handleFolderSelection(item)}>
        <EntypoIcon name='folder' size={100} color={colors.golden} />
        <Text style={styles.txtNameFolder}>{item.name}</Text>
      </Pressable>
    )
  };

  const handleFolderSelection = (item: FolderModel) => {
    setPasrentFolder(item.id);
  };

  useEffect(() => {
    const dataTemp = DataFolder.filter((folder) => folder.parent == parentFolder);
    setDataFolder(dataTemp);
    return () => { }
  }, [parentFolder])

  const onHandHome = () => { };

  const onHandleEdit = () => {
    navigation.navigate('Edit')
  };

  const onHandlePro = () => { };

  return (
    <View style={styles.container}>
      <View style={styles.boxHeader}>
        <Text style={styles.txtWellcome}>Hello, {user}</Text>
        <Text style={styles.txtWellcome}>How are you today ??</Text>
      </View>
      <View style={styles.boxRecent}>
        <Text style={styles.txtTitle}>Recent</Text>
        <FlatList
          data={DataImage}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItemRecent}
          horizontal
          showsHorizontalScrollIndicator= {false}
        />
      </View>
      <View style={styles.boxFolder}>
        <Text style={styles.txtTitle}>Folder</Text>
        <View style={styles.listFolder}>
          {
            dataFolder.map((item) => {
              if (item.parent == parentFolder) {
                return renderItemFolder({ item });
              }
            })
          }
        </View>

      </View>
      <Footer
        onPressHome={onHandHome}
        onPressEdit={onHandleEdit}
        onPressPro={onHandlePro}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  boxHeader: {
    width: '100%',
    height: 150,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  txtWellcome: {
    fontSize: 25,
    color: colors.black,
  },
  boxRecent: {
    marginLeft: 24,
    marginTop: 12,
    height: 250,
  },
  txtTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  boxItemImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,

  },
  imgItem: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  boxFolder: {
    width: '100%',
    paddingLeft: 24,
  },
  listFolder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    marginTop: 12,
  },
  boxItemFolder: {
    width: '28%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNameFolder: {
    fontSize: 16,
    color: colors.black
  },
});

export default Home;
