import React, { useState } from 'react'
import { data } from '../data/data';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';


function ProgramDetails({ name, setOverlay }) {
    const [program, setProgram] = useState();
    const result = data.find(item => item.name === name);
    const closeOverlayHandler = () => {
        setOverlay(false);
    };
    console.log(result)
    return (
        <section data-aos="zoom-in" className="bg-white p-[80px]  w-9/12  absolute  top-[700px] flex  flex-col justify-center items-center rounded  z-40">
            <div>
                <h1 className='text-xl uppercase text-[#929292] font-Nunito font-bold mb-8'>{result.details.title}</h1>
                <p className='text-base text-[#929292] text-opacity-50 font-Nunito font-normal mb-8'>{result.details.description}</p>
                {result.details.content.map(item => <h2 className='text-base text-[#929292] text-opacity-50 font-Nunito font-normal mb-4'><CheckCircleOutlinedIcon className='text-[#A7B8FD]'></CheckCircleOutlinedIcon><span className="ml-4">{item}</span></h2>)}
            </div>
            <button
                type="submit"
                className="font-bold text-base font-Nunito py-2.5 px-4 bg-pink uppercase text-white rounded-[10px] hover:bg-light-pink mt-6"
                onClick={closeOverlayHandler}
            >
                Close
            </button>
        </section>
    )
}

export default ProgramDetails;