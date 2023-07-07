// App.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function SearchBar() {
    
    return(
        <div>SearchBar</div>
    )
    /** 
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const workouts = useSelector((state) => state.workouts);

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/workouts/s?search=${search}`)
      .then(res => res.json())
      .then(data => setItems(data));
  };

  return (
    <div>
      <h1>Items</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <ul>
        { items && items.map(item => (
          <li key={item._id}>
            {item.author} - {item.title} ({item.genre})
          </li>
        ))}
      </ul>
      
    </div>
    */
  /* Error message//When the days are cold and the saints
  items.map is not a function
TypeError: items.map is not a function
    at SearchBar (http://localhost:3000/static/js/bundle.js:1041:32)
    at renderWithHooks (http://localhost:3000/static/js/bundle.js:29005:22)
    at updateFunctionComponent (http://localhost:3000/static/js/bundle.js:31887:24)
    at beginWork (http://localhost:3000/static/js/bundle.js:33599:20)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:18597:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:18641:20)
    at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:18698:35)
    at beginWork$1 (http://localhost:3000/static/js/bundle.js:38572:11)
    at performUnitOfWork (http://localhost:3000/static/js/bundle.js:37819:16)
    at workLoopSync (http://localhost:3000/static/js/bundle.js:37742:9)
  
  
  
  */
}

export default SearchBar;
