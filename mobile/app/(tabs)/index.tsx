import { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, FlatList, Dimensions } from 'react-native';
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { PieChart } from "react-native-chart-kit";

export default function HomeScreen() {

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  const screenWidth = Dimensions.get("window").width;

  // 🔥 Chart Data
  const chartData = expenses.map(item => ({
    name: item.title,
    amount: item.amount,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    legendFontColor: "#fff",
    legendFontSize: 12
  }));

  // 🔥 ADD EXPENSE
  const addExpense = async () => {
    try {
      if (!title || !amount) {
        alert("Fill all fields");
        return;
      }

      await addDoc(collection(db, "expenses"), {
        title,
        amount: Number(amount),
        createdAt: new Date()
      });

      alert("Added successfully 🚀");

      setTitle('');
      setAmount('');

      fetchExpenses();

    } catch (err) {
      console.log(err);
      alert("Error adding expense ❌");
    }
  };

  // 🔥 FETCH EXPENSES
  const fetchExpenses = async () => {
    const snapshot = await getDocs(collection(db, "expenses"));

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setExpenses(data);

    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
    setTotal(totalAmount);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <View style={{
      flex: 1,
      padding: 20,
      backgroundColor: '#0B132B'
    }}>

      {/* Title */}
      <Text style={{
        color: 'white',
        fontSize: 24,
        marginBottom: 20
      }}>
        LifeOS 🚀
      </Text>

      {/* Total */}
      <Text style={{
        color: '#00D4FF',
        fontSize: 20,
        marginBottom: 20
      }}>
        Total: ₹{total}
      </Text>

      {/* Chart */}
      {expenses.length > 0 && (
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#0B132B",
            backgroundGradientFrom: "#0B132B",
            backgroundGradientTo: "#0B132B",
            color: () => `#fff`
          }}
          accessor={"amount"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
        />
      )}

      {/* Inputs */}
      <TextInput
        placeholder="Title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
        style={{
          backgroundColor: '#1C2541',
          color: 'white',
          padding: 10,
          marginBottom: 10
        }}
      />

      <TextInput
        placeholder="Amount"
        placeholderTextColor="#999"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{
          backgroundColor: '#1C2541',
          color: 'white',
          padding: 10,
          marginBottom: 10
        }}
      />

      {/* Button */}
      <Button title="Add Expense" onPress={addExpense} />

      {/* List */}
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{
            color: 'white',
            marginTop: 10
          }}>
            {item.title} - ₹{item.amount}
          </Text>
        )}
      />

    </View>
  );
}