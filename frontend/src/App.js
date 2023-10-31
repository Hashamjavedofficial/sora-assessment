import React,{useState,useEffect,useMemo} from 'react'
import axios from 'axios'

import './App.css';

//
// The list can be sorted in 3 different ways:
//     sort by created at ascendent
// sort by filename ascendent
// sort by filename descendent
//
// For the filename ascendent and descendent we want a different sort, any digit into the filename needs to be converted to a number, the number should be sorted as well.


const sortTypes = {
    createdBy:'createdBy',
    fileNameAsc:'fileNameAsc',
    fileNameDes:'fileNameDes'
}
function App() {

    const [sortBy,setSortBy] = useState(sortTypes.createdBy)
    const [data,setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000').then(res=>{
            setData(res.data)
        }).catch(e=>{
            console.log('error',e)
        })
    }, []);


    const filteredData = useMemo(()=>{
        switch (sortBy){
            case sortTypes.createdBy:
            return [...data.sort((a, b) => new Date(a.createdBy) - new Date(b.createdBy))];
            case sortTypes.fileNameDes:
                return [...data.sort((a, b) => b.fileNameDigits - a.fileNameDigits)];
            case sortTypes.fileNameAsc:
                return [...data.sort((a, b) => a.fileNameDigits - b.fileNameDigits)];
            default:
                return []
        }
    },[sortBy,data])



    const onChangeSort = (e)=>{
        setSortBy(e.target.value)
    }



  return (
    <div className={'flex items-center flex-col p-4'}>
      <select onChange={onChangeSort} name="filters" className={'appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 leading-5 focus:outline-none focus:border-blue-500'} >
          <option value={sortTypes.createdBy}>created at ascendent</option>
          <option value={sortTypes.fileNameAsc}>filename ascendent</option>
          <option value={sortTypes.fileNameDes}>filename descendent</option>
      </select>

       <div className={'grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 w-full mt-6'}>
           {filteredData && filteredData.map(item => (<div className={'max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md p-4 w-full'} key={item.createdBy}>
               <div>{item.createdBy}</div>
               <h4 className={'text-4xl font-bold  text-gray-800'}>{item.fileName}</h4>
           </div>))}
       </div>


    </div>
  );
}

export default App;
