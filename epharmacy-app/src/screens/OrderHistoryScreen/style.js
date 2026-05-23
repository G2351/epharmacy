import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "../../utils/config";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    backgroundColor: "#2563eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50 * scaleHeight,
    paddingBottom: 15 * scaleHeight,
    paddingHorizontal: 16 * scaleWidth,
  },
  headerTitle: { color: "#fff", fontSize: 18 * scaleWidth, fontWeight: "bold" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  emptyText: { fontSize: 15 * scaleWidth, color: "#94a3b8", marginTop: 8 * scaleHeight },

  // Card đơn hàng
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12 * scaleWidth,
    padding: 14 * scaleWidth,
    marginBottom: 12 * scaleHeight,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10 * scaleHeight,
  },
  orderCode: { fontSize: 14 * scaleWidth, fontWeight: "700", color: "#1e293b" },
  orderDate: { fontSize: 12 * scaleWidth, color: "#94a3b8", marginTop: 2 * scaleHeight },
  statusBadge: {
    paddingHorizontal: 10 * scaleWidth,
    paddingVertical: 4 * scaleHeight,
    borderRadius: 20 * scaleWidth,
  },
  statusText: { fontSize: 11 * scaleWidth, fontWeight: "700" },

  // Danh sách sản phẩm
  itemsPreview: { gap: 6 * scaleHeight },
  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8 * scaleWidth,
    paddingVertical: 4 * scaleHeight,
  },
  previewImg: {
    width: 36 * scaleWidth,
    height: 36 * scaleWidth,
    borderRadius: 6 * scaleWidth,
    backgroundColor: "#f8fafc",
  },
  previewName: { flex: 1, fontSize: 13 * scaleWidth, color: "#334155" },
  previewQty: { fontSize: 12 * scaleWidth, color: "#64748b" },
  moreItems: {
    fontSize: 12 * scaleWidth,
    color: "#2563eb",
    marginTop: 4 * scaleHeight,
    fontStyle: "italic",
  },


  expandedSection: { marginTop: 8 * scaleHeight, gap: 6 * scaleHeight },
  divider: { height: 1, backgroundColor: "#f1f5f9", marginVertical: 8 * scaleHeight },
  infoRow: { flexDirection: "row", alignItems: "flex-start", gap: 6 * scaleWidth },
  infoText: {
    flex: 1,
    fontSize: 12 * scaleWidth,
    color: "#64748b",
    lineHeight: 18 * scaleHeight,
  },

  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10 * scaleHeight,
    paddingTop: 10 * scaleHeight,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  itemCount: { fontSize: 12 * scaleWidth, color: "#94a3b8" },
  orderTotal: { fontSize: 15 * scaleWidth, fontWeight: "700", color: "#2563eb" },
});

export default styles;