import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Typography } from '@mui/material';
import api from '../api';

const BirthCertificate = () => {
  // state variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalView, setIsModalView] = useState(false);
  const [birthCertificate, setBirthCertificate] = useState([]);
  const [current_pages, setCurrentPage] = useState(1);
  const [total_pages, setTotalPages] = useState(1);
  const [searChQuery, setSearChQuery] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // State of the form data
  const [formData, setFormData] = useState({
    FullName: "",
    Gender: "",
    BenNumber: "",
    CollectedBy: "",
    idNumberCollector: "",
  });

  // Fetching data
  const fetchData = async (page = 1, search = '') => {
    try {
      const response = await api.get('api/birthcertificate/', {
        params: {
          page: page,
          search: search,
        },
      });

      const data = response.data;
      if (data && data.records && Array.isArray(data.records)) {
        setBirthCertificate(data.records);
        setTotalPages(data.total_pages);
        setCurrentPage(data.current_pages);
      } else {
        setBirthCertificate([]);
      }
    } catch (error) {
      console.error("Fetch data error:", error);
      setBirthCertificate([]);
    }
  };

  useEffect(() => {
    fetchData(current_pages, searChQuery);
  }, [current_pages, searChQuery]);

  // Function to handle view certificate details
  const handleView = (certificate) => {
    console.log("Viewing certificate:", certificate);
    setSelectedCertificate(certificate);
    setIsModalView(true);
  };

  // Form submit handler
  const submitHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api/birthcertificate/', formData);

      if (response.status === 200) {
        const newCertificate = response.data;
        setBirthCertificate((prev) => [...prev, newCertificate]);
        setFormData({
          FullName: "",
          Gender: "",
          BenNumber: "",
          CollectedBy: "",
          idNumberCollector: "",
        });
        setIsModalOpen(false);
      } else {
        alert('Error adding data:', response.statusText);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Network Error: ' + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "65px" }}>
          <div className="container mx-auto">
            <div className="p-5 bg-gray-500 text-3xl text-white m-3">
              <Typography component="h1" variant="h4">
                Manage Birth Certificates
              </Typography>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add
                </button>
              </div>
              <div className="w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searChQuery}
                  onChange={(e) => setSearChQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">FullName</th>
                    <th className="py-3 px-6 text-left">Gender</th>
                    <th className="py-3 px-6 text-left">BenNumber</th>
                    <th className="py-3 px-6 text-left">CollectedBy</th>
                    <th className="py-3 px-6 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 text-sm font-light">
                  {Array.isArray(birthCertificate) && birthCertificate.length > 0 ? (
                    birthCertificate.map((certificate) => (
                      <tr className="border-b border-gray-300 hover:bg-gray-100" key={certificate.id}>
                        <td className="py-3 px-6 text-left whitespace-nowrap">{certificate.FullName}</td>
                        <td className="py-3 px-6 text-left">{certificate.Gender}</td>
                        <td className="py-3 px-6 text-left">{certificate.BenNumber}</td>
                        <td className="py-3 px-6 text-left">{certificate.CollectedBy}</td>
                        <td className="py-3 px-6 text-center">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                            onClick={() => handleView(certificate)}
                          
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-3 px-6 text-center">No Birth Certificates found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-3 bg-gray-300 rounded"
                disabled={current_pages === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <span>Page {current_pages} of {total_pages}</span>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                disabled={current_pages === total_pages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, total_pages))}
              >
                Next
              </button>
            </div>

            {/* Modal for adding certificate */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h2 className="text-xl mb-4">Add New Data</h2>
                  <form onSubmit={handleSubmit}>
                    {/* Form Fields */}
                    <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">
                    Fullname:
                   </label>
                  <input
                  type="text"
                  id="FullName"
                  name="FullName"
                  value={formData.FullName}
                   onChange={submitHandler}
                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                   </div>
                    

                   <div className="mt-4">
                 <label htmlFor="Gender">Gender:</label>
                 <select
                id="Gender"
                name="Gender"
                value={formData.Gender}
                onChange={submitHandler}
             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        
        </select>
    </div>


    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700">
        Ben Number:
      </label>
      <input
        type="text"
        id="BenNumber"
        name="BenNumber"
        value={formData.BenNumber}
        onChange={submitHandler}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
   

    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700">
        Collected By:
      </label>
      <input
        type="text"
        id="CollectedBy"
        name="CollectedBy"
        value={formData.CollectedBy}
        onChange={submitHandler}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>


    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700">
        Id Number Collector:
      </label>
      <input
        type="text"
        id="idNumberCollector"
        name="idNumberCollector"
        value={formData.idNumberCollector}
        onChange={submitHandler}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>


                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}



            {/* Modal for viewing certificate */}
            {isModalView && selectedCertificate && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h2 className="text-xl mb-4">Certificate Details</h2>
                  <p><strong>FullName:</strong> {selectedCertificate.FullName}</p>
                  <p><strong>Gender:</strong> {selectedCertificate.Gender}</p>
                  <p><strong>BenNumber:</strong> {selectedCertificate.BenNumber}</p>
                  <br/>
                  <h2 className="text-xl mb-4">Details Colector</h2>
                  <br/>
                  <p><strong>CollectedBy:</strong> {selectedCertificate.CollectedBy}</p>
                  <p><strong>Collected On:</strong> {selectedCertificate.created_at}</p>
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mt-4"
                    onClick={() => setIsModalView(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default BirthCertificate;
