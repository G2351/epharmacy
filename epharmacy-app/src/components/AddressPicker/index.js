import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, Modal,
  FlatList, ActivityIndicator, StyleSheet, TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { scaleWidth, scaleHeight } from "../../utils/config";

const API = "https://provinces.open-api.vn/api";

export default function AddressPicker({ onSelect }) {
  const [step, setStep] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selected, setSelected] = useState({ province: null, district: null, ward: null });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const fetchProvinces = async () => {
    setLoading(true);
    const res = await fetch(`${API}/?depth=1`);
    const data = await res.json();
    setProvinces(data);
    setLoading(false);
  };

  const fetchDistricts = async (provinceCode) => {
    setLoading(true);
    const res = await fetch(`${API}/p/${provinceCode}?depth=2`);
    const data = await res.json();
    setDistricts(data.districts || []);
    setLoading(false);
  };

  const fetchWards = async (districtCode) => {
    setLoading(true);
    const res = await fetch(`${API}/d/${districtCode}?depth=2`);
    const data = await res.json();
    setWards(data.wards || []);
    setLoading(false);
  };

  const openStep = (s) => {
    setSearch("");
    setStep(s);
    setModalVisible(true);
    if (s === "province") fetchProvinces();
    if (s === "district" && selected.province) fetchDistricts(selected.province.code);
    if (s === "ward" && selected.district) fetchWards(selected.district.code);
  };

  const selectProvince = (item) => {
    setSelected({ province: item, district: null, ward: null });
    setModalVisible(false);
  };

  const selectDistrict = (item) => {
    setSelected((prev) => ({ ...prev, district: item, ward: null }));
    setModalVisible(false);
  };

  const selectWard = (item) => {
    const newSelected = { ...selected, ward: item };
    setSelected(newSelected);
    setModalVisible(false);
    if (newSelected.ward && newSelected.district && newSelected.province) {
      onSelect(`${newSelected.ward.name}, ${newSelected.district.name}, ${newSelected.province.name}`);
    }
  };

  const getCurrentList = () => {
    const list = step === "province" ? provinces : step === "district" ? districts : wards;
    if (!search) return list;
    return list.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  };

  const getTitle = () => {
    if (step === "province") return "Chọn Tỉnh/Thành phố";
    if (step === "district") return "Chọn Quận/Huyện";
    return "Chọn Phường/Xã";
  };

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.stepBtn} onPress={() => openStep("province")}>
          <Text style={styles.stepText} numberOfLines={1}>
            {selected.province ? selected.province.name : "Tỉnh/TP"}
          </Text>
          <Icon name="chevron-down" size={14} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.stepBtn, !selected.province && styles.disabled]}
          onPress={() => selected.province && openStep("district")}
        >
          <Text style={styles.stepText} numberOfLines={1}>
            {selected.district ? selected.district.name : "Quận/Huyện"}
          </Text>
          <Icon name="chevron-down" size={14} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.stepBtn, !selected.district && styles.disabled]}
          onPress={() => selected.district && openStep("ward")}
        >
          <Text style={styles.stepText} numberOfLines={1}>
            {selected.ward ? selected.ward.name : "Phường/Xã"}
          </Text>
          <Icon name="chevron-down" size={14} color="#64748b" />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{getTitle()}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color="#1e293b" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.search}
            placeholder="Tìm kiếm..."
            value={search}
            onChangeText={setSearch}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              data={getCurrentList()}
              keyExtractor={(item) => String(item.code)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    if (step === "province") selectProvince(item);
                    else if (step === "district") selectDistrict(item);
                    else selectWard(item);
                  }}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 6 * scaleWidth, marginTop: 4 * scaleHeight },
  stepBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 8 * scaleWidth,
    padding: 8 * scaleWidth, backgroundColor: "#f8fafc",
  },
  stepText: { fontSize: 12 * scaleWidth, color: "#1e293b", flex: 1 },
  disabled: { opacity: 0.4 },
  modal: { flex: 1, backgroundColor: "#fff", paddingTop: 50 * scaleHeight },
  modalHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 16 * scaleWidth, paddingBottom: 12 * scaleHeight,
    borderBottomWidth: 1, borderBottomColor: "#e2e8f0",
  },
  modalTitle: { fontSize: 16 * scaleWidth, fontWeight: "700", color: "#1e293b" },
  search: {
    margin: 12 * scaleWidth, borderWidth: 1, borderColor: "#e2e8f0",
    borderRadius: 8 * scaleWidth, padding: 10 * scaleWidth, fontSize: 14 * scaleWidth,
  },
  item: {
    paddingVertical: 14 * scaleHeight, paddingHorizontal: 16 * scaleWidth,
    borderBottomWidth: 1, borderBottomColor: "#f1f5f9",
  },
  itemText: { fontSize: 14 * scaleWidth, color: "#1e293b" },
});