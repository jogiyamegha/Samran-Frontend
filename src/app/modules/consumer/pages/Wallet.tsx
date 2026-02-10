import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../auth/core/Auth';
import Method from "../../../../utils/methods";

const ConsumerWallet: React.FC = () => {
    const { currentUser } = useAuth();
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [paymentRef, setPaymentRef] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchWalletData();
    }, []);

    const fetchWalletData = async () => {
        try {
            const balanceRes = await axios.get('/user/wallet/balance');
            if (balanceRes.data && balanceRes.data.result) {
                setBalance(balanceRes.data.result?.balance || 0);
            }

            const txRes = await axios.get('/user/wallet/transactions');
            if (txRes.data && txRes.data.result) {
                setTransactions(txRes.data.result);
            }
        } catch (error) {
            // Silently fail - will show empty state
        }
    };

    const handleDeposit = async () => {
        if (!depositAmount || !paymentRef) {
            toast.warning("Please enter amount and reference ID");
            return;
        }

        setLoading(true);
        try {
            await axios.post('/user/wallet/deposit', {
                amount: depositAmount,
                bankReferenceId: paymentRef,
                description: description || "Wallet Deposit"
            });
            toast.success("Deposit request submitted successfully! Admin will verify.");
            setShowDepositModal(false);
            setDepositAmount('');
            setPaymentRef('');
            setDescription('');
            fetchWalletData();
        } catch (error) {
            toast.error("Failed to submit deposit request");
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: number) => {
        // Mapping based on constants.js: PaymentStatusTypes / TransactionStatus
        // TransactionStatus: Pending=1, Successful=2, Failed=3, InProgress=4
        switch (status) {
            case 1: return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">Pending</span>;
            case 2: return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Success</span>;
            case 3: return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">Failed</span>;
            default: return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800">Unknown</span>;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-[#0b1f33] tracking-tight">My Wallet</h1>
                    <p className="text-[#64748b] mt-1">Manage your funds and transactions</p>
                </div>
                <button
                    onClick={() => setShowDepositModal(true)}
                    className="px-5 py-2.5 bg-[#052F2B] text-white font-bold rounded-xl shadow-lg hover:bg-[#0b1f33] transition-all flex items-center gap-2"
                >
                    <i className="fas fa-plus-circle"></i> Add Funds
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-[#052F2B] to-[#0f766e] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-[#052F2B]/20 md:col-span-2">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <i className="fas fa-wallet fa-8x"></i>
                    </div>
                    <div className="relative z-10">
                        <div className="text-sm font-bold text-[#ECFDF5]/70 uppercase tracking-widest mb-1">Total Balance</div>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-2xl font-medium opacity-80">₹</span>
                            <span className="text-6xl font-black tracking-tight">{balance?.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
                                <div className="text-xs text-[#ECFDF5]/60 font-bold uppercase mb-1">Total Expenses</div>
                                <div className="text-xl font-bold">₹ 0</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
                                <div className="text-xs text-[#ECFDF5]/60 font-bold uppercase mb-1">Last Deposit</div>
                                <div className="text-xl font-bold">--</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Info */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
                    <h3 className="font-bold text-[#0b1f33] mb-4">Payment Methods</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-600">
                                <i className="fas fa-university"></i>
                            </div>
                            <div>
                                <div className="font-bold text-sm text-[#0b1f33]">Bank Transfer</div>
                                <div className="text-xs text-gray-500">Manual Verification</div>
                            </div>
                            <div className="ms-auto">
                                <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 opacity-60">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                                <i className="fab fa-cc-stripe"></i>
                            </div>
                            <div>
                                <div className="font-bold text-sm text-[#0b1f33]">Stripe</div>
                                <div className="text-xs text-gray-500">Coming Soon</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h6 className="font-bold text-[#0b1f33] text-lg">Recent Transactions</h6>
                    <button className="text-sm font-bold text-[#052F2B] hover:underline">Download Statement</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                            <tr>
                                <th className="px-6 py-4">Transaction Details</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No recent transactions.
                                    </td>
                                </tr>
                            ) : transactions.map((tx: any) => (
                                <tr key={tx._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                                <i className="fas fa-exchange-alt"></i>
                                            </div>
                                            <div>
                                                <div className="font-bold text-[#0b1f33]">{tx.description || 'Transaction'}</div>
                                                <div className="text-xs text-gray-400">ID: {tx.transactionId || tx._id?.toString().slice(-6)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-600">
                                        {Method.convertDateToDDMMYYYY(tx._createdAt || tx.createdAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(tx.transactionStatus)}
                                    </td>
                                    <td className="px-6 py-4 text-right font-black text-[#0b1f33]">
                                        ₹{tx.transactionAmount?.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Deposit Modal */}
            <Modal show={showDepositModal} onHide={() => setShowDepositModal(false)} centered contentClassName="rounded-3xl border-0 overflow-hidden">
                <div className="bg-[#052F2B] p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-20 h-20 bg-[#43EBA6] rounded-full opacity-20 blur-2xl"></div>
                    <h4 className="font-black text-2xl relative z-10">Add Funds</h4>
                    <p className="text-[#ECFDF5]/70 text-sm relative z-10">Deposit money into your wallet</p>
                </div>
                <div className="p-8">
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Amount (₹)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                className="font-bold text-lg p-3 rounded-xl border-gray-200 focus:border-[#43EBA6] focus:ring-[#43EBA6]"
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Reference ID (Wait for Admin Approval)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Bank Transaction ID / Ref No."
                                value={paymentRef}
                                onChange={(e) => setPaymentRef(e.target.value)}
                                className="p-3 rounded-xl border-gray-200"
                            />
                        </Form.Group>

                        <Form.Group className="mb-6">
                            <Form.Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description / Note (Optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="E.g. Monthly bill payment funds"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="p-3 rounded-xl border-gray-200"
                            />
                            <Form.Text className="text-muted text-xs mt-2">
                                * Please transfer to our bank account and enter details. Funds will be credited after admin verification.
                            </Form.Text>
                        </Form.Group>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="light" onClick={() => setShowDepositModal(false)} className="py-3 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleDeposit}
                                disabled={loading}
                                className="py-3 rounded-xl font-bold bg-[#052F2B] border-0 hover:bg-[#0b1f33] shadow-lg shadow-[#052F2B]/20 text-white"
                            >
                                {loading ? 'Submitting...' : 'Submit Request'}
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default ConsumerWallet;
