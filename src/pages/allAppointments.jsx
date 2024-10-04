import { useState } from 'react';
import AppointmentSummaryModal from '../components/modals/appointmentSummary';
import appointmentData from '../assets/appointmentData';

const AllAppointments = () => {
    const {appointments, setAppointments} = appointmentData();
    
    const [isOpen, setIsOpen] = useState(-1);
    const [sortOrder, setSortOrder] = useState('asc');

    const sortedAppointments = [...appointments].sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const updateAppointment = ({appointment}) => {
        const dappointments = appointments;
        for(let i=0; i<dappointments.length; i++){
            if( i == isOpen) dappointments[i] = appointment;
        }
        setAppointments (dappointments);
    }

    return (
        <>
            {isOpen !== -1 && (
                <AppointmentSummaryModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    appointment={appointments[isOpen]}
                    setAppointment={setAppointments}
                    updateAppointment={updateAppointment}
                />
            )}
            <div className=" pt-16 pb-4 px-4 h-max w-full">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">All Appointments</h2>
                    <div className="mb-4">
                        <label className="mr-2">Sort by date:</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border rounded px-2 py-1"
                        >
                            <option value="asc">Descending</option>
                            <option value="desc">Ascending</option>
                        </select>
                    </div>
                    <ul className="divide-y divide-gray-300">
                        {sortedAppointments.map((appointment, index) => (
                            <li key={index} className="py-2 hover:cursor-pointer" onClick={() => setIsOpen(index)}>
                                <div className="font-semibold">{appointment.doctor}</div>
                                <div className="text-sm text-gray-500">{appointment.date}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AllAppointments;
