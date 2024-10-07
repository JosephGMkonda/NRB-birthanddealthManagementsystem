import React,{useState,useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import { Box,Typography } from '@mui/material'
import api from '../api'


const BirthCertificate = () => {
//state valiables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [birthCertificate, setBirthCertificate] = useState([]);
  const [current_pages, setCurrentPage] = useState(1);
  const [total_pages, setTotalPages] = useState(1);
  const [searChQuery, setSearChQuery] = useState('');


    //State of the form Data
    const [formData, setFormData] = useState ({
        FullName: "",
        Gender : "",
        BenNumber: "",
        CollectedBy: "",
        idNumberCollector: "",

    });


    // Fetching data

  
    const fetchData = async (page=1, search='') => {

      try{

      const response = await api.get('api/birthcertificate/',{
        params:{
          page:page,
          search:search
        }
      });

      console.log("Getting data response", response);
      const data = await response.data;

      console.log("Show data here: ", data);
      if(data && data.records && Array.isArray(data.records)){
      setBirthCertificate(data.records);
      setTotalPages(data.total_pages);
      setCurrentPage(data.current_pages);


    }else{
      setBirthCertificate([]);
    }

    }catch(error){
      console.error("Fetch data error : ", error)
      setBirthCertificate([]);
    }
  }

    //searching amount Effect when data is fetched
    useEffect(() => {

    fetchData(current_pages, searChQuery);


    },[current_pages, searChQuery])

    
    


    //Form submit handler
    const submitHandler = (e) => {
        const {name, value } = e.target;

        setFormData({...formData, [name] : value});

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('This is Form data',formData);

        //adding data to the data base
        try{
          const response = await api.post('api/birthcertificate/',formData);
          console.log('This is the Response',response);

          if(response.status === 200){
            const newCertificate = await response.data;
            console.log('Data added', newCertificate)

            setBirthCertificate((prev) => [...prev, newCertificate]);
               
            setFormData({
              FullName: "", 
              Gender:"", 
              BenNumber:"",
              CollectedBy:"",
              idNumberCollector:""
          });

          setIsModalOpen(false)



          }else{
            alert('Error adding data: ' , response.statusText);
          }




        }catch(error){
          console.error('Network Error:', error);
          if (error.response) {
            console.error('Error response data:', error.response.data); 
        }
        alert('Network Error: ' + (error.response ? error.response.data : error.message));
    
        }



        
    
    }




  return (
    <>
    <Box sx={{display:'flex'}}>
      <Sidebar/>

      <Box component="main" sx={{ flexGrow:1, p:3, marginTop:"65px"}}>

        

        <div class="container mx-auto">
        <div class='p-5 bg-gray-500 text-3xl text-white m-3'>
    <Typography component="h1" variant="h4">Manage Birth Certificates</Typography>
</div>

      
        <div class="flex items-center justify-between mb-4">
            <div>
                <button 
                class="bg-blue-500 
                text-white py-2 px-4 
                rounded hover:bg-blue-700"
                onClick={() => setIsModalOpen(true)}
                >Add</button>
            </div>
            <div class="w-full max-w-sm">
                <input type="text" 
                placeholder="Search..." 
                class="w-full px-4 py-2 border 
                rounded-md focus:outline-none 
                focus:ring-2 focus:ring-blue-500"
                value={searChQuery}
                onChange={(e) => setSearChQuery(e.target.value)}
                />
            </div>
        </div>

        
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-300 rounded-md">

                <thead>
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">FullName</th>
                        <th class="py-3 px-6 text-left">Gender</th>
                        <th class="py-3 px-6 text-left">BenNumber</th>
                        <th class="py-3 px-6 text-left">CollectedBy</th>
                      
                        <th class="py-3 px-6 text-center">Action</th>
                    </tr>
                </thead>

                <tbody class="text-gray-600 text-sm font-light">
                  {Array.isArray(birthCertificate) && birthCertificate.length > 0 ? (
                  birthCertificate.map((certificate) => (
                    <tr class="border-b border-gray-300 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left whitespace-nowrap">{certificate.FullName}</td>
                        <td class="py-3 px-6 text-left">{certificate.Gender}</td>
                        <td class="py-3 px-6 text-left">{certificate.BenNumber}</td>
                        <td class="py-3 px-6 text-left">{certificate.CollectedBy}</td>

                        
                        <td class="py-3 px-6 text-center">
                            <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">view</button>
                            
                        </td>
                    </tr>

                     ))
                    ): (
                      <tr>
                      <td colSpan="5" className="py-3 px-6 text-center">No Birth Certificates found</td>
                    </tr>
                    )}

                    
                    
                </tbody>
            </table>
        </div>

        <div className="flex justify-between mb-4">
          <button className='px-4 py-3 bg-gray-300 rounded'
           disabled={current_pages === 1}
           onClick={() => setCurrentPage(prev => Math.max(prev -1, 1))}
          
          >
            previous
           
            </button>

            <span>Page {current_pages} of {total_pages}</span>

            <button className="px-4 py-2 bg-gray-300 rounded"
            disabled={current_pages === total_pages}
            onClick={() => setCurrentPage(prev => Math.max(prev + 1, total_pages))}

            >
            Next
            </button>
        </div>




     {/* Modal data open here  */}

     {isModalOpen && (


<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
<div className="bg-white p-6 rounded-lg w-96">
  <h2 className="text-xl mb-4">Add New Data</h2>
  <form onSubmit={handleSubmit}>

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

    </div>
              
          

      </Box>
    </Box>
    </>
  )
}

export default BirthCertificate