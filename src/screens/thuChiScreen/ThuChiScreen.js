import { useDispatch, useSelector } from "react-redux";
import { addSoTien, updateSoTien, deleteSoTien } from "../../redux/reducers/QLChiTieu";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

const ThuChiScreen = () => {
    //1. Khai báo các state để thực hiện thêm
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('Thu');
    const [amount, setAmount] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    //lấy  danh sách dữ liệu
    const listThuChi = useSelector(state => state.listThuChi.listThuChi);
    const tongThu = useSelector(state => state.listThuChi.tongThu);
    const tongChi = useSelector(state => state.listThuChi.tongChi);

    // lấy đối tượng để điều khiển các action
    const dispatch = useDispatch();

    // hàm xử lý việc thêm
    const handleAddThuChi = () => {
        if (title.trim() !== '' && amount.trim() !== '') {
            let duLieuThem = {
                id: Math.random().toString(),
                title,
                description,
                date,
                type,
                amount: parseFloat(amount)
            };
            dispatch(addSoTien(duLieuThem));
            setTitle('');
            setDescription('');
            setDate('');
            setType('Thu');
            setAmount('');
        }
    }

    // hàm xử lý xóa
    const handleDeleteThuChi = (id) => {
        dispatch(deleteSoTien(id));
    }

    // Dành cho sửa: Cần có state lưu trạng thái đang sửa bản ghi nào
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editType, setEditType] = useState('Thu');
    const [editAmount, setEditAmount] = useState('');

    const handleEdit = (thuChi) => {
        setEditId(thuChi.id);
        setEditTitle(thuChi.title);
        setEditDescription(thuChi.description);
        setEditDate(thuChi.date);
        setEditType(thuChi.type);
        setEditAmount(thuChi.amount.toString());
    }

    // hàm lưu kết quả sửa
    const handleUpdate = () => {
        if (editTitle.trim() !== '' && editAmount.trim() !== '') {
            dispatch(updateSoTien({
                id: editId,
                title: editTitle,
                description: editDescription,
                date: editDate,
                type: editType,
                amount: parseFloat(editAmount)
            }));
            setEditId(null);
            setEditTitle('');
            setEditDescription('');
            setEditDate('');
            setEditType('Thu');
            setEditAmount('');
        }
    }

    const filteredThuChi = listThuChi.filter(thuChi =>
        thuChi.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <TextInput placeholder="Nhập tiêu đề" value={title} onChangeText={setTitle} style={st.st}/>
            <TextInput placeholder="Nhập mô tả" value={description} onChangeText={setDescription} style={st.st}/>
            <TextInput placeholder="Nhập ngày" value={date} onChangeText={setDate} style={st.st}/>
            <TextInput placeholder="Nhập số tiền" value={amount} onChangeText={setAmount} inputMode="numeric" style={st.st}/>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
                <Text style={{ color: 'black' }}>Loại: </Text>
                <TouchableOpacity style={{ paddingHorizontal: 25 }} onPress={() => setType('Thu')}>
                    <Text style={{ color: type === 'Thu' ? 'black' : '#CAD9D9' }}>Thu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 5 }} onPress={() => setType('Chi')}>
                    <Text style={{ color: type === 'Chi' ? 'black' : '#CAD9D9' }}>Chi</Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: 100, marginTop: 10 }}>
                <Button title="Thêm" onPress={handleAddThuChi} />
            </View>

            <TextInput
                placeholder="Tìm kiếm theo tiêu đề"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />

            <View>
                <Text>Tổng Thu: {tongThu}</Text>
                <Text>Tổng Chi: {tongChi}</Text>
            </View>

            {
                filteredThuChi.map(row => (
                    <View key={row.id} style={{ margin: 10, padding: 10, borderColor: 'blue', borderWidth: 1 }}>
                        {
                            (editId === row.id) ?
                                (
                                    <>
                                        <TextInput value={editTitle} onChangeText={setEditTitle} style={st.st}/>
                                        <TextInput value={editDescription} onChangeText={setEditDescription} style={st.st}/>
                                        <TextInput value={editDate} onChangeText={setEditDate} style={st.st}/>
                                        <TextInput value={editAmount} onChangeText={setEditAmount} style={st.st}/>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
                                            <Text style={{ color: 'black' }}>Loại: </Text>
                                            <TouchableOpacity style={{ paddingHorizontal: 25 }} onPress={() => setEditType('Thu')}>
                                                <Text style={{ color: type === 'Thu' ? 'black' : '#CAD9D9' }}>Thu</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ padding: 5 }} onPress={() => setEditType('Chi')}>
                                                <Text style={{ color: type === 'Chi' ? 'black' : '#CAD9D9' }}>Chi</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ width: 100 }}>
                                            <Button title="Cập nhật" onPress={handleUpdate} />
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <Text>{row.title} - {row.description} - {row.date} - {row.type} - {row.amount}</Text>
                                        <TouchableOpacity onPress={() => handleDeleteThuChi(row.id)}>
                                            <Text style={{ color: 'red' }}>Xóa</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleEdit(row)}>
                                            <Text>Edit</Text>
                                        </TouchableOpacity>
                                    </>
                                )
                        }
                    </View>
                ))
            }
        </View>
    );
}
const st=StyleSheet.create(
    {
        st:{
            borderWidth:1,borderRadius:10,marginTop:10
        }
    }
)
export default ThuChiScreen;
