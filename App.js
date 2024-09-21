import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProductCheckout = ({ navigation, route }) => {
  const [quantity, setQuantity] = useState(1);
  const [discountCode, setDiscountCode] = useState('');
  const [selectedColor, setSelectedColor] = useState('mặc định');
  const [productImage, setProductImage] = useState(require('./2.png'));
  const productPrice = 1790000;
  const totalPrice = productPrice * quantity;

const colorImageMap = {
    'Đỏ': require('./3.png'),
    'Xanh dương': require('./2.png'),
    'đen': require('./1.png'),
    'bạc': require('./4.png')
  };

  React.useEffect(() => {
    if (route.params?.selectedColor) {
      setSelectedColor(route.params.selectedColor);
      setProductImage(colorImageMap[route.params.selectedColor] || require('./2.png'));
    }
  }, [route.params?.selectedColor]);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productSection}>
        <Image source={productImage} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>Điện Thoại VSmart Joy 3 - Hàng Chính Hãng
          </Text>
          <Text style={styles.productSupplier}>(Xem 828 đánh giá) ★★★★★</Text>
          <Text style={styles.productSupplier}></Text>
          <Text style={styles.productName}>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>
          <Text style={styles.productPrice}>{productPrice.toLocaleString()} đ</Text>
        </View>
      </View>

      <View style={styles.quantitySection}>
        <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.colorSection}>
        <Text style={styles.colorTitle}>Chọn màu:</Text>
        <TouchableOpacity
          style={styles.selectColorButton}
          onPress={() => navigation.navigate('ColorSelection', { selectedColor })} 
        >
          <Text style={styles.selectColorButtonText}>Chọn màu</Text>
        </TouchableOpacity>
        <Text style={styles.selectedColorText}>Màu đã chọn: {selectedColor}</Text>
      </View>

      <View style={styles.discountSection}>
        <TextInput
          style={styles.discountInput}
          placeholder="Mã giảm giá"
          value={discountCode}
          onChangeText={setDiscountCode}
        />
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Áp dụng</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalText}>Tạm tính</Text>
        <Text style={styles.totalPrice}>{totalPrice.toLocaleString()} đ</Text>
      </View>

      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>TIẾN HÀNH ĐẶT HÀNG</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const ColorSelectionScreen = ({ navigation, route }) => {
  const [selectedColor, setSelectedColor] = useState(route.params?.selectedColor || 'Chưa chọn');

  const selectColor = (color) => {
    setSelectedColor(color);
  };

  return (
    <View style={styles.colorSelectionContainer}>
      <Text style={styles.colorSelectionTitle}>Chọn màu:</Text>
      <View style={styles.colorContainer}>
        <TouchableOpacity
          style={[styles.colorBox, { backgroundColor: 'red' }]}
          onPress={() => selectColor('Đỏ')}
        />
        <TouchableOpacity
          style={[styles.colorBox, { backgroundColor: 'blue' }]}
          onPress={() => selectColor('Xanh dương')}
        />
        <TouchableOpacity
          style={[styles.colorBox, { backgroundColor: 'black' }]}
          onPress={() => selectColor('đen')}
        />
        <TouchableOpacity
          style={[styles.colorBox, { backgroundColor: 'silver' }]}
          onPress={() => selectColor('bạc')}
        />
      </View>
      <Text style={styles.selectedColorText}>Màu đã chọn: {selectedColor}</Text>

      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => {
          // go home 
          navigation.navigate('ProductCheckout', { selectedColor });
        }}
      >
        <Text style={styles.doneButtonText}>Xong</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductCheckout">
        <Stack.Screen name="ProductCheckout" component={ProductCheckout} options={{ title: 'Thanh toán' }} />
        <Stack.Screen name="ColorSelection" component={ColorSelectionScreen} options={{ title: 'Chọn màu' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  productSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 140,
    resizeMode: 'contain',
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productSupplier: {
    fontSize: 14,
    color: '#888',
  },
  productPrice: {
    fontSize: 16,
    color: 'red',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 20,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  colorSection: {
    marginBottom: 20,
  },
  colorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectColorButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  selectColorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedColorText: {
    fontSize: 16,
    marginTop: 10,
  },
  discountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  discountInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  applyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffcc00',
    borderRadius: 5,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 16,
    color: 'red',
  },
  orderButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  colorSelectionContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  colorSelectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  doneButton: {
    marginTop: 30,
    paddingVertical: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
