import { useState } from "react";
import { Alert, ScrollView, Text, View, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Feather } from "@expo/vector-icons";

import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { Product } from "@/components/product";

import { ProductProps } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

import { useCartStore } from "@/stores/cart-store";
import { useNavigation } from "expo-router";

const PHONE_NUMBER = "5545991119881";

export default function Cart() {
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const total = formatCurrency(cartStore.products.reduce((acc, product) => acc + product.price * product.quantity, 0));
  const [address, setAddress] = useState("");

  function handleProductRemove(product: ProductProps) {
    Alert.alert("Remover produto", `Deseja remover ${product.title} do carrinho?`, [
      { text: "Cancelar" },
      { text: "Remover", onPress: () => cartStore.remove(product.id) },
    ]);
  }

  function handleSendOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe o endereço de entrega para enviar o pedido", [{ text: "Ok" }]);
    }

    const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("");

    const message = `🍔 Novo Pedido \n\nEntregar em: ${address} \n ${products} \n\nValor Total: ${total}`;
    console.log(message);

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);

    cartStore.clear();
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="flex-1 p-5">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product data={product} key={product.id} onPress={() => handleProductRemove(product)} />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center wy-8">Seu carrinho esta vazio</Text>
            )}
            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
            </View>

            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, numero e complemento"
              onChangeText={setAddress}
              onSubmitEditing={handleSendOrder}
              blurOnSubmit={true}
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleSendOrder}>
          <Button.Text>Enviar Pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  );
}
