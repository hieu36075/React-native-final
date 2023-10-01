import { Image, ImageBackground, View, Text, Pressable, ScrollView } from "react-native";
import styles from "./styles";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { FlatList } from "react-native";
const ImageItem = ({data}) =>{
    const [showMore, setShowMore] = useState(false)

    if (!data || !data.images) {
      return <Text>Data or images are undefined.</Text>;
    }


    if(showMore){
        return(
            <View style={styles.showMoreContainer}>
            <View style={styles.showMoreContainerTop}>
              <Pressable style={styles.topAction} onPress={() => setShowMore(false)}>
                <AntDesign name="arrowleft" size={28} color="white" />
                <Text style={styles.textAction}> All Image</Text>
              </Pressable>
                
              <FlatList
                data={data?.images}
                scrollEnabled={false}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }) => (
                  <Image key={item?.id} style={styles.allImage} source={{ uri: item?.url }} />
                )}
              />
            </View>
          </View>
        )
    }
    return(
        <View>
        <View>
          <Image
            style={styles.imageFirst}
            source={{ uri: data.images[0].url }}
          />
        </View>
        <View style={styles.thumbnailContainer}>
          <Image
            style={styles.thumbnailImage}
            source={{ uri:data.images[1]?  data.images[1].url : 'https://icon-library.com/images/null-icon/null-icon-3.jpg'  }}
          />
  
          <Image
            style={styles.thumbnailImage}
            source={{ uri: data.images[2] ? data.images[2].url : 'https://icon-library.com/images/null-icon/null-icon-3.jpg'  }}
          ></Image>
          <Image
            style={styles.thumbnailImage}
            source={{ uri:  data.images[3] ? data?.images[3].url : 'https://icon-library.com/images/null-icon/null-icon-3.jpg' }}
          ></Image>
          <Image
            style={styles.thumbnailImage}
            source={{ uri: data.images[4] ? data?.images[4].url : 'https://icon-library.com/images/null-icon/null-icon-3.jpg' }}
          ></Image>
          <Pressable style={styles.overlayText} onPress={()=>setShowMore(!showMore)}>
            <Text style={styles.textShowMore}>Show More </Text>
          </Pressable>
        </View>
      </View>
    )
}

export default ImageItem;