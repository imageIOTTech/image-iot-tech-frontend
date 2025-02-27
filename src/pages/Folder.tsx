import { BackHandler, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParamList } from '../navigation/MainNavigator';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Font5Icon from 'react-native-vector-icons/FontAwesome5'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { colors } from '../styles';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { DataFolder } from '../utils/data';
import FolderModel from '../models/Folder';

type FolderScreenProp = StackNavigationProp<MainStackParamList, 'Folder'>;

type FolderProps = {
    navigation: FolderScreenProp;
};

const Folder: React.FC<FolderProps> = ({ navigation }) => {


    const user = useSelector((state: RootState) => state.auth.id);

    const [nameFolder, setNameFolder] = useState('');
    const [dataFolder, setDataFolder] = useState(DataFolder);
    const [isSelectedFolder, setIsSelectedFolder] = useState(false);
    const [folderIsSelected, setFolderIsSelected] = useState<FolderModel>({ id: 0, name: '', parent: 0 });
    const [renameFolder, setRenameFolder] = useState('');
    const [isEditFolder, setIsEditFolder] = useState(false);
    const [parentFolder, setPasrentFolder] = useState(0)

    useEffect(() => {
        if (parentFolder == 0) {
            const backAction = () => {
            setPasrentFolder(0);
            console.log('Back')
            return true; // Block back action
          };

        const backHandle = BackHandler.addEventListener('hardwareBackPress',backAction);

        return () => {
            backHandle.remove();
        }
        }
    }, [])


    const addFolder = () => {

        const newFolder = {
            id: dataFolder.length + 1,
            name: 'nameFolder',
            userId: 1234,
            parent: parentFolder,
        };

        //local
        setDataFolder([...dataFolder, newFolder]);

    }

    const handleBackProfile = () => {
        navigation.navigate('Profile');
    };

    const handleRenameFolder = () => {
        const folder = dataFolder.filter((folder) => folder.id === folderIsSelected.id);
        console.log(folder);
    };

    const deleteFolder = () => {
        const dataFolderLate = dataFolder.filter((folder) => folder.id != folderIsSelected.id);
        setDataFolder(dataFolderLate);
    };

    const folderSelected = (folder: FolderModel) => {
        setFolderIsSelected(folder);
        setIsSelectedFolder(true);
    };

    const handleFolderSelection = (item: FolderModel) => {
        if (isSelectedFolder) {
            setFolderIsSelected({ id: 0, name: '', parent: 0 });
            setIsSelectedFolder(false);
        }
        setPasrentFolder(item.id);
    };

    useEffect(() => {
        const dataTemp = DataFolder.filter((folder) => folder.parent == parentFolder);
        setDataFolder(dataTemp);
        return () => { }
    }, [parentFolder])



    const renderItemFolder = ({ item }: { item: FolderModel }) => {
        return (
            <TouchableOpacity key={item.id}
                onPress={() => handleFolderSelection(item)}
                onLongPress={() => folderSelected(item)}
                style={[styles.itemFolder,
                { backgroundColor: item.id == folderIsSelected.id ? colors.gray : undefined }
                ]}
            >
                <View style={styles.leftItem} pointerEvents='none'>
                    <EntypoIcon name='folder' size={34} color={colors.golden} />
                    <Text style={styles.txtNameFolders}>{item.name}</Text>
                </View>
                <Font5Icon name='chevron-right' size={24} color={colors.black} />
            </TouchableOpacity>
        )
    };

    const cancelEditFolder = () => {
        setIsEditFolder(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.boxHeader}>
                <View style={styles.boxOption}>
                    <TouchableOpacity onPress={handleBackProfile}>
                        <Font5Icon name='chevron-left' size={24} color={colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addFolder}>
                        <AntIcon name='addfolder' size={24} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.boxContent}>
                <Text style={styles.txtUri}>Home {'>'}</Text>
                <View style={styles.boxFolders}>
                    {
                        dataFolder.map((item) => {
                            if (item.parent == parentFolder) {
                                return renderItemFolder({ item });
                            }
                        })
                    }
                </View>
            </View>
            {
                isSelectedFolder ?
                    <View style={styles.boxSeletedFolder}>
                        <TouchableOpacity style={styles.btnOption}>
                            <FeatherIcon name='move' size={24} color={colors.black} />
                            <Text style={styles.txtSelect}>Move</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnOption} onPress={deleteFolder}>
                            <AntIcon name='delete' size={24} color={colors.black} />
                            <Text style={styles.txtSelect}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnOption} onPress={() => { setIsEditFolder(true) }}>
                            <AntIcon name='edit' size={24} color={colors.black} />
                            <Text style={styles.txtSelect}>Rename</Text>
                        </TouchableOpacity>
                    </View>
                    : null
            }
            {
                isEditFolder ?
                    <Modal transparent animationType='fade'>
                        <View style={styles.boxModal} >
                            <View style={styles.boxEditFolder}>
                                <View style={styles.boxEditContentFolder}>
                                    <Text style={styles.txtTitleRename}>Rename</Text>
                                    <Text style={styles.txtPlease}>Please enter new name</Text>
                                    <TextInput style={styles.inputNameFolder} value={nameFolder}
                                        onChangeText={(text) => { setNameFolder(text) }} />
                                </View>

                                <View style={styles.boxBtnEditFolder}>
                                    <Pressable
                                        onPress={cancelEditFolder}
                                        style={[styles.btnEditFolder, { borderRightWidth: 0.5 }]}>
                                        <Text style={styles.txtBtnEditFolder}>Cancel</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={cancelEditFolder}
                                        style={[styles.btnEditFolder, { borderLeftWidth: 0.5 }]}>
                                        <Text style={styles.txtBtnEditFolder}>Ok</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    : null
            }

        </ScrollView>
    )
}



export default Folder

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    boxHeader: {
        width: '100%',
        height: 70,
        backgroundColor: colors.black,
        padding: 12,
    },
    boxOption: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    boxContent: {
        padding: 12,
    },
    txtUri: {
        fontSize: 16,
        color: colors.black,

    },
    boxFolders: {

    },
    itemFolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        borderBottomWidth: 0.5,
        borderColor: colors.silver,
    },
    leftItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    txtNameFolders: {
        fontSize: 16,
        color: colors.black
    },
    btnItemMore: {},
    boxSeletedFolder: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: 6,
        position: 'absolute',
        bottom: 0,
        gap: 48,
    },
    btnOption: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    txtSelect: {},
    boxModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxEditFolder: {
        width: '90%',
        backgroundColor: colors.white,
        justifyContent: 'center',
        borderRadius: 10,
        gap: 24,
    },
    boxEditContentFolder: {
        gap: 24,
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    txtTitleRename: {
        width: '100%',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    txtPlease: {
        fontSize: 16,
        textAlign: 'left',
    },
    inputNameFolder: {
        width: '100%',
        borderWidth: 1,
    },
    boxBtnEditFolder: {
        flexDirection: 'row',

    },
    btnEditFolder: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5,
    },
    txtBtnEditFolder: {

    },
    line: {
        height: '100%',
        borderWidth: 0.5
    },
})