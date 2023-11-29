
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import { StripeProvider } from '@stripe/stripe-react-native';
;


const STRIPE_KEY =
  "pk_test_51NegkOC0zJif8DInBG11CS3Q6BKxWNiCgJfLHv03zSjIUn6WRZd4qDTFP7Hvxf87F9Z8DabAl2hHxKMmp9gs7lq400m8CGZXCA";



export default function App() {

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <StackNavigator />
      </StripeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
