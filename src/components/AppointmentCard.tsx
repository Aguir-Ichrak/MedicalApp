import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, STYLE } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../services/store";
import { deleteAppointment } from "../services/slices/appointmentsSlice";
import { getAuth } from "firebase/auth";
import { RootStackParamList } from "../utils/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appointment } from "../models/Appointment";

interface AppointmentCardProps {
  item: Appointment;
  isExpanded: boolean;
  onPress: () => void;
}
type NavigationProp = StackNavigationProp<RootStackParamList>;

export const AppointmentCard = React.memo(({ item, isExpanded, onPress }: AppointmentCardProps) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchToken = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error("User not logged in");
        return;
      }
      const token = await user.getIdToken();
      setUserToken(token);
    };

    fetchToken();
  }, []);

  const handleRedirection = () => {
    navigation.navigate('EditAppointment', { appointmentId: item.id });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Appointment",
      `Are you sure you want to delete the appointment for ${item.patientName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            if (!userToken) {
              Alert.alert("Error", "User not logged in");
              return;
            }
            try {
              await dispatch(deleteAppointment({ id: item.id, token: userToken }));
            } catch (error) {
              Alert.alert("Error", "Could not delete the appointment.");
            }
          }
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[STYLE.card, isExpanded && STYLE.expandedCard]}
    >
      <View style={STYLE.cardHeader}>
        <View>
          <Text style={STYLE.patientName}>{item.patientName}</Text>
          <Text style={STYLE.doctorName}>Dr. {item.doctorName}</Text>
        </View>
        <View
          style={[
            STYLE.statusBadge,
            {
              backgroundColor:
                item.status === 'Completed'
                  ? COLORS.completed
                  : item.status === 'Cancelled'
                    ? COLORS.canceled
                    : COLORS.scheduled,
            },
          ]}
        >
          <Text
            style={[
              STYLE.statusText,
              {
                color:
                  item.status === 'Completed'
                    ? COLORS.success
                    : item.status === 'Cancelled'
                      ? COLORS.error
                      : COLORS.primary,
              },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View style={STYLE.dateTimeRow}>
        <View style={STYLE.infoItem}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.icon.primary} />
          <Text style={STYLE.infoLabel}>{item.date}</Text>
        </View>

        <View style={STYLE.infoItem}>
          <Ionicons name="time-outline" size={16} color={COLORS.icon.primary} />
          <Text style={STYLE.infoLabel}>{item.time || "N/A"}</Text>
        </View>
      </View>


      {isExpanded && (
        <View style={STYLE.expandedContent}>
          <View style={STYLE.divider} />
          <View style={STYLE.rowSpaceBetween}>
            <Text style={STYLE.detailText}><Text style={STYLE.bold}>Duration:</Text> {item.duration} mins</Text>
            <View style={STYLE.actionButton}>
              <TouchableOpacity
                onPress={handleRedirection}
                style={STYLE.editButton}
              >
                <Ionicons name="pencil" size={13} color={COLORS.secondary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={STYLE.deleteButton}
              >
                <Ionicons name="trash-outline" size={13} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          </View>
          {item.note && (
            <View style={STYLE.noteBox}>
              <Text style={STYLE.noteTitle}>Notes:</Text>
              <Text style={STYLE.noteText}>{item.note}</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
});
