import React, { ReactElement, ReactNode, useState } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Platform, FlatList, KeyboardAvoidingView, ActivityIndicator, ScrollView } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import Button from '../Button/Button';

type Option = { id: string, name: string }

interface MultiSelectorOptionProps {
  option: Option,
  selected: boolean,
  onSelect: () => void,
  onRemove: () => void
}

const MultiSelectorOption: React.FC<MultiSelectorOptionProps> = ({ option, onSelect, onRemove, selected }) => (
  <TouchableOpacity
    onPress={() => selected ? onRemove() : onSelect()}
    activeOpacity={0.7}
    style={styles.itemWrapper}>
    <Text style={styles.itemText}>
      {option.name}
    </Text>
    <FontAwesome5 style={styles.itemIcon}
      name={selected ? 'check-circle' : 'circle'}
      color={selected ? '#000077' : '#777777'} size={20} />
  </TouchableOpacity>
)

interface MultiSelectorProps {
  popupTitle: ReactElement,
  inputContent: ReactElement,
  showSearchBox: boolean,
  searchPlaceHolderText: string,
  selectedItems: Option[],
  options: Option[],
  onSelectItem: (option: Option) => void,
  onRemoveItem: (option: Option) => void,
  onSubmit?: () => void,
  onTextChange: (text: string) => void
}

const MultiSelector: React.FC<MultiSelectorProps> = ({
  popupTitle,
  inputContent,
  showSearchBox,
  searchPlaceHolderText,
  options,
  selectedItems,
  onSelectItem,
  onRemoveItem,
  onSubmit,
  onTextChange
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsModalOpen(true)}
      activeOpacity={0.7}
      style={[styles.container]}>
      <Modal
        onBackdropPress={() => setIsModalOpen(false)}
        style={{
          justifyContent: 'flex-end',
          margin: 0
        }}
        useNativeDriver={true}
        animationInTiming={300}
        animationOutTiming={300}
        hideModalContentWhileAnimating
        isVisible={isModalOpen}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={[styles.modalContainer, { height: 500 }]}>
          <View style={styles.modalTitle}>
            {popupTitle}
          </View>
          <View style={styles.line} />
          {
            showSearchBox
              ? <TextInput
                underlineColorAndroid='transparent'
                returnKeyType='done'
                style={[styles.inputKeyword]}
                blurOnSubmit={false}
                placeholder={searchPlaceHolderText}
                onChangeText={(text: string) => {
                  onTextChange(text);
                }}
              />
              : null
          }
          <FlatList
            style={styles.listOption}
            data={options}
            keyboardShouldPersistTaps="always"
            keyExtractor={opt => opt.id}
            renderItem={({ item, index }) => (
              <MultiSelectorOption
                option={item}
                key={index}
                selected={selectedItems.some(selectedItem => selectedItem.id === item.id)}
                onSelect={() => onSelectItem(item)}
                onRemove={() => onRemoveItem(item)}
              />
            )}
          />
          <View style={styles.buttonWrapper}>
            <Button onPress={() => {
              onSubmit?.call(this);
              setIsModalOpen(false)
            }}>
              Ok
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <View>{inputContent}</View>
    </TouchableOpacity>
  );
}



// define your styles
const styles = StyleSheet.create({
  modalTitle: {
    paddingBottom: 10,
    alignItems: "center"
  },
  container: {
    width: '100%', minHeight: 45, borderRadius: 2, paddingHorizontal: 16,
    flexDirection: 'row', alignItems: 'center', borderWidth: 1,
    borderColor: '#cacaca', paddingVertical: 4
  },
  modalContainer: {
    paddingTop: 16, backgroundColor: '#fff', borderTopLeftRadius: 8, borderTopRightRadius: 8
  },
  title: {
    fontSize: 16, marginBottom: 16, width: '100%', textAlign: 'center'
  },
  line: {
    height: 1, width: '100%', backgroundColor: '#cacaca'
  },
  inputKeyword: {
    height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#cacaca',
    paddingLeft: 8, marginHorizontal: 24, marginTop: 16
  },
  buttonWrapper: {
    marginVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  },
  button: {
    height: 36, flex: 1
  },
  tagWrapper: {
    flexDirection: 'row', flexWrap: 'wrap'
  },
  listOption: {
    paddingHorizontal: 24,
    paddingTop: 1, marginTop: 16
  },
  itemWrapper: {
    borderBottomWidth: 1, borderBottomColor: '#eaeaea',
    paddingVertical: 12, flexDirection: 'row', alignItems: 'center'
  },
  itemText: {
    fontSize: 16, color: '#333', flex: 1
  },
  itemIcon: {
    width: 30, textAlign: 'right'
  },
  empty: {
    fontSize: 16, color: 'gray', alignSelf: 'center', textAlign: 'center', paddingTop: 16
  }
});


export default MultiSelector;