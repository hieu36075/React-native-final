import { useRoute } from "@react-navigation/native";
import React, { useState, useRef, useLayoutEffect  } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useFocusEffect } from "@react-navigation/native";
const SearchScreen = ({ navigation }) => {
    const route = useRoute();
  const [searchQuery, setSearchQuery] = useState(route?.params ? route.params.searchQuery : '');
  const [searchHistory, setSearchHistory] = useState([]); // Danh sách lịch sử tìm kiếm
  const searchInputRef = useRef(null);
    
  useFocusEffect(
    React.useCallback(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [route])
  );

  const handleSearch = () => {
    // Chuyển đến màn hình danh sách kết quả và truyền dữ liệu tìm kiếm qua props
    navigation.navigate("ListScreen", { searchQuery });

    // Lưu lịch sử tìm kiếm
    if (searchQuery) {
      setSearchHistory([...searchHistory, searchQuery]);
      setSearchQuery("");
    }
  };

  const handleDeleteItem = (index) => {
    const newHistory = [...searchHistory];
    newHistory.splice(index, 1);
    setSearchHistory(newHistory);
  };

  const handleSearchWithHistoryItem = (item) => {
    const filteredHistory = searchHistory.filter(
      (historyItem) => historyItem !== item
    );
    const updatedHistory = [item, ...filteredHistory];
    setSearchQuery(item);
    setSearchHistory(updatedHistory);
    navigation.navigate("ListScreen", { searchQuery: item });
  };

  return (
    <View
      style={styles.container}
      onBlur={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={styles.container_search}>
        <View style={styles.searchBox}>
          <TextInput
            ref={searchInputRef}
            style={styles.input}
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Text style={styles.confirmText}>Hoàn tất</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.historyContainer}>
        <Text style={styles.historyText}>Lịch sử tìm kiếm:</Text>
        <FlatList
          data={searchHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.historyItem}>
              <Text style={{ fontSize: 20 }}>{item}</Text>
              <View style={styles.itemRow}>
                <TouchableOpacity
                  onPress={() => handleSearchWithHistoryItem(item)}
                >
                  <Feather name="arrow-down-left" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.iconSpacer} />
                <TouchableOpacity onPress={() => handleDeleteItem(index)}>
                  <Feather name="x" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  container_search: {
    width: "100%",
    backgroundColor: "#E5F5FF", // Màu nền xanh
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white", // Màu nền trắng cho ô tìm kiếm
    borderRadius: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
  },
  confirmText: {
    color: "#007AFF", // Màu chữ xanh dương cho "Hoàn tất"
  },
  historyContainer: {
    marginTop: 10,
  },
  historyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "gray",
    marginTop: 10,
  },
  historyItem: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 20,
    fontSize: 24,
  },
  itemRow: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  iconSpacer: {
    width: 16, // Khoảng cách mong muốn giữa hai biểu tượng (có thể điều chỉnh)
  },
});

export default SearchScreen;
