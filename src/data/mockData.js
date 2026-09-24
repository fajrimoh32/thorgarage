export const mockUsers = [
  { id: 'u-owner', name: 'Owner THOR', email: 'owner@thorgarage.id', password: 'owner123', role: 'owner', status: 'active' },
  { id: 'u-admin', name: 'Admin Workshop', email: 'admin@thorgarage.id', password: 'admin123', role: 'admin', status: 'active' },
]

export const mockCustomers = [
  { id: 'C-1001', name: 'Rafi Ardi', phone: '0812-3456-7788', vehicle: 'Vario 150', plate: 'B 1337 ATO', status: 'Active' },
  { id: 'C-1002', name: 'Nanda Putri', phone: '0858-4421-9000', vehicle: 'RX King', plate: 'B 7781 TQG', status: 'Repeat' },
  { id: 'C-1003', name: 'Hendra S', phone: '0821-9901-2112', vehicle: 'Beat Street', plate: 'B 2210 KJY', status: 'Active' },
  { id: 'C-1004', name: 'Irfan N', phone: '0811-9876-2201', vehicle: 'Supra X', plate: 'B 9801 HLM', status: 'New' },
]

export const mockInventory = [
  { id: 'P-2001', name: 'Oli Mesin 10W-40', sku: 'OLI-10W40', stock: 12, unit: 'pcs', status: 'Ready' },
  { id: 'P-2002', name: 'Brake Pad Depan', sku: 'BP-DP-12', stock: 4, unit: 'set', status: 'Low' },
  { id: 'P-2003', name: 'Filter Udara', sku: 'FLT-UDR-22', stock: 7, unit: 'pcs', status: 'Ready' },
  { id: 'P-2004', name: 'Kampas Kopling', sku: 'KPK-CLT-02', stock: 2, unit: 'set', status: 'Critical' },
]

export const mockServiceQueue = [
  { id: 'TS-2041', customer: 'Rafi Ardi', bike: 'Vario 150', service: 'Tune Up', mechanic: 'Adit', eta: '20 min', status: 'In Progress', amount: 'Rp 420.000' },
  { id: 'TS-2042', customer: 'Nanda Putri', bike: 'RX King', service: 'Ganti Ban', mechanic: 'Bima', eta: '12 min', status: 'Waiting', amount: 'Rp 310.000' },
  { id: 'TS-2043', customer: 'Hendra S', bike: 'Beat Street', service: 'Service Berkala', mechanic: 'Candra', eta: '35 min', status: 'Ready', amount: 'Rp 280.000' },
  { id: 'TS-2044', customer: 'Irfan N', bike: 'Supra X', service: 'Rem Cakram', mechanic: 'Doni', eta: '15 min', status: 'In Progress', amount: 'Rp 560.000' },
]

export const mockTransactions = [
  { id: 'INV-9012', customer: 'Rafi Ardi', vehicle: 'Vario 150', service: 'Tune Up', method: 'Cash', total: 420000, due: 0, status: 'Paid', cashier: 'Kasir 1' },
  { id: 'INV-9013', customer: 'Nanda Putri', vehicle: 'RX King', service: 'Ganti Ban', method: 'Transfer', total: 310000, due: 310000, status: 'Pending', cashier: 'Kasir 1' },
  { id: 'INV-9014', customer: 'Hendra S', vehicle: 'Beat Street', service: 'Service Berkala', method: 'Cash', total: 280000, due: 0, status: 'Paid', cashier: 'Kasir 1' },
  { id: 'INV-9015', customer: 'Irfan N', vehicle: 'Supra X', service: 'Rem Cakram', method: 'Transfer', total: 560000, due: 150000, status: 'Partial', cashier: 'Kasir 2' },
]

export const mockPayments = [
  { id: 'INV-9012', customer: 'Rafi Ardi', method: 'Cash', total: 420000, due: 0, status: 'Paid' },
  { id: 'INV-9013', customer: 'Nanda Putri', method: 'Transfer', total: 310000, due: 310000, status: 'Pending' },
  { id: 'INV-9014', customer: 'Hendra S', method: 'Cash', total: 280000, due: 0, status: 'Paid' },
  { id: 'INV-9015', customer: 'Irfan N', method: 'Transfer', total: 560000, due: 150000, status: 'Partial' },
]

export const revenueSeries = [
  { name: 'Mon', value: 22 },
  { name: 'Tue', value: 26 },
  { name: 'Wed', value: 31 },
  { name: 'Thu', value: 28 },
  { name: 'Fri', value: 41 },
  { name: 'Sat', value: 50 },
  { name: 'Sun', value: 46 },
]

export const serviceMix = [
  { name: 'Servis Ringan', value: 38 },
  { name: 'Ganti Oli', value: 24 },
  { name: 'Rem & Ban', value: 18 },
  { name: 'Mesin', value: 12 },
  { name: 'Lainnya', value: 8 },
]

export const workshopActivities = [
  'Customer Rafi masuk untuk tune up motor Vario 150',
  'Stok kampas kopling turun ke batas minimum',
  'Pembayaran invoice TS-2038 berhasil diproses',
  'Customer Nanda booking service hari Sabtu jam 09.00',
  'Part filter udara baru masuk dari supplier',
]

export const technicianLoad = [
  { name: 'Adit', tasks: 5, finish: 72, color: '#4F46E5' },
  { name: 'Bima', tasks: 4, finish: 58, color: '#00D4FF' },
  { name: 'Candra', tasks: 3, finish: 67, color: '#FFB703' },
  { name: 'Doni', tasks: 6, finish: 81, color: '#22C55E' },
]

export const serviceCatalog = [
  { id: 'S-01', name: 'Tune Up', duration: '60 min', price: 350000 },
  { id: 'S-02', name: 'Service Berkala', duration: '90 min', price: 420000 },
  { id: 'S-03', name: 'Ganti Oli', duration: '30 min', price: 140000 },
  { id: 'S-04', name: 'Rem Cakram', duration: '75 min', price: 560000 },
  { id: 'S-05', name: 'Ganti Ban', duration: '40 min', price: 310000 },
]

export const initialRoles = ['owner', 'admin']

export const defaultTheme = 'dark'
