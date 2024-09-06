import Loading from "./Loading";
import { useState } from "react";
import axios from 'axios';
import Select from 'react-select';

export default function LinkComponent({ setCurrentIndex, setDateCreated, setDateUpdated, setVisiterCount, setOriginalURL, setshortenURL }) {
    const [result, setResult] = useState(false)
    const [inputLink, setInputLink] = useState("")
    const [inputError, setInputError] = useState("")
    const [loading, setLoading] = useState(false);
    const [actionError, setActionError] = useState(false);
    const backendURL = import.meta.env.VITE_BACKEND_SERVER_URL;
    const frontendURL = import.meta.env.VITE_FRONTEND_SERVER_URL;
    const options = [
        { value: 'create', label: 'Create' },
        { value: 'update', label: 'Update' },
        { value: 'delete', label: 'Delete' },
        { value: 'stats', label: 'Stats' }
      ];
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (option) => {
        setSelectedOption(option);
    };
      

    async function handleSubmit(){

        if (result){
            setResult(false);
            setInputLink("")
            return
        }

        // Validation
        if(inputLink.length < 3){
            setInputError(true);
            return
        }
        setInputError(false);

        if(selectedOption === null){
            setActionError(true);
            return
        }
        setActionError(false);

        // Function
        setLoading(true);
        if(selectedOption.value === "create"){
            createURL();
        }else if(selectedOption.value === "update"){
            updateURL();
        }else if(selectedOption.value === "delete"){
            deleteURL();
        }else{
            statsURL();
        }

        setLoading(false);
        setResult(true);
       

    }

    const createURL = async() =>{
        try {
            const response = await axios.post(backendURL + "shorten", { url: inputLink });
            if (response.status === 201) {  
                const newURL = frontendURL + response.data.shortCode;
                setInputLink(newURL);
            } else {
                console.error('Unexpected response status:', response.status);
                setInputLink('Unexpected error');
            }
            } catch (error) {
            if (error.response) {
                if(error.response.status === 429){
                    setInputLink("Try again tomorrow. Limit reached for this IP.");
                }else{
                    setInputLink(`Error: ${error.response.data.error || 'An error occurred'}`);
                }
                
            }
            }
    }
    const updateURL = async() =>{
        try {
            const response = await axios.put(backendURL + "shorten/update", { url: inputLink });
            if (response.status === 201) {  
                const newURL = frontendURL + response.data.shortCode;
                setInputLink(newURL);
            } else {
                console.error('Unexpected response status:', response.status);
                setInputLink('Unexpected error');
            }
        } catch (error) {
            if (error.response) {
                if(error.response.status === 429){
                    setInputLink("Try again tomorrow. Limit reached for this IP.");
                }else{
                    setInputLink(`Error: ${error.response.data.error || 'An error occurred'}`);
                }
                
            }
        }
    }
    const deleteURL = async() =>{
        try {
            const response = await axios.delete(backendURL + "shorten/delete", {
                params: { url: inputLink }
              });
            if (response.status === 204) {  
                setInputLink("Deleted Successfully");
            } else {
                console.error('Unexpected response status:', response.status);
                setInputLink('Unexpected error');
            }
        } catch (error) {
            if (error.response) {
                if(error.response.status === 429){
                    setInputLink("Try again tomorrow. Limit reached for this IP.");
                }else{
                    setInputLink(`Error: ${error.response.data.error || 'An error occurred'}`);
                }
                
            }
        }
    }
    const statsURL = async() =>{
        try {
            const response = await axios.get(backendURL + "shorten/" + inputLink.slice(-5) + "/stats");
            if (response.status === 200) {  
                setDateCreated(response.data[0].createdAt)
                setDateUpdated(response.data[0].updatedAt)
                setOriginalURL(response.data[0].url)
                setshortenURL(frontendURL + response.data[0].shortCode)
                setVisiterCount(response.data[0].accessCount)
                setCurrentIndex(1)
            } else {
                console.error('Unexpected response status:', response.status);
                setInputLink('Unexpected error');
            }
        } catch (error) {
            if (error.response) {
                if(error.response.status === 429){
                    setInputLink("Try again tomorrow. Limit reached for this IP.");
                }else{
                    setInputLink(`Error: ${error.response.data.error || 'An error occurred'}`);
                }
                
            }
        }
    }

    function handleInput(e){
        setInputLink(e.target.value);
    }

  return (
    <div key="slide1" className="flex flex-col items-center justify-center h-full px-5 gap-5">
        {loading && <Loading/>}
        {!loading && 
        <>
        <div className="bg-white bg-opacity-10 px-4 py-2 rounded-xl">
            <p className="text-gray-300 text-xl mainFont">Shorten Link</p>
        </div>
        
        <div className="flex flex-col w-full h-full justify-between py-10 gap-14">
            <div className="w-full">
                {/* for medium above screens */}
                <div className="hidden lg:flex gap-2 ">
                    <input type="text" onChange={handleInput} disabled={result} style={{color: result ? "rgba(255,255,255,0.7)": ""}} value={inputLink} 
                    className="bg-[#343E42] border border-gray-100 border-opacity-20 rounded-md px-5 py-2 outline-none w-10/12" placeholder="Input link here.." />
                    <div className="cursor-pointer outline-none w-2/12 text-center">
                    <Select
                        options={options}
                        isDisabled={result}
                        value={selectedOption}
                        onChange={handleChange}
                        placeholder={"Actions"}
                        isClearable
                        isSearchable={false} 
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: 'transparent', 
                                borderColor: "rgba(255,255,255,0.2)",
                                color: "white",
                                outline: 'none',
                                '&:focus': {
                                    outline: 'none', 
                                    boxShadow: 'none', 
                                },
                            }),
                            indicatorSeparator: () => ({ display: 'none' }), // Hide the separator
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                display: 'none', // Hide the default dropdown indicator (arrow)
                            }),
                            clearIndicator: () => ({ display: 'none' }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: 'rgba(255,255,255,0.8)',
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                color: 'rgba(255,255,255,0.8)', // Change selected text color
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected ? '#e5e7eb' : 'rgba(255,255,255,0.1)', // Change option background color
                                color: '#111827', // Change option text color
                                '&:hover': {
                                    backgroundColor: '#f3f4f6', // Change option hover background color
                                },
                            }),
                        }}
                    />
                    </div>
                </div>
                {/* for medium below screens */}
                <div className="hidden md:flex lg:hidden flex-col gap-2 items-center">
                    <input type="text" onChange={handleInput} disabled={result} style={{color: result ? "rgba(255,255,255,0.7)": ""}} value={inputLink} 
                    className="bg-[#343E42] border border-gray-100 border-opacity-20 rounded-md px-5 py-2 outline-none w-10/12" placeholder="Input link here.." />
                    <div className="cursor-pointer outline-none  text-center">
                    <Select
                        options={options}
                        isDisabled={result}
                        value={selectedOption}
                        onChange={handleChange}
                        placeholder={"Actions"}
                        isClearable
                        isSearchable={false} 
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: 'transparent', 
                                borderColor: "rgba(255,255,255,0.2)",
                                color: "white",
                                outline: 'none',
                                '&:focus': {
                                    outline: 'none', 
                                    boxShadow: 'none', 
                                },
                            }),
                            indicatorSeparator: () => ({ display: 'none' }), // Hide the separator
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                display: 'none', // Hide the default dropdown indicator (arrow)
                            }),
                            clearIndicator: () => ({ display: 'none' }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: 'rgba(255,255,255,0.8)',
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                color: 'rgba(255,255,255,0.8)', // Change selected text color
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected ? '#e5e7eb' : 'rgba(255,255,255,0.1)', // Change option background color
                                color: '#111827', // Change option text color
                                '&:hover': {
                                    backgroundColor: '#f3f4f6', // Change option hover background color
                                },
                            }),
                        }}
                    />
                    </div>
                </div>
                {/* for small below screens */}
                <div className="flex md:hidden flex-col gap-2 items-center">
                    <input type="text" onChange={handleInput} disabled={result} style={{color: result ? "rgba(255,255,255,0.7)": ""}} value={inputLink} 
                    className="bg-[#343E42] border border-gray-100 border-opacity-20 rounded-md px-5 py-2 outline-none w-10/12" placeholder="Input link here.." />
                    <div className="cursor-pointer outline-none text-center">
                    <Select
                        options={options}
                        isDisabled={result}
                        value={selectedOption}
                        onChange={handleChange}
                        placeholder={"Actions"}
                        isClearable
                        isSearchable={false} 
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: 'transparent', 
                                borderColor: "rgba(255,255,255,0.2)",
                                color: "white",
                                outline: 'none',
                                '&:focus': {
                                    outline: 'none', 
                                    boxShadow: 'none', 
                                },
                            }),
                            indicatorSeparator: () => ({ display: 'none' }), // Hide the separator
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                display: 'none', // Hide the default dropdown indicator (arrow)
                            }),
                            clearIndicator: () => ({ display: 'none' }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: 'rgba(255,255,255,0.8)',
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                color: 'rgba(255,255,255,0.8)', // Change selected text color
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected ? '#e5e7eb' : 'rgba(255,255,255,0.1)', // Change option background color
                                color: '#111827', // Change option text color
                                '&:hover': {
                                    backgroundColor: '#f3f4f6', // Change option hover background color
                                },
                            }),
                        }}
                    />
                    </div>
                </div>
                {inputError && <div> <p className="mainFont text-red-500 text-sm">*Please input correct link.</p> </div>}
                {actionError && <div> <p className="mainFont text-red-500 text-sm">*Please select an Action.</p> </div>}
            </div>
            <div className="w-full flex justify-center">
                <button type="button"
                onClick={() => handleSubmit()}
                style={{ backgroundColor:result ? "" : "rgba(128, 212, 199, 0.3)"}}
                className="bg-[#343E42] bg-opacity-50 px-8 py-2 rounded-xl border border-gray-100 border-opacity-20 mainFont">
                    {
                        result ? "Back":"Submit"
                    }
                </button>
            </div>
        </div>
        </>
        }
    </div>
  )
}
