import { StyleSheet } from "react-native";

export const COLORS = {
  primary: '#07607c',
  secondary: '#0fa7c8',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  canceled: '#f7e1e1',
  disabled: "#adb5bd",
  completed: '#E1F7EF',
  scheduled: '#E0F2FE',
  error: '#EF4444',
  border: '#E2E8F0',
  success: "#10B981",
  shadow: "#000",
  text: {
    primary: "#005682",
    secondary: '#078baa',
    main: "#1E293B",
    muted: "#64748B",
  },
  input: {
    background: "#f1f3f5",
    border: '#e9ecef',
  },
  icon: {
    primary: "#00A8C5",
    disabled: '#6b7280bf',
  },
};

export const STYLE = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  expandedCard: {
    borderColor: COLORS.secondary,
    borderWidth: 1
  },
  cardHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 12
  },
  patientName: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: COLORS.text.main
  },
  doctorName: {
    fontSize: 13,
    color: COLORS.text.muted,
    marginTop: 2
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600" as const,
  },
  dateTimeRow: {
    flexDirection: 'row' as const,
    gap: 16
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.text.main,
    fontWeight: '500' as const
  },
  expandedContent: {
    marginTop: 12
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12
  },
  detailText: {
    fontSize: 14,
    color: COLORS.text.main,
    marginVertical: 6
  },
  bold: {
    fontWeight: '700' as const
  },
  noteBox: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
    marginTop: 4
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: COLORS.text.muted,
    marginBottom: 4,
    textTransform: 'uppercase' as const
  },
  noteText: {
    fontSize: 14,
    color: COLORS.text.main,
    fontStyle: 'italic' as const
  },
  infoItem: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 6,
  },
  navLogo: {
    width: 70,
    height: 25
  },
  navContainer: {
    backgroundColor: COLORS.surface,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dashContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    padding: 20
  },
  padding_20: {
    padding: 20,
  },
  header: {
    padding: 20,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "800" as const,
    color: COLORS.text.primary
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.text.muted,
    marginTop: 4
  },
  listContent: {
    paddingHorizontal: 25,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 16,
    textAlign: 'center' as const
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  },
  emptyText: {
    textAlign: 'center' as const,
    marginTop: 40,
    color: COLORS.text.muted
  },
  inner: {
    flex: 1,
    justifyContent: "center" as const,
    padding: 24
  },
  logoContainer: {
    alignItems: "center" as const,
    marginBottom: 40
  },
  logo: {
    width: 220,
    height: 80
  },
  subtitle: {
    color: COLORS.text.muted,
    fontSize: 14,
    marginTop: 30,
    fontWeight: "500" as const
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold" as const,
    color: "#1a2a4e",
    marginBottom: 24,
    textAlign: "center" as const
  },
  inputContainer: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: COLORS.text.muted,
    marginBottom: 8
  },
  input: {
    backgroundColor: COLORS.input.background,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: COLORS.input.border,
  },
  inputError: {
    borderColor: COLORS.error
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center" as const,
    marginTop: 40,
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    gap: 6
  },
  buttonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: "bold" as const
  },
  globalErrorContainer: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    marginBottom: 15
  },
  globalError: {
    color: COLORS.error,
    fontSize: 13
  },
  loginErrorText: {
    color: COLORS.error,
    fontSize: 13,
    marginTop: 4
  },
  passwordEye: {
    position: 'absolute' as const,
    right: 11,
    top: '33%' as const,
  },
  marginRight_6: {
    marginRight: 6,
  },
  marginBottom_16: {
    marginBottom: 16,
  },
  formInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    color: COLORS.text.main,
  },
  centerRow_8: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: COLORS.text.primary,
    marginBottom: 8,
    marginLeft: 4
  },
  navHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: 24,
    backgroundColor: COLORS.surface,
    margin: 10,
    borderRadius: 20,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  editButton: {
    marginLeft: 8,
    backgroundColor: '#F1F5F9',
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  deleteButton: {
    backgroundColor: COLORS.canceled,
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 8,
    alignItems: "center" as const,
    width: '100%' as const
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  modalContent: {
    width: "90%" as const,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 10,
  },
  timeModalContent: {
    width: "60%" as const,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 10,
    alignItems: "center" as const,
  },
  actionButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8
  },
  rowSpaceBetween: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const
  },
  closeIcon: {
    position: "absolute" as const,
    top: 8,
    right: 8,
    zIndex: 10,
    padding: 2,
    backgroundColor: COLORS.disabled + '55',
    borderRadius: 20,
    marginBottom: 10
  },
  scrollContent: {
    paddingBottom: 40
  },
  formContainer: {
    padding: 24,
    marginBottom: 25
  },
  dateView: {
    flex: 1,
    marginRight: 8
  },
  timeView: {
    flex: 1,
    marginLeft: 8
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
    gap: 8,
  },
  noteInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    color: COLORS.text.main,
    minHeight: 100,
    textAlignVertical: "top",
  },

});

export const minDate = new Date().toISOString().split('T')[0];