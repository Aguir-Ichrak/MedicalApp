import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../services/slices/appointmentsSlice";
import { AppDispatch, RootState } from "../services/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../components/Navbar";
import { logout } from "../services/slices/authSlice";
import { AppointmentCard } from "../components/AppointmentCard";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, STYLE } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

export default function DashboardScreen() {
  const [userToken, setUserToken] = useState<string | null>(null);
  
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);

  const { list, loading, error } = useSelector((state: RootState) => state.appointments);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenAndAppointments = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error("User not logged in");
        return;
      }
      const token = await user.getIdToken();
      setUserToken(token);
      dispatch(fetchAppointments({ token }));
    };

    fetchTokenAndAppointments();
  }, [dispatch]);

  const onRefresh = () => {
    if (userToken) {
      dispatch(fetchAppointments({ token: userToken }));
    }
  };

  const handleLogoPress = () => {
    setExpandedId(null);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    navigation.navigate('Dashboard' as never);
  };

  const handleAddAppointment = () => {
    navigation.navigate('AddAppointment' as never);
  };

  const renderItem = ({ item }: any) => (
    <AppointmentCard
      item={item}
      isExpanded={item.id === expandedId}
      onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
    />
  );

  if (error) return (
    <View style={STYLE.center}>
      <Text style={STYLE.errorText}>{error}</Text>
      <TouchableOpacity onPress={onRefresh} style={STYLE.retryButton}>
        <Ionicons
          name="reload-circle-outline"
          size={18}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={STYLE.dashContainer}>

      <Navbar
        onLogout={() => dispatch(logout())}
        onLogoPress={handleLogoPress}
      />
      <StatusBar barStyle="dark-content" />
      <View style={STYLE.header}>
        <View>
          <Text style={STYLE.headerTitle}>Appointments</Text>
          <Text style={STYLE.headerSubtitle}>
            {list.length > 0
              ? `We already have ${list.length} scheduled`
              : "No appointments scheduled yet"}
          </Text>        
          </View>

        <TouchableOpacity onPress={handleAddAppointment}>
          <Ionicons name="add-circle-outline" size={26} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id!}
        renderItem={renderItem}
        contentContainerStyle={STYLE.listContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }
        ListEmptyComponent={
          !loading ? <Text style={STYLE.emptyText}>No appointments found.</Text> : null
        }
      />
    </SafeAreaView>
  );
}