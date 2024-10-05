import React,{useState}  from 'react'
import Sidebar from '../components/Sidebar'
import { Box,Typography } from '@mui/material'
const DealthCerficate = () => {

   // State for modal visibility
   const [isModalOpen, setIsModalOpen] = useState(false);
   // State for form data
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     role: ""
   });
 
   // Handle form field changes
   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setFormData({
       ...formData,
       [name]: value
     });
   };
 
   // Handle form submission
   const handleSubmit = (e) => {
     e.preventDefault();
     // Logic to add form data (e.g., add to table or send to API)
     console.log("Form Data: ", formData);
 
     // Reset form and close modal
     setFormData({ name: "", email: "", role: "" });
     setIsModalOpen(false);
   };


  return (
    <>
    <Box sx={{display:'flex'}}>
      <Sidebar/>

      <Box component="main" sx={{ flexGrow:1, p:3, marginTop:"65px"}}>

        <Typography >
        <div class="container mx-auto">
      
      <div class="flex items-center justify-between mb-4">
          <div>
              <button 
              class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
              >Add</button>
          </div>
          <div class="w-full max-w-sm">
              <input type="text" placeholder="Search..." class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
      </div>

      
      <div class="overflow-x-auto">
          <table class="min-w-full bg-white border border-gray-300 rounded-md">
              <thead>
                  <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th class="py-3 px-6 text-left">Name</th>
                      <th class="py-3 px-6 text-left">Email</th>
                      <th class="py-3 px-6 text-left">Role</th>
                      <th class="py-3 px-6 text-center">Action</th>
                  </tr>
              </thead>
              <tbody class="text-gray-600 text-sm font-light">
                  <tr class="border-b border-gray-300 hover:bg-gray-100">
                      <td class="py-3 px-6 text-left whitespace-nowrap">John Doe</td>
                      <td class="py-3 px-6 text-left">john@example.com</td>
                      <td class="py-3 px-6 text-left">Admin</td>
                      <td class="py-3 px-6 text-center">
                          <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">Edit</button>
                          <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 ml-2">Delete</button>
                      </td>
                  </tr>
                  
              </tbody>
          </table>
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
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="role" className="block text-gray-700">
                    Role:
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
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
      </div>
  
          </Typography>

      </Box>
    </Box>
    </>
  )
}

export default DealthCerficate