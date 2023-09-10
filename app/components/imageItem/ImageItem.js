import { Image, ImageBackground, View, Text, Pressable, ScrollView } from "react-native";
import styles from "./styles";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { FlatList } from "react-native";
const ImageItem = ({data}) =>{
    const [showMore, setShowMore] = useState(false)
    if(showMore){
        return(
            <View style={styles.showMoreContainer}>
            <View style={styles.showMoreContainerTop}>
              <Pressable style={styles.topAction} onPress={() => setShowMore(false)}>
                <AntDesign name="arrowleft" size={28} color="white" />
                <Text style={styles.textAction}> All Image</Text>
              </Pressable>
                
              <FlatList
                data={data}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Image key={item.id} style={styles.allImage} source={{ uri: item.imageUrl }} />
                )}
              />
            </View>
          </View>
        )
    }
    return(
        <View >
        <View>
          <Image
            style={styles.imageFirst}
            source={{ uri: data[0].imageUrl }}
          />
        </View>
        <View style={styles.thumbnailContainer}>
          <Image
            style={styles.thumbnailImage}
            source={{ uri: data[1].imageUrl }}
          />
  
          <Image
            style={styles.thumbnailImage}
            source={{ uri: data[2].imageUrl }}
          ></Image>
          <Image
            style={styles.thumbnailImage}
            source={{ uri: data[3].imageUrl }}
          ></Image>
          <Image
            style={styles.thumbnailImage}
            source={{ uri: data[4].imageUrl }}
          ></Image>
          <Pressable style={styles.overlayText} onPress={()=>setShowMore(!showMore)}>
            <Text style={styles.textShowMore}>Show More </Text>
          </Pressable>
        </View>
      </View>
    )
}

export default ImageItem;