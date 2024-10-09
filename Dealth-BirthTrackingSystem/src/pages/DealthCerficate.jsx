import React,{useState,useEffect}  from 'react'
import Sidebar from '../components/Sidebar'
import { Box,Typography } from '@mui/material'
import api from '../api'


const DealthCerficate = () => {

   // State for modal visibility
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isModalView, setIsModalView] = useState(false);
   const [deathCertificate, setDeathCertificate] = useState([]);
   const [TotalPages, setTotalPages] = useState(1);
   const [CurrentPage, setCurrentPage] = useState(1);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedDeathCertificate, setSelectedDeathCertificate] = useState(null);
   // State for form data
   const [formData, setFormData] = useState({
    FullName:"",
    Gender:"",
    PlaceOfDeath:"",
    CollectedBy:"",
    IdNumberOfCollector:""
   });

  //  Fetching data from api 
  const fetchData = async (page = 1, search = '') => {
    console.log("Search Query: ", search);
    try{

      const resp = await api.get('api/deathcertificate/', {
        params: {
          page: page,
          search: search
        },
    });

    const data = resp.data;
    setDeathCertificate(data.records)
    setTotalPages(data.TotalPages)
    setCurrentPage(data.currentPage)


    console.log(" The Death Data: ", data);


    } catch (error){
      console.error("Fetch Data Error: ", error)
      setDeathCertificate([]);
    }
  } 

  useEffect(() => {
    console.log("Current Page: ", CurrentPage);
    console.log("Total Pages: ", TotalPages);
   fetchData(CurrentPage, searchQuery);
  },[CurrentPage, searchQuery])

  
   // Handle form field changes
   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setFormData({
       ...formData,
       [name]: value
     });
   };


     // Function to handle view certificate details
  const handleView = (certificate) => {
    console.log("Viewing certificate:", certificate);
    setSelectedDeathCertificate(certificate);
    setIsModalView(true);
  };
 
   // Handle form submission
   const handleSubmit =  async (e) => {
     e.preventDefault();
     console.log(formData);
     // Logic to add form data (e.g., add to table or send to API)
     try {

        const response = await api.post('api/deathcertificate/', formData)
          if(response.status === 200){
            const newDeathCertificate = response.data;
            setDeathCertificate((prev) => [...prev, newDeathCertificate]);
               
             // Reset form and close modal
     setFormData({
      FullName:"",
      Gender:"",
      PlaceOfDeath:"",
      CollectedBy:"",
      IdNumberOfCollector:""
       
    });
    setIsModalOpen(false);

          
  }else{
    alert('data added: ', response.statusText);
  }
 
    }catch(error){
      console.error("Network Error: ", error);
      alert("NetworK Error: " +  (error.response ? error.response.data : error.message))
    }
   };


  return (
    <>
    <Box sx={{display:'flex'}}>
      <Sidebar/>

      <Box component="main" sx={{ flexGrow:1, p:3, marginTop:"65px"}}>

        
        <div class="container mx-auto">
        <div className="p-5 bg-gray-500 text-3xl text-white m-3">
              <Typography component="h1" variant="h4">
                Manage Death Certificates
              </Typography>
            </div>
      
      <div class="flex items-center justify-between mb-4">
          <div>
              <button 
              class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
              >Add</button>
          </div>
          <div class="w-full max-w-sm">
              <input
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
              type="text" 
              placeholder="Search..." 
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
      </div>

      
      <div class="overflow-x-auto">
          <table class="min-w-full bg-white border border-gray-300 rounded-md">
              <thead>
                  <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th class="py-3 px-6 text-left">FullName</th>
                      <th class="py-3 px-6 text-left">Gender</th>
                      <th class="py-3 px-6 text-left"> Place Of Death</th>
                      <th class="py-3 px-6 text-left"> Collected By</th>
                      <th class="py-3 px-6 text-center">Action</th>
                  </tr>
              </thead>
              <tbody class="text-gray-600 text-sm font-light">
                {deathCertificate.map((record) => (

                  <tr Key={record.id} class="border-b border-gray-300 hover:bg-gray-100">
                      <td class="py-3 px-6 text-left whitespace-nowrap">{record.FullName}</td>
                      <td class="py-3 px-6 text-left">{record.Gender}</td>
                      <td class="py-3 px-6 text-left">{record.PlaceOfDeath}</td>
                      <td class="py-3 px-6 text-left">{record.CollectedBy}</td>
                      <td class="py-3 px-6 text-center">
                          
                          <button 
                          class="bg-red-500
                           text-white px-3 py-1 
                           rounded hover:bg-red-700 
                           ml-2"
                           onClick={() => handleView(record)}
                           >
                            View
                            </button>
                      </td>
                  </tr>

                 ))}
                  
                 
              </tbody>
          </table>
      </div>

      <div className='flex justify-between  mt-4'>
                    <button 
                     disabled={CurrentPage === 1}
                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}

                    className="bg-gray-500 text-white py-2 px-2 rounded hover:bg-gray-700">
                      Previous
                      </button>

                      <span>Page{CurrentPage} of {TotalPages}</span>

                      <button 
                      disabled={CurrentPage === TotalPages}
                      className="bg-gray-500 text-white py-2 px-2 rounded hover:bg-gray-700"
                       onClick={() => setCurrentPage((prev) => Math.min(prev + 1, TotalPages))}
                    
                       >
                           Next
                        </button>
                  </div>



        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4">Add New Data</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="FullName"
                    value={formData.FullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>


                <div className="mt-4">
                  <label htmlFor="Gender">Gender</label>
                  <select 
                  id="Gender"
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required

                  >

                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>

                  </select>
                </div>


                <div className="mt-4">
                  <label htmlFor="Gender">Place Of Death</label>
                  <select 
                  id="PlaceOfDeath"
                  name="PlaceOfDeath"
                  value={formData.PlaceOfDeath}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required

                  >

                <option value="" disabled>Select Place Of Death</option>
                <option value="Home">Home</option>
                <option value="Hospital">Hospital</option>

                  </select>
                </div>


                <div className="mb-4">
                  <label htmlFor="CollectedBy" className="block text-gray-700">
                  CollectedBy:
                  </label>
                  <input
                    type="text"
                    id="CollectedBy"
                    name="CollectedBy"
                    value={formData.CollectedBy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="IdNumberOfCollector" className="block text-gray-700">
                  IdNumberOfCollector:
                  </label>
                  <input
                    type="text"
                    id="IdNumberOfCollector"
                    name="IdNumberOfCollector"
                    value={formData.IdNumberOfCollector}
                    onChange={handleInputChange}
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
                    {isModalView && selectedDeathCertificate && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h2 className="text-xl mb-4">Certificate Details</h2>
                  <p><strong>FullName:</strong> {selectedDeathCertificate.FullName}</p>
                  <p><strong>Gender:</strong> {selectedDeathCertificate.Gender}</p>
                  
                  <p><strong>BenNumber:</strong> {selectedDeathCertificate.PlaceOfDeath}</p>
                  <br/>
                  <h2 className="text-xl mb-4">Details Collector</h2>
                  <br/>
                  <p><strong>CollectedBy:</strong> {selectedDeathCertificate.CollectedBy}</p>
                   <p><strong>Collector ID#:</strong> {selectedDeathCertificate.IdNumberOfCollector}</p>
                  <p><strong>Collected On:</strong> {selectedDeathCertificate.created_at}</p>
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
  )
}

export default DealthCerficate