import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import BottomTabs from "../Components/BottomTabs";
import Categories from "../Components/Categories";
import HeaderTabs from "../Components/HeaderTabs";
import RestuarantItems, { localRestaurants } from "../Components/RestuarantItems";
import SearchBar from "../Components/SearchBar";  


const YELP_API="92k-8VTpJy9WMOk4BjsWHLzk5lAhfdGnh0v5DlgEupacSFF860CS4Q3KKukckua2e4BeqtXSKAJ_tXJAz_c3QMlswkPPjdM8MfGRxsi4_S6TjPkE-QN0UHkkURplYXYx"

const Home = () => {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("New York");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);


  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
        <SearchBar   cityHandler={setCity}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Categories />
      <RestuarantItems  restaurantData={restaurantData} 
      />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
