/* eslint-disable react/style-prop-object */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BsSearch } from 'react-icons/bs';
import moment from 'moment'

const startOfWeek = moment().startOf('week');
const endOfWeek = moment().endOf('week');
const startOfPreviousWeek = moment().subtract(1, 'week').startOf('week');
    const endOfPreviousWeek = moment().subtract(1, 'week').endOf('week');

const Users = () => {
  const [books, setBooks] = useState([]);
  const [sortState, setSortState] = useState("none");
  const [searchVal, setSearchVal] = useState("");
  const [User, setUser] = useState(0);
  let [prev, setprev] = useState(false);
  let [clicked, setclicked] = useState(false);



  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        
        await setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
   
  }, []);

  console.log(books);



const fetchAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8800/books");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  }

const sortMethods = {
    none: { method: (a, b) => null },
    ascending: { method:(a, b) => ( a.score < b.score ? -1 : 1) },
    descending: { method: (a, b) => (a.score > b.score ? -1 : 1) },
  };
  


 const [showCurrentWeek, setShowCurrentWeek] = useState(true);

  const handleSearchweek = () => {
    setprev(false);
    // const today = moment();
    // const startOfWeek = moment().startOf('week');
    // const endOfWeek = moment().endOf('week');
    // const filterDataByWeek = books.filter((data) => {
    //   const itemDate = moment(data.timestamp);
    //   return itemDate.isBetween(startOfWeek, endOfWeek);
    // });
    // setBooks(filterDataByWeek);
    // setShowCurrentWeek(true);
  };

  const handleSearcPrevweek = () => {
    setprev(true);
    // const today = moment();
    // const startOfPreviousWeek = moment().subtract(1, 'week').startOf('week');
    // const endOfPreviousWeek = moment().subtract(1, 'week').endOf('week');
    // const filterDataByPreviousWeek = books.filter((data) => {
    //   const itemDate = moment(data.timestamp);
    //   return itemDate.isBetween(startOfPreviousWeek, endOfPreviousWeek);
    // });
    // setBooks(filterDataByPreviousWeek);
    // setShowCurrentWeek(false);
  };

  const handleClick = ()=>{
    setclicked(true);
  }

  async function handleSearchClick() {
    if(searchVal === "") {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
    }
    else{const filterBySearch = books.filter((item) => {
        if (item.country.toLowerCase().includes(searchVal.toLowerCase())) {
        return item; 
        }
    


    })
    setBooks(filterBySearch.slice(0,200));
}
    
}
async function handleUser() {
    if(User == ""){
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
}
    else{const filterByUser = books.filter((item) => {
        if (item.id == User ) {
        return item; 
        }
    });
    setBooks(filterByUser);
}
}

  return (
    <div>
      <h1>Leader Board Users</h1>
      <div className="books">
      <select defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
        <option value="DEFAULT" disabled>None</option>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
        

      <input onChange={e => setSearchVal(e.target.value)}>
                </input>
                <BsSearch onClick={handleSearchClick} />
      <button className="addHome">
        Sort
      </button>
      <br></br>
      <br></br>
      <button 
      className="addHome" onClick={handleClick}>
        Click to enable week wise view
      </button>
      <button className="addHome" onClick={handleSearchweek} disabled={!clicked}>
        Get Current Week
      </button>
      <br></br>
      <br></br>

      <button className="addHome" onClick={handleSearcPrevweek} disabled={!clicked}>
        Get Previous Week
      </button>
      <br></br>
      <br></br>
      <input onChange={e => setUser(e.target.value)}>
                </input>

      <button className="addHome" onClick={handleUser}>
        Get User by userID
      </button>
      <br></br>
    

     


        {
         books.sort(sortMethods[sortState].method).filter((data) => {
            if(clicked){
            if(!prev){
            const itemDate = moment(data.timestamp);
            return itemDate.isBetween(startOfWeek, endOfWeek);
            }
            else{
               const itemDate = moment(data.timestamp);
            return itemDate.isBetween(startOfPreviousWeek, endOfPreviousWeek);
            }
        }else{
            return data;
        }
            // if(t{
            //     return data;
            // }
          }).map((book) => (
          <div key={book.id} className="book">

            <table >
  <tr>
  <th>ID</th>
        <th>Rank</th>

        <th>Score</th>

        <th>Country</th>

    </tr>
    <tr>
           <td>{book.id}</td>
           <td>{book.name}</td>
           <td>{book.score}</td>
           <td>{book.country}</td>
           <td>{book.timestamp}</td>
           </tr>
     </table>
           
            {/* <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button> */}
            {/* <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button> */}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Users;