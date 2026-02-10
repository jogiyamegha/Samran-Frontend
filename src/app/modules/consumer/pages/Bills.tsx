import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ConsumerBills: React.FC = () => {
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('online');

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get('/user/my-bills');
      if (response.data && response.data.result) {
        setBills(response.data.result);
      } else {
        setBills([]);
      }
    } catch (error) {
      // Silently fail - will show empty state
      setBills([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePayClick = (bill: any) => {
    setSelectedBill(bill);
    setShowPayModal(true);
  };

  const handlePaymentSubmit = async () => {
    try {
      if (paymentMethod === 'cash') {
        await axios.put(`/user/bill/request-cash-payment/${selectedBill._id}`);
        toast.success(`Cash payment request submitted. Our admin will contact you shortly.`);
        fetchBills(); // Refresh list to update status
      } else {
        // Placeholder for online payment flow
        toast.info(`Redirecting to payment gateway for Bill #${selectedBill._id?.toString().slice(-4)}...`);
        // Here you would typically call /user/payment/create-intent
      }
      setShowPayModal(false);
    } catch (error) {
      toast.error('Failed to submit payment request.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#0b1f33] tracking-tight">My Bills</h1>
          <p className="text-[#64748b] mt-1">View and manage your solar energy bills</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm">
            <i className="fas fa-filter me-2"></i> Filter
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm">
            <i className="fas fa-download me-2"></i> Download All
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#052F2B]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f8fafc] text-xs uppercase text-gray-500 font-bold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Bill Details</th>
                  <th className="px-6 py-4">Period</th>
                  <th className="px-6 py-4">Units (kWh)</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bills.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No bills found.
                    </td>
                  </tr>
                ) : bills.map((bill) => (
                  <tr key={bill._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#0b1f33]">BILL-{bill._id?.toString().slice(-4).toUpperCase()}</div>
                      <div className="text-xs text-gray-400">{bill.ppaUniqueId} • {bill.plantUniqueId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-700">{bill.billingMonth} {bill.billingYear}</div>
                      <div className="text-xs text-gray-400">Due: {new Date(bill.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-3">
                        <div><span className="text-xs text-gray-400 block">Gen</span><span className="font-bold text-gray-700">{bill.generatedUnits}</span></div>
                        <div><span className="text-xs text-gray-400 block">Cons</span><span className="font-bold text-gray-700">{bill.consumedUnits}</span></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-[#0b1f33]">
                      ₹{bill.totalAmount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${bill.isPaid
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {bill.isPaid ? <> <i className="fas fa-check-circle me-1"></i> Paid </> : 'Unpaid'}
                        {bill.paymentStatus === 1 && !bill.isPaid && <span className="ml-1 text-xs text-yellow-600">(Pending)</span>}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {!bill.isPaid && (
                          <button
                            onClick={() => handlePayClick(bill)}
                            className="px-3 py-1.5 bg-[#052F2B] text-white text-xs font-bold rounded-lg hover:bg-[#0b1f33] transition shadow-md shadow-[#052F2B]/20"
                          >
                            Pay Now
                          </button>
                        )}
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 transition">
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      <Modal show={showPayModal} onHide={() => setShowPayModal(false)} centered contentClassName="rounded-3xl border-0 overflow-hidden">
        <div className="bg-[#052F2B] p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-20 h-20 bg-[#43EBA6] rounded-full opacity-20 blur-2xl"></div>
          <h4 className="font-black text-xl relative z-10">Pay Bill</h4>
          <div className="text-[#ECFDF5]/70 text-sm relative z-10 mt-1">
            Amount to Pay: <span className="font-bold text-white text-lg">₹{selectedBill?.totalAmount?.toLocaleString()}</span>
          </div>
        </div>
        <div className="p-6">
          <Form>
            <div className="space-y-3 mb-6">
              <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-[#43EBA6] bg-emerald-50/30 ring-1 ring-[#43EBA6]' : 'border-gray-200 hover:border-gray-300'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  className="hidden"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                />
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center me-3 ${paymentMethod === 'online' ? 'border-[#43EBA6]' : 'border-gray-300'}`}>
                  {paymentMethod === 'online' && <div className="w-3 h-3 rounded-full bg-[#43EBA6]"></div>}
                </div>
                <div className="flex-grow">
                  <div className="font-bold text-[#0b1f33]">Online Payment</div>
                  <div className="text-xs text-gray-500">Credit/Debit Card, UPI, Netbanking</div>
                </div>
                <i className="fas fa-credit-card text-gray-400 text-xl"></i>
              </label>

              <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-[#43EBA6] bg-emerald-50/30 ring-1 ring-[#43EBA6]' : 'border-gray-200 hover:border-gray-300'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  className="hidden"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center me-3 ${paymentMethod === 'cash' ? 'border-[#43EBA6]' : 'border-gray-300'}`}>
                  {paymentMethod === 'cash' && <div className="w-3 h-3 rounded-full bg-[#43EBA6]"></div>}
                </div>
                <div className="flex-grow">
                  <div className="font-bold text-[#0b1f33]">Cash / Bank Transfer</div>
                  <div className="text-xs text-gray-500">Submit request for offline payment</div>
                </div>
                <i className="fas fa-money-bill-wave text-gray-400 text-xl"></i>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="light" onClick={() => setShowPayModal(false)} className="py-3 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handlePaymentSubmit}
                className="py-3 rounded-xl font-bold bg-[#052F2B] border-0 hover:bg-[#0b1f33] shadow-lg shadow-[#052F2B]/20 text-white"
              >
                Pay Now
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ConsumerBills;